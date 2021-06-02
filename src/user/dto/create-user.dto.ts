import { IsEmpty, IsNotEmpty } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly phoneNumber: string;
  
  readonly websiteUrl? : string;
}