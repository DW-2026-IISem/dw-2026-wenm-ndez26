import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import {
  CreateCourseDto,
  PatchCourseDto,
  UpdateCourseDto,
} from "./dto";
import { CourseRepository } from "./course.repository";
import { CourseService } from "./course.service";

export class CourseController extends BaseController {
  private readonly courseService: CourseService;

  constructor() {
    super();
    this.courseService = new CourseService(
      new CourseRepository()
    );
  }

  // ================== READ ==================

  public async getAll(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const courses = await this.courseService.getAll();

      res.status(200).json({ courses });
    });
  }

  public async getOne(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      const course = await this.courseService.getOne(id);

      res.status(200).json({ course });
    });
  }

  // ================== CREATE ==================

  public async create(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const dto = req.body as CreateCourseDto;

      const course = await this.courseService.create(dto);

      res.status(201).json({ course });
    });
  }

  // ================== UPDATE ==================

  public async updatePut(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      const dto = req.body as UpdateCourseDto;

      const course = await this.courseService.updatePut(
        id,
        dto
      );

      res.status(200).json({ course });
    });
  }

  public async updatePatch(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      const dto = req.body as PatchCourseDto;

      const course = await this.courseService.updatePatch(
        id,
        dto
      );

      res.status(200).json({ course });
    });
  }

  // ================== DELETE ==================

  /** Eliminación física */
  public async deletePhysical(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      await this.courseService.deletePhysical(id);

      res.status(200).json({
        message: "Course permanently deleted",
        id,
      });
    });
  }

  /** Eliminación lógica → isActive = false */
  public async deleteLogical(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const course =
        await this.courseService.deleteLogical(id);

      res.status(200).json({
        message: "Course deactivated (logical delete)",
        course,
      });
    });
  }
}