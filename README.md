# Sleipnir


![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-brightgreen)
![Docker](https://img.shields.io/badge/Docker-%3E%3D20.10-blue)
![NestJS](https://img.shields.io/badge/Built%20With-NestJS-red)
![License](https://img.shields.io/badge/License-GPL--3.0-blue)
![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen)
![Contributions](https://img.shields.io/badge/Contributions-Welcome-orange)
![Release](https://img.shields.io/github/v/release/lopeski/Sleipnir)
![Build](https://img.shields.io/github/actions/workflow/status/lopeski/Sleipnir/ci.yml?branch=main)
![Issues](https://img.shields.io/github/issues/lopeski/Sleipnir)
![Stars](https://img.shields.io/github/stars/lopeski/Sleipnir?style=social)
![Forks](https://img.shields.io/github/forks/lopeski/Sleipnir?style=social)

**Sleipnir** é um sistema backend para gerenciamento de usuários e artigos, com autenticação e autorização baseadas em JWT, níveis de permissão, e uma API RESTful construída em NestJS. Este projeto tem como objetivo ser modular, escalável e aderente a boas práticas de desenvolvimento.

---

## Índice

- [Instalação e Configuração](#instalação-e-configuração)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Endpoints da API](#endpoints-da-api)
- [Roadmap](#roadmap)
- [Segurança](#segurança)
- [Contribuindo](#contribuindo)
- [Links Úteis](#links-úteis)
- [Licença](#licença)

---

## Instalação e Configuração

### Pré-requisitos
- **Node.js** (>=18.0.0)
- **Docker** (>=20.10)
- **Docker Compose** (>=2.0)

### Passos
1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-repositorio/sleipnir.git
    ```
2. Entre no diretório do projeto:
    ```bash
    cd sleipnir
    ```
3. Suba os serviços usando Docker Compose:
    ```bash
    docker compose up --build
    ```
4. O sistema estará disponível em: [http://localhost:3000](http://localhost:3000).
5. Para rodar os testes:
    ```bash
    yarn test
    ```

---

## Variáveis de Ambiente

As variáveis de ambiente são opcionais e podem ser usadas para personalizar o comportamento do sistema:

- `JWT_SECRET`: Segredo para assinar os tokens JWT.
- `DATABASE_HOST`: URL de conexão ao banco de dados.
- `DATABASE_PORT`: Porta em que o servidor irá rodar (padrão: 3000).
- `DATABASE_USER`: Usuario padrão do banco (padrão: postgres).
- `DATABASE_PASSWORD`: Senha padrão do banco (padrão: rootpassword).
- `DATABASE_NAME`: Nome do Banco de dados (padrão: mydatabase).

---

## Endpoints da API

### Autenticação


#### Login

curl --request GET \
--url http://localhost:3000/user \
--header 'Authorization: Bearer <your-jwt-token>'
Criar um novo usuário

curl --request POST \
--url http://localhost:3000/user \
--header 'Authorization: Bearer <your-jwt-token>' \
--header 'Content-Type: application/json' \
--data '{
"username": "novo_usuario",
"password": "senha_forte",
"role": "Editor"
}'
Atualizar um usuário

curl --request PUT \
--url http://localhost:3000/user/6 \
--header 'Authorization: Bearer <your-jwt-token>' \
--header 'Content-Type: application/json' \
--data '{
"role": "Admin"
}'
Excluir um usuário

curl --request DELETE \
--url http://localhost:3000/user/5 \
--header 'Authorization: Bearer <your-jwt-token>'
Gerenciamento de Artigos
Criar um novo artigo

curl --request POST \
--url http://localhost:3000/posts \
--header 'Authorization: Bearer <your-jwt-token>' \
--header 'Content-Type: application/json' \
--data '{
"title": "Novo Artigo",
"body": "Este é o conteúdo do artigo."
}'
Obter todos os artigos

curl --request GET \
--url http://localhost:3000/posts \
--header 'Authorization: Bearer <your-jwt-token>'
Atualizar um artigo

curl --request PUT \
--url http://localhost:3000/posts/1 \
--header 'Authorization: Bearer <your-jwt-token>' \
--header 'Content-Type: application/json' \
--data '{
"title": "Título Atualizado",
"body": "Conteúdo atualizado."
}'
Excluir um artigo

curl --request DELETE \
--url http://localhost:3000/posts/2 \
--header 'Authorization: Bearer <your-jwt-token>'



---

## Roadmap

- [ ] Testes Unitários
- [ ] Testes End-to-End
- [ ] Testes de Desempenho com Artillery
- [ ] Integração com OAuth2
- [ ] Logs de Auditoria
- [ ] Paginação de Dados

---

## Segurança

- **Proteção de Tokens JWT**:
    - Use armazenamento seguro para tokens (como `httpOnly cookies`).
    - Configure um tempo de expiração adequado.
- **Validação de Dados**:
    - Valide todas as entradas para evitar ataques como SQL Injection.
- **HTTPS**:
    - Em produção, use HTTPS para proteger dados em trânsito.

---

## Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
    ```bash
    git checkout -b feature/nova-feature
    ```
3. Faça o commit das suas alterações:
    ```bash
    git commit -m 'Adiciona nova feature'
    ```
4. Envie suas mudanças:
    ```bash
    git push origin feature/nova-feature
    ```
5. Abra um Pull Request.

---

## Links Úteis

- [NestJS Documentation](https://docs.nestjs.com)
- [Docker Compose Overview](https://docs.docker.com/compose)
- [JWT.io](https://jwt.io)
- [Postman](https://www.postman.com)

---

## Licença

Este projeto está licenciado sob a **GPL-3.0**. Todos os projetos derivados devem ser distribuídos sob a mesma licença, garantindo a continuidade do código aberto.
