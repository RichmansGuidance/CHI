import { IsEmail, Validate } from 'class-validator';
import { UserNameValidator } from '../decorators/Validator';

export class UserDTO {
  @Validate(UserNameValidator, {
    message: 'User name must be at least 4 characters long',
  })
  user: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
}
