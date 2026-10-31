"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = toUserResponse;
/** Mapper modelo -> DTO de respuesta (objeto plano; elimina `password`). */
function toUserResponse(user) {
    const { password, ...safe } = user.toJSON();
    return safe;
}
//# sourceMappingURL=user-response.dto.js.map