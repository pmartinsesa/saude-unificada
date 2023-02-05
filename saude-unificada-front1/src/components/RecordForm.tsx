import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Stack,
  Box,
  FormLabel,
  Input,
  Textarea,
  DrawerFooter,
  useDisclosure,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";

import { BiAddToQueue } from "react-icons/bi";

import axios from "axios";

type FormData = {
  hospital: string;
  doctorName: string;
  crm: string;
  diagnostic: string;
  prognostic: string;
  files: FileList;
};

const schema = zod.object({
  hospital: zod.string().min(1, { message: "Escreva o nome do hospital" }),
  doctorName: zod.string().min(1, { message: "Escreva o nome do médico" }),
  crm: zod.string().min(1, { message: "Escreva o registro do médico" }),
  diagnostic: zod.string().min(1, { message: "Escreva o diagnostico" }),
  prognostic: zod.string(),
  files: zod.any(),
});

export type RecordButtonProps = {
  patientName: any;
  doctor: string;
  setRecords: React.Dispatch<React.SetStateAction<never[]>>;
  setLoadingScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RecordForm = ({
  patientName,
  setRecords,
  setLoadingScreen,
  doctor,
}: RecordButtonProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [loadingButton, setLoadingButton] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const sendToBlockchain = async (data: FormData) => {
    setLoadingButton(true);
    const newMedicalRecord = await createNewMedicalRecord(data);

    const response = await axios.post(
      "http://localhost:3001/medical/add-medical-records-on-patients-records",
      {
        patientsWallet: patientName,
        doctorWallet: doctor,
        record: newMedicalRecord,
      }
    );
    if (response.status === 201) {
      toast({
        position: "bottom-left",
        title: "Criado com sucesso",
        description: "Foi adicionado um novo prontuário",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      
      onClose();
      setLoadingButton(false);

      setLoadingScreen(true);
      const response = await axios.post(
        "http://localhost:3001/medical/get-medical-records-by-clients",
        {
          patientsWallet: patientName,
          doctorWallet: doctor,
        }
      );

      setRecords(response.data);
      setLoadingScreen(false);
    }
  };

  const createNewMedicalRecord = async (formsData: FormData) => {
    return {
      hospital: formsData.hospital,
      doctor: {
        name: formsData.doctorName,
        register: formsData.crm,
      },
      patientName: patientName,
      analysis: {
        diagnostic: formsData.diagnostic,
        prognostic: formsData.prognostic,
        files: [await setBinaryImage(formsData.files[0])],
      },
    };
  };

  const setBinaryImage = async (htmlFile: File): Promise<string> => {
    try {
      const file = await (new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(htmlFile);

        fileReader.onload = () => resolve(fileReader.result);
      }) as Promise<string>);

      return file;
    } catch (e) {
      return "";
    }
  };

  return (
    <>
      <Button
        leftIcon={<Icon as={BiAddToQueue} />}
        colorScheme="teal"
        onClick={onOpen}
        marginLeft="2"
      >
        Adicionar
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
          <form onSubmit={handleSubmit(sendToBlockchain)} action="">
            <DrawerBody marginTop={5}>
              <Stack>
                <Box>
                  <FormLabel htmlFor="hospital">Hospital</FormLabel>
                  <Input
                    id="hospital"
                    borderColor={
                      !errors.hospital?.message ? "turquoise" : "red"
                    }
                    focusBorderColor="teal.500"
                    {...register("hospital")}
                    placeholder="Escreva o nome do hospital..."
                  />
                  <Text fontSize="sm" color="red" mt={2}>
                    {errors.hospital?.message}
                  </Text>
                </Box>
                <Box>
                  <FormLabel htmlFor="doctorName">Nome do Médico</FormLabel>
                  <Input
                    id="doctorName"
                    borderColor={
                      !errors.doctorName?.message ? "turquoise" : "red"
                    }
                    focusBorderColor="teal.500"
                    {...register("doctorName")}
                    placeholder="Escreva o nome do médico..."
                  />
                  <Text fontSize="sm" color="red" mt={2}>
                    {errors.doctorName?.message}
                  </Text>
                </Box>
                <Box>
                  <FormLabel htmlFor="crm">CRM</FormLabel>
                  <Input
                    id="crm"
                    borderColor={!errors.crm?.message ? "turquoise" : "red"}
                    focusBorderColor="teal.500"
                    {...register("crm")}
                    placeholder="Escreva o CRM do médico..."
                  />
                  <Text fontSize="sm" color="red" mt={2}>
                    {errors.crm?.message}
                  </Text>
                </Box>
                <Box></Box>
                <Box>
                  <FormLabel htmlFor="diagnostic">Diagnostico</FormLabel>
                  <Textarea
                    borderColor={
                      !errors.diagnostic?.message ? "turquoise" : "red"
                    }
                    focusBorderColor="teal.500"
                    id="diagnostic"
                    {...register("diagnostic")}
                  />
                  <Text fontSize="sm" color="red" mt={2}>
                    {errors.diagnostic?.message}
                  </Text>
                </Box>
                <Box>
                  <FormLabel htmlFor="prognostic">Prognostico</FormLabel>
                  <Textarea
                    borderColor={
                      !errors.prognostic?.message ? "turquoise" : "red"
                    }
                    focusBorderColor="teal.500"
                    id="prognostic"
                    {...register("prognostic")}
                  />
                  <Text fontSize="sm" color="red" mt={2}>
                    {errors.prognostic?.message}
                  </Text>
                </Box>
                <Box justifyContent="flex-start">
                  <FormLabel htmlFor="files">Arquivos</FormLabel>
                  <Input
                    id="files"
                    type="file"
                    size="md"
                    border="none"
                    {...register("files")}
                  />
                </Box>
              </Stack>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose} isLoading={loadingButton}>
                Cancelar
              </Button>
              <Button colorScheme="teal" type="submit" isLoading={loadingButton}>
                Salvar
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};
