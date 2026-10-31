"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLearnerResponseDto = void 0;
const toLearnerResponseDto = (learner) => {
    const data = learner.get({ plain: true });
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    };
};
exports.toLearnerResponseDto = toLearnerResponseDto;
//# sourceMappingURL=learner-response.dto.js.map