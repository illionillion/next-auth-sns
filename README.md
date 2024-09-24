# 環境構築

`.env`

```
NEXTAUTH_SECRET=""

DATABASE_URL="postgresql://johndoe:postgres@localhost:54320/mydb?schema=public"
```

node_modules

```sh
pnpm i
```

migrate

```sh
docker compose up -d
pnpm migrate
pnpm seed
```

dev

```sh
pnpm dev
```
