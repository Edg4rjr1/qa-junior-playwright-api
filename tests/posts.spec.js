import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe.serial('Fluxo completo de publicações', () => {
  const emailUnico = faker.internet.email();
  let postId;

  test('GET - Listar publicações', async ({ request }) => {
    const response = await request.get('posts');
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Lista de posts existentes:', body);
  });

  test('POST - Criar publicação', async ({ request }) => {
    const response = await request.post('users/8206956/posts', {
      data: {
        user_id: 8206956,
        title: 'Sophismataa constans adicio accipio vivo quia sapiente delectatio.',
        body: 'Averto cupiditas cultura. Corpus voluptatem sophismata. Cur veritas umerus. Sed et ascisco.',
      }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    postId = body.id;

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');

    console.log('Body do POST:', body);
  });

  test('POST - Criar comentário', async ({ request }) => {
    const response = await request.post(`posts/${postId}/comments`, {
      data: {
        name: "Edgar QA",
        email: emailUnico,
        body: "QA Junior playwright test api",
      }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('body');

    console.log('Body do comentário:', body);
  });
});
