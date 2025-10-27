
1.  Clonar o repositório
    `git clone https://github.com/Edg4rjr1/qa-junior-playwright-api.git`

2.  Entrar na pasta:
    `cd qa-junior-playwright-api`

3.  Instalar as dependências:
    `npm install`


4.  Criar um arquivo `.env` na raiz do projeto e adicione sua API token:
    `API_TOKEN=SEU_TOKEN_AQUI`

5.  Rodar os testes:
    `npx playwright test`

#TESTES

 #tests/ – Contém os arquivos de teste divididos por recurso:
  1. users.spec.js – Testes de CRUD de usuários.
  2. posts.spec.js – Testes de criação de posts e comentários.
  3. comments.spec.js – Testes de comentários com cenários positivos e negativos.
