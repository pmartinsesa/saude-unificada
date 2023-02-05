import { Link } from "react-router-dom";

import {
  Box,
  Divider,
  Flex,
  Heading
} from "@chakra-ui/react";

export type Header = {
  title: string;
};

export const Header = ({ title }: Header) => {
  return (
    <>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        margin={2}
        height="3.5rem"
      >
        <Box p="2">
          <Link to="/">
            <Heading size="md">{title}</Heading>
          </Link>
        </Box>
      </Flex>
      <Divider orientation="horizontal" />
    </>
  );
};
