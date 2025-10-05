import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import Map from "./pages/Map";
import SecondPage from "./pages/SecondPage";
const App = () => {
  
  return (
    <div className=" bg-gray-200 h-screen ">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/map" element={<Map />}></Route>
      </Routes>
      <SecondPage />
    </div>
  );
};

export default App;
