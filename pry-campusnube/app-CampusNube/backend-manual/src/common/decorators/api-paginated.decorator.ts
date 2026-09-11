import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiPaginated = (model: any) =>
  applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              items: {
                type: 'array',
                items: {
                  $ref: getSchemaPath(model),
                },
              },
              meta: {
                type: 'object',
              },
            },
          },
        ],
      },
    }),
  );
