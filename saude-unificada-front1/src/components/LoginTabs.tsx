import {
  Button,
  Flex,
  Heading,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { LoginForms } from "./LoginForms";
import { DOCTORS_REGISTER, PATIENTS_REGISTER } from "../constants";

export const LoginTabs = () => {
  return (
    <>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Médico</Tab>
          <Tab>Paciente</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginForms type="Médico" redirectLink="/records" options={DOCTORS_REGISTER}/>
          </TabPanel>
          <TabPanel>
            <LoginForms type="Paciente" redirectLink="/patients" options={PATIENTS_REGISTER}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
