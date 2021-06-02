import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class DistanceQueryDTO {

  @IsNumber()
  @Type(() => Number)
  readonly longitude: number;

  @IsNumber()
  @Type(() => Number)
  readonly latitude: number;
}