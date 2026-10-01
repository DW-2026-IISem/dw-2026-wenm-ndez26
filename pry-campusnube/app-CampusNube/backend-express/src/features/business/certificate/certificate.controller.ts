import { Request, Response } from "express";
import { Certificate } from "./certificate.model";
import { Enrollment } from "../enrollment/enrollment.model";

export class CertificateController {

  public async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const certificates = await Certificate.findAll();

      res.status(200).json(certificates);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los certificados",
        error,
      });
    }
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    try {
      const certificate = await Certificate.findByPk(
        Number(req.params.id)
      );

      if (!certificate) {
        res.status(404).json({
          message: "Certificado no encontrado",
        });
        return;
      }

      res.status(200).json(certificate);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el certificado",
        error,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        enrollment_id,
        name,
        description,
        isActive,
      } = req.body;

      if (!enrollment_id) {
        res.status(400).json({
          message: "El campo enrollment_id es obligatorio",
        });
        return;
      }

      if (!name) {
        res.status(400).json({
          message: "El campo name es obligatorio",
        });
        return;
      }

      const enrollment = await Enrollment.findByPk(
        Number(enrollment_id)
      );

      if (!enrollment) {
        res.status(404).json({
          message: "La inscripción indicada no existe",
        });
        return;
      }

      const existing = await Certificate.findOne({
        where: {
          enrollment_id,
        },
      });

      if (existing) {
        res.status(409).json({
          message:
            "La inscripción ya tiene un certificado asociado",
        });
        return;
      }

      const certificate = await Certificate.create({
        enrollment_id,
        name,
        description,
        isActive:
          isActive !== undefined ? isActive : true,
      });

      res.status(201).json(certificate);
    } catch (error) {
      res.status(500).json({
        message: "Error al crear el certificado",
        error,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const certificate = await Certificate.findByPk(
        Number(req.params.id)
      );

      if (!certificate) {
        res.status(404).json({
          message: "Certificado no encontrado",
        });
        return;
      }

      if (req.body.enrollment_id !== undefined) {
        const enrollment = await Enrollment.findByPk(
          Number(req.body.enrollment_id)
        );

        if (!enrollment) {
          res.status(404).json({
            message: "La inscripción indicada no existe",
          });
          return;
        }
      }

      await certificate.update(req.body);

      res.status(200).json(certificate);
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar el certificado",
        error,
      });
    }
  }

  public async patch(req: Request, res: Response): Promise<void> {
    try {
      const certificate = await Certificate.findByPk(
        Number(req.params.id)
      );

      if (!certificate) {
        res.status(404).json({
          message: "Certificado no encontrado",
        });
        return;
      }

      if (req.body.enrollment_id !== undefined) {
        const enrollment = await Enrollment.findByPk(
          Number(req.body.enrollment_id)
        );

        if (!enrollment) {
          res.status(404).json({
            message: "La inscripción indicada no existe",
          });
          return;
        }
      }

      await certificate.update(req.body);

      res.status(200).json(certificate);
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar parcialmente el certificado",
        error,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const certificate = await Certificate.findByPk(
        Number(req.params.id)
      );

      if (!certificate) {
        res.status(404).json({
          message: "Certificado no encontrado",
        });
        return;
      }

      await certificate.destroy();

      res.status(200).json({
        message: "Certificado eliminado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar el certificado",
        error,
      });
    }
  }
}
