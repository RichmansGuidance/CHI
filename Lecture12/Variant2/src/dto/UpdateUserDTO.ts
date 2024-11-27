import { IsEmail, Validate, IsOptional } from 'class-validator';
import { UserNameValidator } from '../decorators/Validator';

export class UpdateUserDTO {
  @IsOptional() 
  @Validate(UserNameValidator, {
    message: 'User name must be at least 4 characters long',
  })
  user?: string; 

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;
}
