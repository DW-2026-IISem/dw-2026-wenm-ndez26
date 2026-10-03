import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import {
  CreateModuleDto,
  PatchModuleDto,
  UpdateModuleDto,
} from "./dto";
import { ModuleRepository } from "./module.repository";
import { ModuleService } from "./module.service";

export class ModuleController extends BaseController {
  private readonly moduleService: ModuleService;

  constructor() {
    super();
    this.moduleService = new ModuleService(
      new ModuleRepository()
    );
  }

  public async getAll(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const modules = await this.moduleService.getAll();

      res.status(200).json({ modules });
    });
  }

  public async getOne(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const module = await this.moduleService.getOne(id);

      res.status(200).json({ module });
    });
  }

  public async create(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const dto = req.body as CreateModuleDto;

      const module = await this.moduleService.create(dto);

      res.status(201).json({ module });
    });
  }

  public async update(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const dto = req.body as UpdateModuleDto;

      const module =
        await this.moduleService.updatePut(id, dto);

      res.status(200).json({ module });
    });
  }

  public async patch(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const dto = req.body as PatchModuleDto;

      const module =
        await this.moduleService.updatePatch(id, dto);

      res.status(200).json({ module });
    });
  }

  public async delete(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      await this.moduleService.deletePhysical(id);

      res.status(200).json({
        message: "Module permanently deleted",
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

      const module =
        await this.moduleService.deleteLogical(id);

      res.status(200).json({
        message: "Module deactivated (logical delete)",
        module,
      });
    });
  }
}
