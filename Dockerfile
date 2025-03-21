# stage 1
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm run test

RUN echo "ALL TESTS PASSED"

# stage 2
FROM node:22-alpine AS production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build

COPY --from=builder /app/api ./api
COPY --from=builder /app/data ./data
COPY --from=builder /app/migrations ./migrations

EXPOSE 3000

CMD ["npm", "run", "start"]