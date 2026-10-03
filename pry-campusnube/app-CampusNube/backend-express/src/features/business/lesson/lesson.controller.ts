import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/app-error";
import { BaseController } from "../../../shared/http/base-controller";
import { LessonService } from "./lesson.service";
import {
  CreateLessonDto,
  PatchLessonDto,
  UpdateLessonDto,
} from "./dto";

export class LessonController extends BaseController {
  private readonly service = new LessonService();

  async getAll(
    _req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const lessons = await this.service.getAll();

      res.status(200).json(lessons);
    });
  }

  async getOne(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      const lesson = await this.service.getOne(id);

      res.status(200).json(lesson);
    });
  }

  async create(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const data = req.body as CreateLessonDto;

      if (!data.module_id || !data.name) {
        throw new AppError(
          400,
          "module_id y name son obligatorios"
        );
      }

      const lesson = await this.service.create(data);

      res.status(201).json(lesson);
    });
  }

  async update(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      const data = req.body as UpdateLessonDto;

      if (!data.module_id || !data.name) {
        throw new AppError(
          400,
          "module_id y name son obligatorios"
        );
      }

      const lesson = await this.service.update(id, data);

      res.status(200).json(lesson);
    });
  }

  async patch(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      const data = req.body as PatchLessonDto;

      const lesson = await this.service.patch(id, data);

      res.status(200).json(lesson);
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
        message: "Lección eliminada correctamente",
      });
    });
  }

  async deactivate(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const lesson = await this.service.deactivate(id);

      res.status(200).json({
        message: "Lección desactivada correctamente",
        lesson,
      });
    });
  }
}