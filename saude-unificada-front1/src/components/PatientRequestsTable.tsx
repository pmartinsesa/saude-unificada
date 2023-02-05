import { useQuery } from "react-query";

import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Tfoot,
  useToast,
} from "@chakra-ui/react";
import { BsCheckCircle, BsDashCircle } from "react-icons/bs";

import axios from "axios";
import { useState } from "react";

export type PatientRequestsTableProps = {
  patient: string;
};

export const PatientRequestsTable = ({
  patient,
}: PatientRequestsTableProps) => {
  const [medicalsRequests, setMedicalsRequests] = useState([])
  const toast = useToast();

  const getMedicalRequests = async () => {
    const response = await axios.post(
      "http://localhost:3001/patients/get-medical-requests",
      {
        patientsWallet: patient,
      }
    );
    setMedicalsRequests(response.data)
  }

  const { isLoading } = useQuery(
    "get-medical-requests",
    getMedicalRequests
  );

  const acceptRequest = async (e: any) => {
    const doctor = e.target?.id;
    console.log("doutor ", doctor)
    console.log("paciente ", patient)
    const response = await axios.post(
      "http://localhost:3001/patients/allowed-doctor",
      {
        patientsWallet: patient,
        doctorWallet: doctor,
      }
    );

    if (response.status === 200) {
      toast({
        position: "bottom-left",
        title: "Ação concluida com sucesso",
        description: "O médico tem acesso aos seus dados",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      getMedicalRequests();
    }
  }

  const rejectRequest = async (e: any) => {
    const doctor = e.target?.id;

    console.log("doutor ", doctor)
    console.log("paciente ", patient)

    const response = await axios.post(
      "http://localhost:3001/patients/reject-doctor",
      {
        patientsWallet: patient,
        doctorWallet: doctor,
      }
    );

    if (response.status === 200) {
      toast({
        position: "bottom-left",
        title: "Ação concluida com sucesso",
        description: "Medico removido das solicitações",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      getMedicalRequests();
    }
  }

  return isLoading ? (
    <h1>Carrengando...</h1>
  ) : (
    <TableContainer>
      <Table variant="simple" size="lg">
        <TableCaption>Médicos Solicitando Permissão aos dados</TableCaption>
        <Thead>
          <Tr>
            <Th>Médico</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {medicalsRequests.map((med: string) => (
            <Tr key={med}>
              <Td>{med}</Td>
              <Td>
                <IconButton
                  colorScheme="teal"
                  aria-label="Accept"
                  icon={<BsCheckCircle id={med} />}
                  onClick={acceptRequest}
                  id={med}
                />
                <IconButton
                  colorScheme="red"
                  aria-label="Decline"
                  marginLeft="0.5rem"
                  icon={<BsDashCircle id={med}/>}
                  onClick={rejectRequest}
                  id={med}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot></Tfoot>
      </Table>
    </TableContainer>
  );
};
