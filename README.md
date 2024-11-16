# HBL Ofertas

## Objetivo

Mostrar 50 ofertas da loja, onde o cliente pode acessar o site de vendas e ter acesso as redes sociais.
O admin terá acesso ao cadastro dos produtos, edição e exclusão deles em uma página separada.

## Tecnologias Utilizadas

- React.js (Next.js)
- Node.js (Fastify)
- PostgreSQL (Neon Console)
- Typescript
- Styled-Components

## Dependências para instalar

### Pasta Backend

- npm i
- npm i fastify
- npx prisma generate
- npm i zod
- npm i tsx

## Telas Usuário Cliente

- Tela Principal ➡ 50 produtos, rede social, contato ao WhatsApp, acesso as redes sociais e acesso ao site de vendas
- Modal de detalhes do produto
- Busca de produtos por nome

## Telas Usuário Admin

- Tela login
- Tela Principal ➡ CRUD (Create, Read, Update e Delete)
- Modal de detalhes do produto
- Busca de produtos por código do produto

## Banco de dados

### User

- email
- senha

### Produtos

- Código do produto
- Nome do produto
- Valor do produto
- Descrição do produto

### Responsividade

Celular -> Menor ou igual a 600px
Tablets -> 600px à 768px
Mini Laptops -> 768px à 992px
Laptops E Desktops -> Maior ou igual a 992px