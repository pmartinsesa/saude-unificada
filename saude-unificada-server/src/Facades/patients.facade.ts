import { Injectable } from '@nestjs/common';

import { PatientsService } from 'src/Services/patients.service';

import { Web3BaseRequest } from 'src/Models/web3BaseRequest';
import { RegisterPatientRequest } from 'src/Models/registerPatientRequest';
import { RecordParser } from 'src/Functions/recordParser';
import { GetMedicalRequisitionsRequest } from 'src/Models/getMedicalRequisitionsRequest';
import { MedicalRecord } from 'src/types';

@Injectable()
export class PatientsFacade {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly recordParser: RecordParser,
  ) {}

  public async registerNewPatient(
    registerPatientRequest: RegisterPatientRequest,
  ): Promise<any> {
    return await this.patientsService.registerPatient(registerPatientRequest);
  }

  public async verifyRequisitons(
    getMedicalRequisitionsRequest: GetMedicalRequisitionsRequest,
  ): Promise<string[]> {
    return await this.patientsService.getMedicalRequisitions(getMedicalRequisitionsRequest);
  }

  public async addDoctorOnAllowedList(
    web3BaseRequest: Web3BaseRequest,
  ): Promise<any> {
    return await this.patientsService.addDoctorOnList(web3BaseRequest);
  }

  public async declineDoctor(web3BaseRequest: Web3BaseRequest): Promise<any> {
    return await this.patientsService.removeDoctorOnList(web3BaseRequest);
  }

  public async getPatientsRecords(
    getMedicalRequisitionsRequest: GetMedicalRequisitionsRequest,
  ): Promise<MedicalRecord[]> {
    const blockchainInstance = await this.patientsService.getRecordsAsPatient(
      getMedicalRequisitionsRequest
    );
    const parsedRecords = await this.recordParser.parse(blockchainInstance);

    return parsedRecords;
  }

  public async getAuthorizedDoctorsByPatient(
    getMedicalRequisitionsRequest: GetMedicalRequisitionsRequest,
  ): Promise<string[]> {
    return await this.patientsService.getAuthorizedDoctors(getMedicalRequisitionsRequest);
  }
}
