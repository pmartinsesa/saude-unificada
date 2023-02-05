import { Flex, Heading, Select, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type LoginForms = {
  type: string;
  redirectLink: string;
  options: any[]; // wallet, name
};

export const LoginForms = ({ type, redirectLink, options } : LoginForms) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const onRedirect = () => {
    if (value) {
      navigate(redirectLink, { state: value });
    }
  };

  const createSelectOptions = () => {
    return options.map((op) => {
      return <option key={op.wallet} value={op.wallet}>{op.name}</option>;
    });
  };

  return (
    <Flex align="center" justify="center" direction="column">
      <Heading size="md" marginBottom="2.5rem">
        {`Login ${type}`}
      </Heading>
      <Select
        variant="outline"
        placeholder={`Selecione o ${type}`}
        borderColor="turquoise"
        focusBorderColor="teal.500"
        width="40rem"
        marginBottom="3.5rem"
        value={value}
        onChange={(v) => setValue(v.target.value)}
      >
        {createSelectOptions()}
      </Select>
      <Button size="lg" colorScheme="teal" variant="ghost" onClick={onRedirect}>
        Login
      </Button>
    </Flex>
  );
};
