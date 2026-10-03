import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import {
  CreateEvaluationDto,
  PatchEvaluationDto,
  UpdateEvaluationDto,
} from "./dto";
import { EvaluationRepository } from "./evaluation.repository";
import { EvaluationService } from "./evaluation.service";

export class EvaluationController extends BaseController {
  private readonly evaluationService: EvaluationService;

  constructor() {
    super();
    this.evaluationService = new EvaluationService(
      new EvaluationRepository()
    );
  }

  public async getAll(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const evaluations =
        await this.evaluationService.getAll();

      res.status(200).json({ evaluations });
    });
  }

  public async getOne(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const evaluation =
        await this.evaluationService.getOne(id);

      res.status(200).json({ evaluation });
    });
  }

  public async create(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const dto = req.body as CreateEvaluationDto;

      const evaluation =
        await this.evaluationService.create(dto);

      res.status(201).json({ evaluation });
    });
  }

  public async update(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const dto = req.body as UpdateEvaluationDto;

      const evaluation =
        await this.evaluationService.updatePut(id, dto);

      res.status(200).json({ evaluation });
    });
  }

  public async patch(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const dto = req.body as PatchEvaluationDto;

      const evaluation =
        await this.evaluationService.updatePatch(id, dto);

      res.status(200).json({ evaluation });
    });
  }

  public async delete(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      await this.evaluationService.deletePhysical(id);

      res.status(200).json({
        message: "Evaluation permanently deleted",
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

      const evaluation =
        await this.evaluationService.deleteLogical(id);

      res.status(200).json({
        message: "Evaluation deactivated (logical delete)",
        evaluation,
      });
    });
  }
}
