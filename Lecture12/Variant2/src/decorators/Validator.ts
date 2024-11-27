import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'UserNameValidator', async: false })
export class UserNameValidator implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments): boolean {
    return typeof value === 'string' && value.trim().length >= 4;
  }

  defaultMessage(): string {
    return 'User name must be at least 4 characters long';
  }
}
