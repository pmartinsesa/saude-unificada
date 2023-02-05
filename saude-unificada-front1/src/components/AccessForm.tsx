import React, { useState } from "react";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaHospitalUser } from "react-icons/fa";
import { PATIENTS_REGISTER } from "../constants";
import axios from "axios";

export type AccessFormProps = {
  doctor: string;
};

export const AccessForm = ({ doctor }: AccessFormProps) => {
  const [patient, setPatient] = useState("");
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const requestAccess = async () => {
    if (patient) {
      const response = await axios.post(
        "http://localhost:3001/medical/request-access",
        {
          patientsWallet: patient,
          doctorWallet: doctor,
        }
      );

      if (response.status === 202) {
        toast({
          position: "bottom-left",
          title: "Solicitação Enviada",
          description: "Sua solicitação foi encaminhada com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        onClose();
      } else {
        toast({
          position: "bottom-left",
          title: "Erro ao enviar a solicitação",
          description: "Houve um erro ao enviar a sua solicitação.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        onClose();
      }
    }
  };

  const createSelectOptions = () => {
    return PATIENTS_REGISTER.map((op) => {
      return (
        <option key={op.wallet} value={op.wallet}>
          {op.name}
        </option>
      );
    });
  };

  return (
    <>
      <Button
        leftIcon={<FaHospitalUser />}
        colorScheme="yellow"
        variant="solid"
        onClick={onOpen}
      >
        Solicitar Acesso
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="md"
        isFullHeight={true}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Solicitar Acesso ao paciente
          </DrawerHeader>
          <DrawerBody>
            <Select
              variant="outline"
              placeholder={`Selecione o Paciente`}
              borderColor="turquoise"
              focusBorderColor="teal.500"
              value={patient}
              onChange={(v) => setPatient(v.target.value)}
            >
              {createSelectOptions()}
            </Select>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="teal" type="submit" onClick={requestAccess}>
              Solicitar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
