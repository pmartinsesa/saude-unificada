export type MedicalRecord = {
  patientName: string;
  hospital: string;
  doctor: Doctor;
  analysis: Analysis
}

export type Doctor = {
  name: string;
  register: string;
}

export type Patient = {
  Nome: string;
  Carteira: string;
}

export type Analysis = {
  diagnostic: string;
  prognostic: string;
  files: string[];
}

export type BlockchainInstance = {
  cid: string;
  fileName: string;
}