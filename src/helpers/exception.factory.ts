import {BadRequestException, ValidationError} from '@nestjs/common';

export function customExceptionFactory(errors: ValidationError[]): any {
  const errorMessages: Record<string, string> = {};
  errors.forEach((error) => {
    const {constraints} = error;
    if (constraints) {
      const [firstConstraintKey] = Object.keys(constraints);
      errorMessages[error.property] = constraints[firstConstraintKey];
    }
  });

  return new BadRequestException({
    statusCode: 400,
    statusError: 'invalidInput',
    error: errorMessages
  });
}
