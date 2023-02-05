import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

import { Box, Button, Flex } from "@chakra-ui/react";

import { PacientSelect } from "../../components/PacientSelect";
import { RecordsTable } from "../../components/RecordsTable";
import { RecordForm } from "../../components/RecordForm";
import { Header } from "../../components/Header";

import axios from "axios";
import { AccessForm } from "../../components/AccessForm";

export const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [patient, setPatient] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(false);

  const { state: doctor } = useLocation();

  const { data: allowedPatients, isLoading } = useQuery(
    "get-allowed-patients",
    async () => {
      const response = await axios.post(
        "http://localhost:3001/medical/get-allowed-patients",
        {
          doctorWallet: doctor,
        }
      );

      return response.data;
    }
  );

  const getSelectedPatientRecords = async (event: any) => {
    const patientWallet = event?.target?.value;
    setPatient(patientWallet);
    if (patientWallet) {
      setLoadingScreen(true);
      const response = await axios.post(
        "http://localhost:3001/medical/get-medical-records-by-clients",
        {
          patientsWallet: patientWallet,
          doctorWallet: doctor,
        }
      );
      setRecords(response.data);
      setLoadingScreen(false);
    } else {
      setRecords([]);
    }
  };

  return (
    <>
      <Header title="Médico" />
      {loadingScreen || isLoading ? (
        <h1>Carrengando...</h1>
      ) : (
        <Flex direction="column" align="center" justify="center" gap="2">
          <Box w="50vw">
            <PacientSelect
              margin={5}
              options={allowedPatients}
              onChange={getSelectedPatientRecords}
              value={patient}
            />
          </Box>
          <Box w="90vw">
            <RecordsTable records={records} />
          </Box>
          <Box
            w="90vw"
            display="flex"
            mt="2"
            alignItems="center"
            justifyContent="flex-end"
          >
           <AccessForm doctor={doctor} />
            {!!patient ? (
              <RecordForm
                setLoadingScreen={setLoadingScreen}
                setRecords={setRecords}
                patientName={patient}
                doctor={doctor}
              />
            ) : (
              <></>
            )}
          </Box>
        </Flex>
      )}
    </>
  );
};
