import { ApiProperty } from "@nestjs/swagger";

export class GetAllowedPatientsRequest {
  @ApiProperty()
  doctorWallet: string
}