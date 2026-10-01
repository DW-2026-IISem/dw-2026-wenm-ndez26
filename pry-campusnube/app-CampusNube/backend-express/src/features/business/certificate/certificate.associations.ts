import { Certificate } from "./certificate.model";
import { Enrollment } from "../enrollment/enrollment.model";

Certificate.belongsTo(Enrollment, {
  foreignKey: "enrollment_id",
  as: "enrollment",
});

Enrollment.hasOne(Certificate, {
  foreignKey: "enrollment_id",
  as: "certificate",
});
