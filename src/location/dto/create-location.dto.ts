import { Type } from "class-transformer";
import { IsNumber, ValidateNested } from "class-validator";
import { CreateUserDTO } from "src/user/dto/create-user.dto";

export class CreateLocationDTO {

  @IsNumber()
  readonly longitude: number;

  @IsNumber()
  readonly latitude: number;

  @ValidateNested({ each: true })
  @Type(() => CreateUserDTO)
  readonly user: CreateUserDTO;
}