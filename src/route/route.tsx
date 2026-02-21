import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/home-page";
import ScreenTestPage from "../pages/screen-test-page";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/screen-test" element={<ScreenTestPage />} />
      </Routes>
    </BrowserRouter>
  );
};
