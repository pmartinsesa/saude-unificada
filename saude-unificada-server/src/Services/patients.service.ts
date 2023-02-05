import { Injectable } from '@nestjs/common';

import { Web3BaseRequest } from 'src/Models/web3BaseRequest';
import { RegisterPatientRequest } from 'src/Models/registerPatientRequest';
import { GetMedicalRequisitionsRequest } from 'src/Models/getMedicalRequisitionsRequest';

import { Web3Service } from './web3.service';

@Injectable()
export class PatientsService {
  constructor(private readonly web3Service: Web3Service) {}

  public async getPatientsName(
    web3BaseRequest: Web3BaseRequest,
  ): Promise<string> {
    const contract = this.web3Service.getSmartContractInstance();

    const name = (await contract.methods
      .getPacientName(
        web3BaseRequest.patientsWallet,
        web3BaseRequest.doctorWallet,
      )
      .call()) as string;

    return name;
  }

  public async registerPatient(
    registerPatientRequest: RegisterPatientRequest,
  ): Promise<any> {
    const contract = this.web3Service.getSmartContractInstance();

    const response = await contract.methods
      .setPacientName(
        registerPatientRequest.patientWallet,
        registerPatientRequest.name,
      )
      .send({ from: registerPatientRequest.patientWallet });

    return response;
  }

  public async getMedicalRequisitions(
    getMedicalRequisitionsRequest: GetMedicalRequisitionsRequest,
  ): Promise<string[]> {
    const contract = this.web3Service.getSmartContractInstance();

    const response = (await contract.methods
      .getPendingApprovals(getMedicalRequisitionsRequest.patientsWallet)
      .call({
        from: getMedicalRequisitionsRequest.patientsWallet,
      })) as string[];

    return response;
  }

  public async addDoctorOnList(web3BaseRequest: Web3BaseRequest): Promise<any> {
    const contract = this.web3Service.getSmartContractInstance();

    const response = await contract.methods
      .authorizeWallet(
        web3BaseRequest.patientsWallet,
        web3BaseRequest.doctorWallet,
      )
      .send({ from: web3BaseRequest.patientsWallet, gas: 300000 });

    return response;
  }

  public async removeDoctorOnList(
    web3BaseRequest: Web3BaseRequest,
  ): Promise<any> {
    const contract = this.web3Service.getSmartContractInstance();

    const response = await contract.methods
      .unauthorizeWallet(
        web3BaseRequest.patientsWallet,
        web3BaseRequest.doctorWallet,
      )
      .send({ from: web3BaseRequest.patientsWallet });

    return response;
  }

  public async getRecordsAsPatient(
    getMedicalRequisitionsRequest: GetMedicalRequisitionsRequest,
  ): Promise<Array<string>> {
    const contract = this.web3Service.getSmartContractInstance();

    const medicalRecords = (await contract.methods
      .getMedicalRecords([getMedicalRequisitionsRequest.patientsWallet])
      .call({
        from: getMedicalRequisitionsRequest.patientsWallet,
      })) as Array<string>;

    return medicalRecords;
  }

  public async getAuthorizedDoctors(
    getMedicalRequisitionsRequest: GetMedicalRequisitionsRequest,
  ): Promise<string[]> {
    const contract = this.web3Service.getSmartContractInstance();

    const response = (await contract.methods
      .getAllAuthorizedPacientsByPacient(getMedicalRequisitionsRequest.patientsWallet)
      .call({
        from: getMedicalRequisitionsRequest.patientsWallet,
      })) as string[];

    return response;
  }
}
