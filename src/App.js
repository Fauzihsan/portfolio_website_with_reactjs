import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import JourneyPage from "./pages/JourneyPage";
import PortfolioPage from "./pages/PortfolioPage";
import PortfolioDetailPage from "./pages/PortfolioDetailPage";
import DiaryPage from "./pages/DiaryPage";
import LoginPage from "./pages/LoginPage";
import DiaryAdminPage from "./pages/admin/DiaryAdminPage";
import PortfolioAdminPage from "./pages/admin/PortfolioAdminPage";
import HomePage from "./pages/admin/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />
      <Route path="/journey" element={<JourneyPage />} />
      <Route path="/diary" element={<DiaryPage />} />

      {/* admin page */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<HomePage />} />
      <Route path="/admin/diary" element={<DiaryAdminPage />} />
      <Route path="/admin/portfolio" element={<PortfolioAdminPage />} />
    </Routes>
  );
}

export default App;
