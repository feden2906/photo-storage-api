import { UnprocessableEntityException } from '@nestjs/common';

export class EntityNotFoundException extends UnprocessableEntityException {
  constructor() {
    super({ message: 'Entity not found' });
  }
}
