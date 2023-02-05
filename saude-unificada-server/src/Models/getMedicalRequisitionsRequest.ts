import { ApiProperty } from "@nestjs/swagger";

export class GetMedicalRequisitionsRequest {
  @ApiProperty()
  patientsWallet: string
}