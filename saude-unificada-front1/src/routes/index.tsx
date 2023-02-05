import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { MedicalRecords } from "../pages/MedicalRecords";
import { Patients } from "../pages/Patients";

export const AplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/records" element={<MedicalRecords />} />
      <Route path="/patients" element={<Patients />} />
    </Routes>
  );
};
