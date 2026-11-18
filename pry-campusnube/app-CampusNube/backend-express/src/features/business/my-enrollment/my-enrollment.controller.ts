import { Request, Response } from "express";
import "../../../shared/auth/auth-user";
import { AppError } from "../../../shared/errors/app-error";
import { BaseController } from "../../../shared/http/base-controller";
import { Enrollment } from "../enrollment/enrollment.model";
import { Learner } from "../learner/learner.model";
import { Course } from "../course/course.model";

/**
 * Inscripciones del aprendiz autenticado.
 * El aprendiz se resuelve SIEMPRE desde el token (req.auth.id);
 * nunca se acepta learner_id desde el cliente.
 */
export class MyEnrollmentController extends BaseController {
  public async list(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const learner = await this.learnerOf(req);

      const enrollments = await Enrollment.findAll({
        where: { learner_id: learner.id, status: "active" },
        order: [["id", "ASC"]],
      });

      res.status(200).json({ enrollments });
    });
  }

  public async enroll(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const learner = await this.learnerOf(req);

      const courseId = Number(req.body?.course_id);
      if (!Number.isInteger(courseId) || courseId < 1) {
        throw new AppError(400, "course_id must be a positive integer");
      }

      const course = await Course.findByPk(courseId);
      const data = course as any;
      const courseActive = data ? (data.isActive ?? data.is_active ?? true) : false;

      if (!course || !courseActive) {
        throw new AppError(404, "Course not found or inactive");
      }

      const existing = await Enrollment.findOne({
        where: { learner_id: learner.id, course_id: courseId, status: "active" },
      });

      if (existing) {
        throw new AppError(409, "Already enrolled in this course");
      }

      const enrollment = await Enrollment.create({
        learner_id: learner.id,
        course_id: courseId,
        enrollment_date: new Date(),
        status: "active",
      });

      res.status(201).json({ enrollment });
    });
  }

  private async learnerOf(req: Request): Promise<Learner> {
    const learner = await Learner.findOne({
      where: { user_id: req.auth!.id, status: "active" },
    });

    if (!learner) {
      throw new AppError(403, "Your user is not linked to an active learner profile");
    }

    return learner;
  }
}
