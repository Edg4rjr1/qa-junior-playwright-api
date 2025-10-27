import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe.serial('Fluxo de CRUD de Usuário', () => {
  const emailUnico = faker.internet.email();
  let userId;

  test('Deve criar um novo usuário com sucesso', async ({ request }) => {
    const response = await request.post('users', {
      data: {
        name: 'Edgar Testes',
        email: emailUnico,
        gender: 'male',
        status: 'active'
      }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    userId = body.id;

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('email');

    console.log('Usuário criado:', body);
  });

  test('Não deve criar usuário com email duplicado', async ({ request }) => {
    const response = await request.post('users', {
      data: {
        name: 'Outro Usuário',
        email: emailUnico, 
        gender: 'male',
        status: 'active'
      }
    });

    expect(response.status()).toBe(422); 
  });

  test('Deve buscar o usuário criado', async ({ request }) => {
    const response = await request.get(`users/${userId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(userId);
    expect(body.email).toBe(emailUnico);
  });

  test('Não deve buscar usuário inexistente', async ({ request }) => {
    const response = await request.get('users/9999999');
    expect(response.status()).toBe(404);
  });

  test('Deve atualizar os dados do usuário', async ({ request }) => {
    const response = await request.put(`users/${userId}`, {
      data: {
        name: 'Teste Att',
        email: emailUnico,
        gender: 'female',
        status: 'active'
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Teste Att');
    expect(body.gender).toBe('female');
  });

  test('Não deve atualizar usuário inexistente', async ({ request }) => {
    const response = await request.put('users/9999999', {
      data: { name: 'Teste' }
    });
    expect(response.status()).toBe(404);
  });

  test('Deve excluir o usuário com sucesso', async ({ request }) => {
    const response = await request.delete(`users/${userId}`);
    expect(response.status()).toBe(204);
  });

  test('Não deve excluir usuário inexistente', async ({ request }) => {
    const response = await request.delete('users/9999999');
    expect(response.status()).toBe(404);
  });
});
