import { Injectable } from '@nestjs/common';

import { MedicalService } from 'src/Services/medical.service';

import { Web3BaseRequest } from 'src/Models/web3BaseRequest';
import { AddMedicalRecordRequest } from 'src/Models/addMedicalRecordRequest';
import { GetAllowedPatientsRequest } from 'src/Models/getAllowedPatientsRequest';

import { MedicalRecord, Patient } from 'src/types';
import { PatientsService } from 'src/Services/patients.service';
import { RecordParser } from 'src/Functions/recordParser';

@Injectable()
export class MedicalFacade {
  constructor(
    private readonly medicalService: MedicalService,
    private readonly patientsService: PatientsService,
    private readonly recordParser: RecordParser,
  ) {}

  public async requestAccessToPatient(
    web3BaseRequest: Web3BaseRequest,
  ): Promise<any> {
    return await this.medicalService.requestPatientAccess(web3BaseRequest);
  }

  public async getAllowedPatients(
    getAllowedPatientsRequest: GetAllowedPatientsRequest,
  ): Promise<Patient[]> {
    const patientWallets = await this.medicalService.getPatients(
      getAllowedPatientsRequest,
    );

    const parsedPatients = await Promise.all(
      patientWallets.map(
        async (patientWallet) =>
          await this.convertPatientWallets(
            patientWallet,
            getAllowedPatientsRequest.doctorWallet,
          ),
      ),
    );

    return parsedPatients;
  }

  public async getMedicalRecords(
    web3BaseRequest: Web3BaseRequest,
  ): Promise<MedicalRecord[]> {
    const blockchainInstance = await this.medicalService.getRecords(
      web3BaseRequest,
    );
    const parsedRecords = await this.recordParser.parse(blockchainInstance);

    return parsedRecords;
  }

  public async addMedicalRecords(
    addMedicalRecordRequest: AddMedicalRecordRequest,
  ): Promise<any> {
    return await this.medicalService.addRecord(addMedicalRecordRequest);
  }

  private async convertPatientWallets(
    patientWallet: string,
    doctorWallet: string,
  ): Promise<Patient> {
    const web3Resquest = new Web3BaseRequest();
    web3Resquest.doctorWallet = doctorWallet;
    web3Resquest.patientsWallet = patientWallet;

    return {
      Nome:
        (await this.patientsService.getPatientsName(web3Resquest)) ||
        'Sem Nome',
      Carteira: patientWallet,
    };
  }
}
