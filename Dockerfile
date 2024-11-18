# Base stage
FROM node:18-alpine as base

WORKDIR /usr/src/app

# Copie os arquivos necessários antes de instalar dependências
COPY package.json yarn.lock ./

# Instale as dependências com o usuário root
RUN yarn install --immutable --immutable-cache --check-cache

# Instale o NestJS CLI globalmente
RUN yarn global add @nestjs/cli

# Copie o restante do código para o container
COPY . .

# Mude para o usuário 'node' para maior segurança
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM base as build

# Mude temporariamente para o usuário root para configurar permissões
USER root
RUN chown -R node:node /usr/src/app
USER node

# Construa o projeto
RUN yarn build

# Instale apenas as dependências de produção
RUN yarn install --immutable --immutable-cache --check-cache --production=true && yarn cache clean

###################
# PRODUCTION
###################

FROM node:18-alpine as production

WORKDIR /usr/src/app

# Copie o diretório de módulos e build da fase anterior
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Certifique-se de que o NestJS CLI está disponível na imagem final
RUN yarn global add @nestjs/cli

USER node

EXPOSE 3000

CMD ["yarn", "start:prod"]
