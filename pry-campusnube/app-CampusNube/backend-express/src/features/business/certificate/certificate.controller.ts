import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/app-error";
import { BaseController } from "../../../shared/http/base-controller";
import {
  CreateCertificateDto,
  PatchCertificateDto,
  UpdateCertificateDto,
} from "./dto";
import { CertificateService } from "./certificate.service";

export class CertificateController extends BaseController {
  private readonly service = new CertificateService();

  public async getAll(
    _req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const certificates = await this.service.getAll();

      res.status(200).json(certificates);
    });
  }

  public async getOne(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const certificate =
        await this.service.getOne(id);

      res.status(200).json(certificate);
    });
  }

  public async create(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const {
        enrollment_id,
        name,
        description,
        isActive,
      } = req.body as Partial<CreateCertificateDto>;

      if (!enrollment_id) {
        throw new AppError(
          400,
          "The enrollment_id field is required"
        );
      }

      if (!name) {
        throw new AppError(
          400,
          "The name field is required"
        );
      }

      const data: CreateCertificateDto = {
        enrollment_id,
        name,
        description,
        isActive,
      };

      const certificate =
        await this.service.create(data);

      res.status(201).json(certificate);
    });
  }

  public async update(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const {
        enrollment_id,
        name,
        description,
      } = req.body as Partial<UpdateCertificateDto>;

      if (!enrollment_id) {
        throw new AppError(
          400,
          "The enrollment_id field is required"
        );
      }

      if (!name) {
        throw new AppError(
          400,
          "The name field is required"
        );
      }

      const data: UpdateCertificateDto = {
        enrollment_id,
        name,
        description,
      };

      const certificate =
        await this.service.update(id, data);

      res.status(200).json(certificate);
    });
  }

  public async patch(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const data =
        req.body as PatchCertificateDto;

      const certificate =
        await this.service.patch(id, data);

      res.status(200).json(certificate);
    });
  }

  public async delete(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      await this.service.delete(id);

      res.status(200).json({
        message: "Certificate deleted successfully",
      });
    });
  }

  public async deactivate(
    req: Request,
    res: Response
  ): Promise<void> {
    await this.run(res, async () => {
      const id = this.paramId(req);

      const certificate =
        await this.service.deactivate(id);

      res.status(200).json(certificate);
    });
  }
}
