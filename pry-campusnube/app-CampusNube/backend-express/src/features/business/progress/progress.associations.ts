import { Progress } from "./progress.model";
import { Enrollment } from "../enrollment/enrollment.model";

Progress.belongsTo(Enrollment, {
  foreignKey: "enrollment_id",
  as: "enrollment",
});

Enrollment.hasMany(Progress, {
  foreignKey: "enrollment_id",
  as: "progress",
});
