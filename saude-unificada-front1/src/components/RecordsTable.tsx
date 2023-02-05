import { v4 as uuid } from "uuid";

import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { BsCloudUpload } from "react-icons/bs";

export type RecordsTableProps = {
  records: any[];
};

const TABLE_PROPERTIES = [
  "hospital",
  "doctor-name",
  "doctor-register",
  "analysis-diagnostic",
  "analysis-prognostic",
  "analysis-files",
];

export const RecordsTable = ({ records }: RecordsTableProps) => {
  const openPdf = (pdfBase64: string) => {
    const win = window.open("") as Window;
    win.document.write(
      '<iframe src="' +
        pdfBase64 +
        '" frameborder="0" style="border:0; margin:0px; padding:0px; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;"></iframe>'
    );
  };

  const createTable = (records: any) => {
    return records.map((record: any) => {
      return (
        <Tr key={uuid()}>
          {TABLE_PROPERTIES.map((tp, i) => {
            if (tp.includes("-")) {
              const aux = tp.split("-");
              if (aux[1] === "files") {
                if (record[aux[0]][aux[1]][0] === "") return;
                return (
                  <Td>
                    <BsCloudUpload
                      onClick={() => openPdf(record[aux[0]][aux[1]][0])}
                    />
                  </Td>
                  // <Td key={uuid()}>
                  //   <a download='prontuario' href={record[aux[0]][aux[1]][0]} title='Protuário em anexo'>
                  //     <BsCloudUpload/>
                  //   </a>
                  // </Td>
                );
              }
              return <Td key={uuid()}>{record[aux[0]][aux[1]]}</Td>;
            }
            return <Td key={uuid()}>{record[tp]}</Td>;
          })}
        </Tr>
      );
    });
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple" size="lg">
          <TableCaption>registros médicos do paciente</TableCaption>
          <Thead>
            <Tr>
              <Th>Hospital</Th>
              <Th>Medico</Th>
              <Th>CRM</Th>
              <Th>Diagnostico</Th>
              <Th>Prognostico</Th>
              <Th>Anexos</Th>
            </Tr>
          </Thead>
          <Tbody>{createTable(records)}</Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};
