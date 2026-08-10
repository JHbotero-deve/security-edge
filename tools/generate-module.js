#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const moduleName = process.argv[2];
if (!moduleName) {
  console.error('Error: module name required');
  process.exit(1);
}

const pascalCase = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
const moduleDir = path.join(__dirname, `../backend/src/modules/${moduleName}`);

if (fs.existsSync(moduleDir)) {
  console.error(`Error: module "${moduleName}" already exists`);
  process.exit(1);
}

fs.mkdirSync(moduleDir, { recursive: true });

fs.writeFileSync(
  path.join(moduleDir, `${moduleName}.validation.ts`),
  `import { z } from "zod";

export const create${pascalCase(moduleName)}Schema = z.object({});
export const update${pascalCase(moduleName)}Schema = create${pascalCase(moduleName)}Schema.partial();
`
);

fs.writeFileSync(
  path.join(moduleDir, `${moduleName}.repository.ts`),
  `import { BaseRepository } from "../../shared/base.repository.js";
import prisma from "../../lib/prisma.js";

export class ${pascalCase(moduleName)}Repository extends BaseRepository<any> {
  constructor() {
    super(prisma.${moduleName});
  }
}
`
);

fs.writeFileSync(
  path.join(moduleDir, `${moduleName}.services.ts`),
  `import { ${pascalCase(moduleName)}Repository } from "./${moduleName}.repository.js";
import { AppError } from "../../utils/errors.js";

export class ${pascalCase(moduleName)}Service {
  private repository: ${pascalCase(moduleName)}Repository;

  constructor() {
    this.repository = new ${pascalCase(moduleName)}Repository();
  }

  async getAll(filters?: any) {
    return this.repository.findAll();
  }

  async getById(id: number) {
    const item = await this.repository.findById(id);
    if (!item) throw new AppError("Not found", 404);
    return item;
  }

  async create(data: any) {
    return this.repository.create(data);
  }

  async update(id: number, data: any) {
    const exists = await this.repository.findById(id);
    if (!exists) throw new AppError("Not found", 404);
    return this.repository.update(id, data);
  }

  async delete(id: number) {
    const exists = await this.repository.findById(id);
    if (!exists) throw new AppError("Not found", 404);
    return this.repository.delete(id);
  }
}
`
);

fs.writeFileSync(
  path.join(moduleDir, `${moduleName}.controller.ts`),
  `import { Request, Response, NextFunction } from "express";
import { ${pascalCase(moduleName)}Service } from "./${moduleName}.services.js";
import { create${pascalCase(moduleName)}Schema, update${pascalCase(moduleName)}Schema } from "./${moduleName}.validation.js";

export class ${pascalCase(moduleName)}Controller {
  private service: ${pascalCase(moduleName)}Service;

  constructor() {
    this.service = new ${pascalCase(moduleName)}Service();
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getAll(req.query);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.service.getById(Number(id));
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = create${pascalCase(moduleName)}Schema.parse(req.body);
      const data = await this.service.create(payload);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const payload = update${pascalCase(moduleName)}Schema.parse(req.body);
      const data = await this.service.update(Number(id), payload);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.service.delete(Number(id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
`
);

fs.writeFileSync(
  path.join(moduleDir, `${moduleName}.routes.ts`),
  `import { Router } from "express";
import { ${pascalCase(moduleName)}Controller } from "./${moduleName}.controller.js";
import { jwtMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();
const controller = new ${pascalCase(moduleName)}Controller();

router.use(jwtMiddleware);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
`
);

fs.writeFileSync(
  path.join(moduleDir, `index.ts`),
  `export { ${pascalCase(moduleName)}Repository } from "./${moduleName}.repository.js";
export { ${pascalCase(moduleName)}Service } from "./${moduleName}.services.js";
export { ${pascalCase(moduleName)}Controller } from "./${moduleName}.controller.js";
export { default as ${moduleName}Routes } from "./${moduleName}.routes.js";
`
);

console.log(`Module generated: backend/src/modules/${moduleName}/`);
