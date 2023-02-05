import { Select } from "@chakra-ui/react";

export type PacientSelectProps = {
  margin?: number
  options: any[];
  id?: string;
  value?: string;
  onChange?: (value: any) => unknown;
};

export const PacientSelect = ({
  margin = 0,
  value = '',
  id = '',
  options,
  onChange = () => {},
}: PacientSelectProps) => {
  const createSelectOptions = () => {
    return options.map((op) => {
      return <option key={op.Carteira} value={op.Carteira}>{op.Nome}</option>;
    });
  };

  return (
    <>
      <Select
        id={id}
        variant="outline"
        placeholder="Selecione o paciente"
        borderColor="turquoise"
        focusBorderColor="teal.500"
        margin={margin}
        value={value}
        onChange={onChange}
      >
        {createSelectOptions()}
      </Select>
    </>
  );
};
