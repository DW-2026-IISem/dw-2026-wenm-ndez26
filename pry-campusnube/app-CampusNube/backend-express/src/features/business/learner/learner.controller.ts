import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import {
  CreateLearnerDto,
  PatchLearnerDto,
  UpdateLearnerDto,
} from "./dto";
import { LearnerService } from "./learner.service";
import { LearnerRepository } from "./learner.repository";

export class LearnerController extends BaseController {
  private readonly learnerService: LearnerService;

  constructor() {
    super();
    this.learnerService = new LearnerService(
      new LearnerRepository()
    );
  }

  // ================== READ ==================

  public async getAll(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const learners = await this.learnerService.getAll();

      res.status(200).json({ learners });
    });
  }

  public async getOne(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      const learner = await this.learnerService.getOne(id);

      res.status(200).json({ learner });
    });
  }

  // ================== CREATE ==================

  public async create(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const dto = req.body as CreateLearnerDto;

      const learner = await this.learnerService.create(dto);

      res.status(201).json({ learner });
    });
  }

  // ================== UPDATE ==================

  public async updatePut(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      const dto = req.body as UpdateLearnerDto;

      const learner = await this.learnerService.updatePut(
        id,
        dto
      );

      res.status(200).json({ learner });
    });
  }

  public async updatePatch(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);
      const dto = req.body as PatchLearnerDto;

      const learner = await this.learnerService.updatePatch(
        id,
        dto
      );

      res.status(200).json({ learner });
    });
  }

  // ================== DELETE ==================

  /**
   * Eliminación física.
   */
  public async deletePhysical(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      await this.learnerService.deletePhysical(id);

      res.status(200).json({
        message: "Learner permanently deleted",
        id,
      });
    });
  }

  /**
   * Eliminación lógica → status = inactive.
   */
  public async deleteLogical(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const learner =
        await this.learnerService.deleteLogical(id);

      res.status(200).json({
        message: "Learner deactivated (logical delete)",
        learner,
      });
    });
  }
}