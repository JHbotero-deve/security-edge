# Boilerplate TypeScript Enterprise Guide

## Project Structure

```
backend/src/
├── constants/          # HTTP status, error codes
├── lib/               # Database, external services
├── middlewares/       # Auth, logging, error handling
├── modules/           # Business logic (modular)
├── shared/            # Reusable types, base classes
├── utils/             # Helpers, error management
└── index.ts          # Express app entry point
```

## Module Architecture

Each module follows MVCS pattern:

```
modules/{name}/
├── {name}.validation.ts   # Zod schemas
├── {name}.repository.ts   # Data access layer
├── {name}.services.ts     # Business logic
├── {name}.controller.ts   # HTTP handlers
├── {name}.routes.ts       # Express routes
└── index.ts              # Exports
```

## Creating a New Module

### 1. Define Prisma Model

Add to `backend/prisma/schema.prisma`:

```prisma
model Product {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  price     Float
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("products")
}
```

### 2. Generate Module

```bash
npx ts-node tools/generate-module.ts product
```

### 3. Customize Validation

Edit `backend/src/modules/product/product.validation.ts`:

```typescript
import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1).max(255),
  price: z.number().positive(),
});

export const updateProductSchema = createProductSchema.partial();
```

### 4. Add Custom Repository Methods

Edit `backend/src/modules/product/product.repository.ts`:

```typescript
export class ProductRepository extends BaseRepository<any> {
  async findByName(name: string) {
    return this.prisma.findFirst({ where: { name } });
  }

  async findActive() {
    return this.prisma.findMany({ where: { active: true } });
  }
}
```

### 5. Add Business Logic

Edit `backend/src/modules/product/product.services.ts`:

```typescript
async getActive() {
  return this.repository.findActive();
}

async getByName(name: string) {
  const product = await this.repository.findByName(name);
  if (!product) throw new AppError("Product not found", 404);
  return product;
}
```

### 6. Mount Module

Edit `backend/src/index.ts`:

```typescript
import productRoutes from "./modules/product/product.routes.js";

app.use("/api/products", productRoutes);
```

### 7. Migrate Database

```bash
npx prisma migrate dev --name add_product
```

## Type Safety Patterns

### Generic Repository

```typescript
interface BaseEntity {
  id: number;
  createdAt: Date;
}

class BaseRepository<T extends BaseEntity> {
  async findById(id: number): Promise<T | null> {
    return this.prisma.findUnique({ where: { id } });
  }
}
```

### Typed Services

```typescript
class ProductService {
  constructor(private repository: ProductRepository) {}

  async getAll(): Promise<Product[]> {
    return this.repository.findAll();
  }
}
```

### Request/Response Types

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const sendSuccess = <T>(res: Response, data: T, status = 200) => {
  res.status(status).json({ success: true, data } as ApiResponse<T>);
};
```

## Error Handling

Use `AppError` from `utils/errors.ts`:

```typescript
throw new AppError("Resource not found", 404);
throw new AppError("Unauthorized access", 403);
throw new AppError("Invalid input", 400);
```

## Middleware Pattern

```typescript
app.use(jwtMiddleware);        // Auth
app.use(requestLogger);         // Logging
app.use(apiLimiter);           // Rate limiting
app.use(errorHandler);          // Error handling
```

## Environment Configuration

All secrets in `.env`:

```
DATABASE_URL=postgresql://user:pass@host/db
JWT_SECRET=your-secret-min-32-chars
PORT=3000
NODE_ENV=development
```

## Validation Best Practices

Use Zod for runtime validation:

```typescript
const schema = z.object({
  email: z.string().email(),
  age: z.number().int().positive(),
  tags: z.array(z.string()),
});

const validated = schema.parse(req.body);
```

## Testing Patterns

Each module should have tests:

```
modules/product/
├── product.test.ts
├── product.services.test.ts
└── product.repository.test.ts
```

## Security Guidelines

- Always validate input with Zod
- Use JWT tokens for authentication
- Hash passwords with bcrypt
- Implement rate limiting
- Use CORS carefully
- Sanitize error messages
- Implement request logging
- Validate file uploads with Multer

## Performance Tips

- Use database indexes for frequent queries
- Implement pagination for large datasets
- Cache frequently accessed data
- Use connection pooling (Prisma default)
- Monitor query performance

## Deployment Checklist

- Set strong JWT_SECRET
- Configure DATABASE_URL for production
- Update CORS_ORIGIN
- Enable HTTPS
- Set NODE_ENV=production
- Configure logging level
- Review security headers
- Test all modules
- Run database migrations
- Setup monitoring
