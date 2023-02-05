import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

import { Header } from "../../components/Header";

import axios from "axios";
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { RecordsTable } from "../../components/RecordsTable";
import { PatientRequestsTable } from "../../components/PatientRequestsTable";
import { PatientMedicalTable } from "../../components/PatientMedicalTable";

export const Patients = () => {
  const { state: patient } = useLocation();
  console.log(patient);

  const { data: patientRecords, isLoading } = useQuery(
    "get-medical-records",
    async () => {
      const response = await axios.post(
        "http://localhost:3001/patients/get-medical-records",
        {
          patientsWallet: patient,
        }
      );

      return response.data;
    }
  );

  return isLoading ? (
    <h1>Carrengando...</h1>
  ) : (
    <>
      <Header title="Paciente" />
      <Tabs isFitted variant="enclosed" isLazy={true}>
        <TabList mb="1em">
          <Tab>Registros Médicos</Tab>
          <Tab>Solicitações</Tab>
          <Tab>Médicos</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {isLoading ? (
              <h1>Carrengando...</h1>
            ) : (
              <Flex direction="column" align="center" justify="center" gap="2">
                <Box w="90vw">
                  <RecordsTable records={patientRecords} />
                </Box>
                <Box w="90vw"></Box>
              </Flex>
            )}
          </TabPanel>
          <TabPanel>
            <PatientRequestsTable patient={patient} />
          </TabPanel>
          <TabPanel>
            <PatientMedicalTable patient={patient}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
