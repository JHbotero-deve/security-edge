import { Request, Response, NextFunction } from "express";
import { BaseService } from "./base.service.js";
import { ZodSchema } from "zod";

export abstract class BaseController<T extends { id: number }> {
  constructor(
    protected service: BaseService<T>,
    protected createSchema: ZodSchema,
    protected updateSchema: ZodSchema
  ) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getAll();
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
      const payload = this.createSchema.parse(req.body);
      const data = await this.service.create(payload);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const payload = this.updateSchema.parse(req.body);
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
