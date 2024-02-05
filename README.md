# Install all the dependencies

```bash
nvm use && npm install

# or

yarn install
```

## Run the server

```bash
cd server
```

**Create a `.env` file inside server, copy the content and replace <> with the values**

```json
DB_USERNAME= <MONGODB_USERNAME>
DB_PASSWORD= <MONGODB_PASSWORD>
DB_CLUSTER= <MONGODB_CLUSTER>
SALT_SIZE= 10
PRIVATE_KEY= jBeHAf4NQBEzm23G
REDIS_SECRET= redissecret
REDIS_SESSION_NAME= user
REDIS_HOST= localhost
REDIS_PORT= 6379
PORT= 8000
```

```bash
nvm use && npm run start

# or

yarn start
```

## Run the frontend

```bash
cd frontend
nvm use && npm run dev

# or

cd frontend
yarn dev
```
