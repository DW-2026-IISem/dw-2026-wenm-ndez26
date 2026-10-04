import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/app-error";
import { BaseController } from "../../../shared/http/base-controller";
import { SubmissionService } from "./submission.service";
import {
  CreateSubmissionDto,
  PatchSubmissionDto,
  UpdateSubmissionDto,
} from "./dto";

/**
 * Controller de Submission.
 *
 * Solo maneja HTTP:
 * req -> service -> res.
 */
export class SubmissionController
  extends BaseController
{
  public constructor(
    private readonly service: SubmissionService =
      new SubmissionService()
  ) {
    super();
  }

  // ================== READ ==================

  public async getAll(
    _req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const submissions =
        await this.service.getAll();

      res.status(200).json({
        submissions,
      });
    });
  }

  public async getOne(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const submission =
        await this.service.getOne(id);

      res.status(200).json({
        submission,
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
        req.body as CreateSubmissionDto;

      if (
        body.referencia_id === undefined ||
        !body.lesson_id ||
        !body.enrollment_id ||
        !body.fecha_inicio ||
        !body.estado
      ) {
        throw new AppError(
          400,
          "referencia_id, lesson_id, enrollment_id, fecha_inicio y estado son obligatorios"
        );
      }

      const submission =
        await this.service.create(body);

      res.status(201).json({
        submission,
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
        req.body as UpdateSubmissionDto;

      if (
        body.referencia_id === undefined ||
        !body.lesson_id ||
        !body.enrollment_id ||
        !body.fecha_inicio
      ) {
        throw new AppError(
          400,
          "referencia_id, lesson_id, enrollment_id y fecha_inicio son obligatorios"
        );
      }

      const submission =
        await this.service.update(
          id,
          body
        );

      res.status(200).json({
        submission,
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
        req.body as PatchSubmissionDto;

      const submission =
        await this.service.patch(
          id,
          body
        );

      res.status(200).json({
        submission,
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
          "Entrega eliminada correctamente",
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

      const submission =
        await this.service.deactivate(id);

      res.status(200).json({
        message:
          "Entrega desactivada correctamente",
        submission,
      });
    });
  }
}