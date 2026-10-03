import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import {
  CreateEnrollmentDto,
  PatchEnrollmentDto,
  UpdateEnrollmentDto,
} from "./dto";
import { EnrollmentRepository } from "./enrollment.repository";
import { EnrollmentService } from "./enrollment.service";

export class EnrollmentController extends BaseController {
  private readonly enrollmentService: EnrollmentService;

  constructor() {
    super();
    this.enrollmentService = new EnrollmentService(
      new EnrollmentRepository()
    );
  }

  public async getAll(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const enrollments =
        await this.enrollmentService.getAll();

      res.status(200).json({ enrollments });
    });
  }

  public async getOne(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const enrollment =
        await this.enrollmentService.getOne(id);

      res.status(200).json({ enrollment });
    });
  }

  public async create(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const dto = req.body as CreateEnrollmentDto;

      const enrollment =
        await this.enrollmentService.create(dto);

      res.status(201).json({ enrollment });
    });
  }

  public async update(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const dto = req.body as UpdateEnrollmentDto;

      const enrollment =
        await this.enrollmentService.updatePut(id, dto);

      res.status(200).json({ enrollment });
    });
  }

  public async patch(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const dto = req.body as PatchEnrollmentDto;

      const enrollment =
        await this.enrollmentService.updatePatch(id, dto);

      res.status(200).json({ enrollment });
    });
  }

  public async delete(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      await this.enrollmentService.deletePhysical(id);

      res.status(200).json({
        message: "Enrollment permanently deleted",
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

      const enrollment =
        await this.enrollmentService.deleteLogical(id);

      res.status(200).json({
        message: "Enrollment deactivated (logical delete)",
        enrollment,
      });
    });
  }
}
