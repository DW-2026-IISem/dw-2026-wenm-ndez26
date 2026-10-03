import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/app-error";
import { BaseController } from "../../../shared/http/base-controller";
import { AttemptService } from "./attempt.service";
import {
  CreateAttemptDto,
  PatchAttemptDto,
  UpdateAttemptDto,
} from "./dto";

export class AttemptController extends BaseController {
  private readonly service = new AttemptService();

  async getAll(
    _req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const attempts = await this.service.getAll();

      res.status(200).json(attempts);
    });
  }

  async getOne(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const attempt = await this.service.getOne(id);

      res.status(200).json(attempt);
    });
  }

  async create(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const data = req.body as CreateAttemptDto;

      if (!data.enrollment_id || !data.name) {
        throw new AppError(
          400,
          "enrollment_id y name son obligatorios"
        );
      }

      const attempt = await this.service.create(data);

      res.status(201).json(attempt);
    });
  }

  async update(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      const data = req.body as UpdateAttemptDto;

      if (!data.enrollment_id || !data.name) {
        throw new AppError(
          400,
          "enrollment_id y name son obligatorios"
        );
      }

      const attempt = await this.service.update(id, data);

      res.status(200).json(attempt);
    });
  }

  async patch(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      const data = req.body as PatchAttemptDto;

      const attempt = await this.service.patch(id, data);

      res.status(200).json(attempt);
    });
  }

  async delete(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      await this.service.delete(id);

      res.status(200).json({
        message: "Intento eliminado correctamente",
      });
    });
  }

  async deactivate(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const attempt = await this.service.deactivate(id);

      res.status(200).json({
        message: "Intento desactivado correctamente",
        attempt,
      });
    });
  }
}