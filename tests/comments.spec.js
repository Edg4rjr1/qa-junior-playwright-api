import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe.serial('Fluxo de Comentários', () => {
  let userId;
  let postId;
  let commentId;

  test('Deve criar usuário com sucesso', async ({ request }) => {
    const response = await request.post('users', {
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        gender: 'male',
        status: 'active',
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    userId = body.id;

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('email');
    expect(body.status).toBe('active');
  });

  test('Deve criar post vinculado ao usuário', async ({ request }) => {
    const response = await request.post(`users/${userId}/posts`, {
      data: {
        title: 'Post para testes de comentários',
        body: 'Conteúdo de teste',
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    postId = body.id;

    expect(body).toHaveProperty('id');
    expect(body.title).toBe('Post para testes de comentários');
  });

  test('Deve criar comentário com sucesso', async ({ request }) => {
    const response = await request.post(`posts/${postId}/comments`, {
      data: {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        body: 'Comentário criado com sucesso',
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    commentId = body.id;

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('body');
    expect(body.body).toContain('Comentário');
  });

  test('Deve buscar o comentário criado', async ({ request }) => {
    const response = await request.get(`comments/${commentId}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(commentId);
    expect(body).toHaveProperty('email');
    expect(body.body).toContain('Comentário');
  });

  test('Deve atualizar comentário existente', async ({ request }) => {
    const response = await request.put(`comments/${commentId}`, {
      data: {
        name: 'Edgar QA Atualizado',
        email: faker.internet.email(),
        body: 'Comentário atualizado via Playwright',
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.body).toBe('Comentário atualizado via Playwright');
    expect(body.name).toBe('Edgar QA Atualizado');
  });

  test('Deve excluir o comentário com sucesso', async ({ request }) => {
    const response = await request.delete(`comments/${commentId}`);
    expect(response.status()).toBe(204);
  });

  test('Não deve criar comentário para post inexistente', async ({ request }) => {
    const response = await request.post('posts/999999/comments', {
      data: {
        name: 'Teste',
        email: faker.internet.email(),
        body: 'Comentário inválido',
      },
    });

    expect(response.status()).toBe(422);
  });

  test('Não deve criar comentário sem body', async ({ request }) => {
    const response = await request.post(`posts/${postId}/comments`, {
      data: {
        name: 'Teste',
        email: faker.internet.email(),
      },
    });

    expect(response.status()).toBe(422);
  });

  test('Não deve buscar comentário inexistente', async ({ request }) => {
    const response = await request.get('comments/9999999');
    expect(response.status()).toBe(404);
  });

  test('Não deve atualizar comentário inexistente', async ({ request }) => {
    const response = await request.put('comments/9999999', {
      data: {
        body: 'Tentando atualizar comentário que não existe',
      },
    });

    expect(response.status()).toBe(404);
  });

  test('Não deve excluir comentário inexistente', async ({ request }) => {
    const response = await request.delete('comments/9999999');
    expect(response.status()).toBe(404);
  });
});
