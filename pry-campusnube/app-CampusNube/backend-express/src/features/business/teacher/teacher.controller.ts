import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import {
  CreateTeacherDto,
  PatchTeacherDto,
  UpdateTeacherDto,
} from "./dto";
import { TeacherRepository } from "./teacher.repository";
import { TeacherService } from "./teacher.service";

export class TeacherController extends BaseController {
  private readonly teacherService: TeacherService;

  constructor() {
    super();
    this.teacherService = new TeacherService(
      new TeacherRepository()
    );
  }

  // ================== READ ==================

  public async getAll(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const teachers = await this.teacherService.getAll();

      res.status(200).json({ teachers });
    });
  }

  public async getOne(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      const teacher = await this.teacherService.getOne(id);

      res.status(200).json({ teacher });
    });
  }

  // ================== CREATE ==================

  public async create(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const dto = req.body as CreateTeacherDto;

      const teacher = await this.teacherService.create(dto);

      res.status(201).json({ teacher });
    });
  }

  // ================== UPDATE ==================

  public async updatePut(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      const dto = req.body as UpdateTeacherDto;

      const teacher = await this.teacherService.updatePut(
        id,
        dto
      );

      res.status(200).json({ teacher });
    });
  }

  public async updatePatch(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      const dto = req.body as PatchTeacherDto;

      const teacher = await this.teacherService.updatePatch(
        id,
        dto
      );

      res.status(200).json({ teacher });
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

      await this.teacherService.deletePhysical(id);

      res.status(200).json({
        message: "Teacher permanently deleted",
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

      const teacher =
        await this.teacherService.deleteLogical(id);

      res.status(200).json({
        message: "Teacher deactivated (logical delete)",
        teacher,
      });
    });
  }
}