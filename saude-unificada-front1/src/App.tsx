import { BrowserRouter as Router } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

import { AplicationRoutes } from "./routes";
import { Footer } from "./components/Footer";

import "./index.css";

function App() {
  return (
    <Router>
      <ChakraProvider>
        <>
          <AplicationRoutes />
          <Footer />
        </>
      </ChakraProvider>
    </Router>
  );
}

export default App;
