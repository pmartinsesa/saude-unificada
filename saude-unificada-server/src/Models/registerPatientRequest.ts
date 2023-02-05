import { ApiProperty } from "@nestjs/swagger";

export class RegisterPatientRequest {
  @ApiProperty()
  patientWallet: string;
  
  @ApiProperty()
  name: string;
}