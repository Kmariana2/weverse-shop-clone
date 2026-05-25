# Weverse Shop Backend

Express + Prisma API server for Weverse Shop clone.

## Setup

### 1. Install dependencies

```bash
npm install
# or
pnpm install
```

### 2. Configure environment

Create a `.env` file (copy from `.env.example`):

```bash
DATABASE_URL="file:./dev.db"
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
PORT=3001
```

### 3. Setup database

```bash
npx prisma migrate dev
```

This will:
- Create SQLite database
- Run migrations
- Automatically prompt to seed data

### 4. Seed products (if not auto-seeded)

```bash
npm run seed
```

### 5. Start server

```bash
npm run dev
```

Server will run on `http://localhost:3001`

## API Endpoints

### Products

- `GET /api/products` - List all products (with first image only for grid)
- `GET /api/products?category=Apparel` - Filter by category
- `GET /api/products/:id` - Get full product with all images

### Auth

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

**Auth header:** `x-user-id: <userId>`

### Cart

- `GET /api/cart` - Get user's cart items
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:itemId` - Remove item from cart

**Auth header:** `x-user-id: <userId>`

### Checkout

- `POST /api/checkout` - Create order, decrement stock, return order confirmation

**Auth header:** `x-user-id: <userId>`

## Database Schema

See `prisma/schema.prisma` for full schema.

### Key Models

- **Product**: name, price, images (JSON array), category, badges, stock, countdown timer
- **User**: email, passwordHash, name
- **CartItem**: userId, productId, quantity, size
- **Order**: userId, items (JSON), total, status, shippingInfo (JSON)

## Production Deployment

To use PostgreSQL instead of SQLite:

1. Update `DATABASE_URL` in `.env` to your PostgreSQL connection string
2. Run `npx prisma migrate deploy`
3. Deploy to your server

## Docker Compose (Optional)

For local PostgreSQL:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: weverse_shop
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Then update `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/weverse_shop"`
