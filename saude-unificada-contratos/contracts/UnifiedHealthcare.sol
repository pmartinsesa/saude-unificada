// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

contract UnifiedHealthcare {
    address public owner;

    constructor() {
        owner = msg.sender;
    } 

    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o dono pode fazer a chamada da funcao");
        _;
    }

    struct Pacient_t {
        string name;
        string[] medicalRecordsCID; //CID's dos prontuários na IPFS;
        address[] pendingApprovals; //Solicitações de acesso pendentes;
        mapping(address => bool)  authorizedWalletsToPacientData; //Mapping que gerencia acesso aos dados
        address[] keys;
    }

    mapping(address => Pacient_t) private pacientsList;
    mapping (address => address[]) private doctorPacientAuthMatrix; 


    // Autoriza acesso do médico aos dados do paciente
    function authorizeWallet(address _patientWallet, address _doctorWallet) public
    {   
        require(msg.sender == _patientWallet, "ERRO: ACESSO NEGADO");
        pacientsList[_patientWallet].authorizedWalletsToPacientData[_doctorWallet] = true;
        pacientsList[_patientWallet].keys.push(_doctorWallet);
        doctorPacientAuthMatrix[_doctorWallet].push(_patientWallet);
        removeFromArray(_doctorWallet, pacientsList[_patientWallet].pendingApprovals);
    }
    // Desautoriza acesso do médico aos dados do paciente
    function unauthorizeWallet(address _patientWallet, address _doctorWallet) public
    {   
        require(msg.sender == _patientWallet, "ERRO: ACESSO NEGADO");
        removeFromArray(_patientWallet, doctorPacientAuthMatrix[_doctorWallet]);
        removeFromArray(_doctorWallet, pacientsList[_patientWallet].keys);
        if(pacientsList[_patientWallet].authorizedWalletsToPacientData[_doctorWallet] == false)
            removeFromArray(_doctorWallet, pacientsList[_patientWallet].pendingApprovals);
        pacientsList[_patientWallet].authorizedWalletsToPacientData[_doctorWallet] = false;
    }
    // Solicita acesso a dados de paciente
    function requestAccess(address _patientWallet, address _doctorWallet) public
    {   
        if(pacientsList[_patientWallet].authorizedWalletsToPacientData[_doctorWallet] == false)
            pacientsList[_patientWallet].pendingApprovals.push(_doctorWallet);

    }

    // Solicita acesso a dados de paciente
    function getPendingApprovals(address _patientWallet) public view returns (address[] memory)
    {
        require(msg.sender == _patientWallet, "ERRO: ACESSO NEGADO");
        return pacientsList[_patientWallet].pendingApprovals;

    }

    // Retorna lista de todos os pacientes cujo médico tem acesso aos dados
    function getAllAuthorizedPacientsByDoctor(address _doctorWallet) public view returns (address[] memory)
    {   
       require(msg.sender == _doctorWallet, "ERRO: ACESSO NEGADO");
       return doctorPacientAuthMatrix[_doctorWallet];
        
    }

    // Retorna lista de todos os médicos que tem acesso aos dados do paciente
    function getAllAuthorizedPacientsByPacient(address _patientWallet) public view returns (address[] memory)
    {   
       require(msg.sender == _patientWallet, "ERRO: ACESSO NEGADO");
       uint arrLenght = pacientsList[_patientWallet].keys.length;
       address[] memory returnArr = new address[](arrLenght);

        for (uint i=0; i < arrLenght; i++) {
            returnArr[i] = pacientsList[_patientWallet].keys[i];
        }
       return returnArr;
    }

    // Verifica se o medico pode pegar os dados.
    function verifyIfDoctorIsAllowed(address _patientWallet,address _doctorWallet) private view returns (bool)
    {   
        if(pacientsList[_patientWallet].authorizedWalletsToPacientData[_doctorWallet]) 
            return true;
        return false;
    }

    // Adiciona prontuário médico
    function addMedicalRecord(address _patientWallet,address _doctorWallet, string memory _medicalRecordJSON) public
    {   
        require(verifyIfDoctorIsAllowed(_patientWallet, _doctorWallet ), "ERRO: ACESSO NEGADO");
        pacientsList[_patientWallet].medicalRecordsCID.push(_medicalRecordJSON);
    }

    // Retorna o prontuarios do paciente
    // wallets[0]: carteira do paciente; wallets[1]: carteira do médico
    function getMedicalRecords(address[] memory _wallets) public view returns (string[]memory)
    {   
        if(_wallets.length > 1)
            require(verifyIfDoctorIsAllowed(_wallets[0], _wallets[1]), "ERRO: ACESSO NEGADO");
        else
            require(msg.sender == _wallets[0], "ERRO: ACESSO NEGADO");
        return pacientsList[_wallets[0]].medicalRecordsCID;
    }

   // Seta nome do paciente na struct Pacient_t <-- não precisaria pq o sistema de cada um teria que ter uma conta associada a wallet
    function setPacientName(address _patientWallet, string memory _name) public
    {   
        require(msg.sender == _patientWallet, "ERRO: ACESSO NEGADO");
        pacientsList[_patientWallet].name = _name;
    }

    // Retorna o nome do paciente na struct Pacient_t <-- não precisaria pq o sistema de cada um teria que ter uma conta associada a wallet
    function getPacientName(address _patientWallet, address _doctorWallet) public view returns (string memory)
    {   
        require(verifyIfDoctorIsAllowed(_patientWallet, _doctorWallet ), "ERRO: ACESSO NEGADO");
        return pacientsList[_patientWallet].name;
    }

    // Remove item de um array
    function removeFromArray(address itemToDelete,  address[] storage array) private 
    {  
        uint arrLenght = array.length;
        for (uint i=0; i < arrLenght; i++) {
            if(array[i] == itemToDelete) {
                array[i] = array[arrLenght-1];
                array.pop();
                break;
            }
        }
    }
}