import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiGlobalResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({ type: model }),
    ApiUnauthorizedResponse({ description: 'Not authenticated' }),
    ApiForbiddenResponse({ description: 'Access denied' }),
    ApiNotFoundResponse({ description: 'Not found' }),
    ApiInternalServerErrorResponse({ description: 'Server error' }),
  );
};
