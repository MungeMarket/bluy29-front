import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screen/Home";
import About from "./Screen/About";
import ErrorPage from "./Screen/ErrorPage";
import LandMap from "./Screen/LandMap";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Screen/Login";
import AddProduct from "./Screen/AddProduct";
import SignUp from "./Screen/SignUp";
import Market from "./Screen/Market";

function router() {
  return (
    <>
      <Header />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/landmap" element={<LandMap />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/market" element={<Market />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default router;
