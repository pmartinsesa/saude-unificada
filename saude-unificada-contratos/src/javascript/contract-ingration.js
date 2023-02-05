const web3 = new Web3("HTTP://127.0.0.1:7545");
const contractInstanceAddress = "0xc2d216533d3f43da2f6aa5e2ccd73cd4230e28c2";
const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [
      { internalType: "address", name: "_patientWallet", type: "address" },
      { internalType: "string", name: "_name", type: "string" },
    ],
    name: "setPacientName",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_patientWallet", type: "address" },
      { internalType: "address", name: "_doctorWallet", type: "address" },
    ],
    name: "addDoctorOnList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_patientWallet", type: "address" },
      { internalType: "address", name: "_doctorWallet", type: "address" },
    ],
    name: "getMedicalRecord",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_patientWallet", type: "address" },
      { internalType: "address", name: "_doctorWallet", type: "address" },
    ],
    name: "getPacientName",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_doctorWallet", type: "address" },
    ],
    name: "getAllAuthorizedPacientsByDoctor",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_patientWallet", type: "address" },
      { internalType: "address", name: "_doctorWallet", type: "address" },
      { internalType: "string", name: "_medicalRecordJSON", type: "string" },
    ],
    name: "addMedicalRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const contract = new web3.eth.Contract(abi, contractInstanceAddress);

const doc1Wallet = "0xf47A8e1DA82C275Db06a7D4B5A31586F0D058cE3";
const doc2Wallet = "0xf47A8e1DA82C275Db06a7D4B5A31586F0D058cE3";
const pacientWallet = "0xaF497c43260e2b5650E123bBe70782b0C0eF2848";

async function getPacientName() {
  let response = await contract.methods 
    .getPacientName(pacientWallet, doc1Wallet)
    .call();
  console.log("paciente nome", response);
}
async function setPacientName() {
  let response = await contract.methods
    .setPacientName(pacientWallet, "Zé do caminhão")
    .send({from: pacientWallet});
  console.log("Nome registrado", response); 
}
async function addDoctorOnList() {
  let response = await contract.methods
    .addDoctorOnList(pacientWallet, doc1Wallet)
    .send({ from: pacientWallet });
  console.log("add doc", response);
}
async function addMedicalRecord() {
  let response = await contract.methods
    .addMedicalRecord(
      pacientWallet,
      doc1Wallet,
      '{"Nome":"Pedro","Hospital":"SãoLucas","Medico":{"Nome":"JoséCleiton","CRM":"0000-00"},"Analise":{"Diagnostico":"MACONHEIRO","Progronostico":"VAIMORRERANTESDONATAL","Imagens":["BASE64"]}}'
    )
    .send({ from: pacientWallet, gas: 300000 });
  console.log("add mR", response);
}
async function getAllAuthorizedPacientsByDoctor() {
  let response = await contract.methods.getAllAuthorizedPacientsByDoctor(
    doc1Wallet
  ).call();
  console.log("athorizados", response);
}
async function getMedicalRecord() {
  let response = await contract.methods
    .getMedicalRecord(pacientWallet, doc1Wallet)
    .call();
  console.log("medical record link", response);
}
