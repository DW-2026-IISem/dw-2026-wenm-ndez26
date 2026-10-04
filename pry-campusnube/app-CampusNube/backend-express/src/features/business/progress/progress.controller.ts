import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/app-error";
import { BaseController } from "../../../shared/http/base-controller";
import { ProgressService } from "./progress.service";
import {
  CreateProgressDto,
  PatchProgressDto,
  UpdateProgressDto,
} from "./dto";

/**
 * Controller de Progress.
 *
 * Solo maneja HTTP:
 * req -> service -> res.
 */
export class ProgressController
  extends BaseController
{
  public constructor(
    private readonly service: ProgressService =
      new ProgressService()
  ) {
    super();
  }

  // ================== READ ==================

  public async getAll(
    _req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const progress =
        await this.service.getAll();

      res.status(200).json({
        progress,
      });
    });
  }

  public async getOne(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const progress =
        await this.service.getOne(id);

      res.status(200).json({
        progress,
      });
    });
  }

  // ================== CREATE ==================

  public async create(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const body =
        req.body as CreateProgressDto;

      if (!body.enrollment_id) {
        throw new AppError(
          400,
          "El campo enrollment_id es obligatorio"
        );
      }

      if (!body.name) {
        throw new AppError(
          400,
          "El campo name es obligatorio"
        );
      }

      const progress =
        await this.service.create(body);

      res.status(201).json({
        progress,
      });
    });
  }

  // ================== UPDATE ==================

  public async update(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const body =
        req.body as UpdateProgressDto;

      if (!body.enrollment_id) {
        throw new AppError(
          400,
          "El campo enrollment_id es obligatorio"
        );
      }

      if (!body.name) {
        throw new AppError(
          400,
          "El campo name es obligatorio"
        );
      }

      const progress =
        await this.service.update(
          id,
          body
        );

      res.status(200).json({
        progress,
      });
    });
  }

  public async patch(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const body =
        req.body as PatchProgressDto;

      const progress =
        await this.service.patch(
          id,
          body
        );

      res.status(200).json({
        progress,
      });
    });
  }

  // ================== DELETE ==================

  public async delete(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      await this.service.delete(id);

      res.status(200).json({
        message:
          "Progreso eliminado correctamente",
        id,
      });
    });
  }

  public async deactivate(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const progress =
        await this.service.deactivate(id);

      res.status(200).json({
        message:
          "Progreso desactivado correctamente",
        progress,
      });
    });
  }
}