import { ApiProperty } from "@nestjs/swagger";

import { MedicalRecord } from "src/types";
import { Web3BaseRequest } from "./web3BaseRequest";

export class AddMedicalRecordRequest extends Web3BaseRequest {
  @ApiProperty()
  record: MedicalRecord
}