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
import { BsDashCircle } from "react-icons/bs";

import axios from "axios";
import { useState } from "react";

export type PatientMedicalTableProps = {
  patient: string;
};

export const PatientMedicalTable = ({
  patient,
}: PatientMedicalTableProps) => {
  const [medicalsAuthorized, setMedicalsAuthorized] = useState([])
  const toast = useToast();

  const getMedicalRequests = async () => {
    const response = await axios.post(
      "http://localhost:3001/patients/get-authorized-doctors-list",
      {
        patientsWallet: patient,
      }
    );
    setMedicalsAuthorized(response.data)
  }

  const { isLoading } = useQuery(
    "get-authorized-doctors-list",
    getMedicalRequests
  );

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
        <TableCaption>Médicos com autorização</TableCaption>
        <Thead>
          <Tr>
            <Th>Médico</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {medicalsAuthorized.map((med: string) => (
            <Tr key={med}>
              <Td>{med}</Td>
              <Td>
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
