import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name:string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  surname:string;

  @IsString()
  @MinLength(5)
  @MaxLength(150)
  address:string;
}