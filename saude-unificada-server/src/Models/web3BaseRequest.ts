import { ApiProperty } from "@nestjs/swagger"

export class Web3BaseRequest {
  @ApiProperty()
  patientsWallet: string;
  
  @ApiProperty()
  doctorWallet: string;
}