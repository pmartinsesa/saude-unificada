import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RegisterPatientRequest } from 'src/Models/registerPatientRequest';
import { Web3BaseRequest } from 'src/Models/web3BaseRequest';

import { PatientsFacade } from 'src/Facades/patients.facade';
import { MedicalRecord } from 'src/types';
import { GetMedicalRequisitionsRequest } from 'src/Models/getMedicalRequisitionsRequest';

@ApiTags('Patients Controller')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsFacade: PatientsFacade) {}

  @Post('register-patients')
  @HttpCode(201)
  registerPatients(
    @Body() registerPatientRequest: RegisterPatientRequest,
  ): Promise<any> {
    return this.patientsFacade.registerNewPatient(registerPatientRequest);
  }

  @Post('get-medical-requests')
  @HttpCode(200)
  getMedicalRequests(@Body() getMedicalRequisitionsRequest: GetMedicalRequisitionsRequest): Promise<string[]> {
    return this.patientsFacade.verifyRequisitons(getMedicalRequisitionsRequest);
  }

  @Post('reject-doctor')
  @HttpCode(200)
  disallowedDoctor(@Body() web3BaseRequest: Web3BaseRequest): Promise<any> {
    return this.patientsFacade.declineDoctor(web3BaseRequest);
  }

  @Post('allowed-doctor')
  @HttpCode(200)
  allowedDoctor(@Body() web3BaseRequest: Web3BaseRequest): Promise<any> {
    return this.patientsFacade.addDoctorOnAllowedList(web3BaseRequest);
  }

  @Post('get-medical-records')
  @HttpCode(200)
  async getMedicalRecords(
    @Body() getMedicalRequisitionsRequest: GetMedicalRequisitionsRequest,
  ): Promise<MedicalRecord[]> {
    return this.patientsFacade.getPatientsRecords(getMedicalRequisitionsRequest);
  }

  @Post('get-authorized-doctors-list')
  @HttpCode(200)
  async getListOfAuthorizedDoctors(
    @Body() getMedicalRequisitionsRequest: GetMedicalRequisitionsRequest,
  ): Promise<string[]> {
    return this.patientsFacade.getAuthorizedDoctorsByPatient(getMedicalRequisitionsRequest);
  }
}
