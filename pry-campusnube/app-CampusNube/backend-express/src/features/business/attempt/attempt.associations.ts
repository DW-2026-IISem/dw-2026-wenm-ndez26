import { Attempt } from "./attempt.model";
import { Enrollment } from "../enrollment/enrollment.model";

Attempt.belongsTo(Enrollment, {
  foreignKey: "enrollment_id",
  as: "enrollment",
});

Enrollment.hasMany(Attempt, {
  foreignKey: "enrollment_id",
  as: "attempts",
});
