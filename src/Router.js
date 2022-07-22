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
import MyInfo from "./Screen/MyInfo";
import FileUpload from "./Components/FileUpload";

function router() {
  return (
    <>
      <Header />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<ErrorPage />} />
          <Route path="/landmap" element={<LandMap />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/market" element={<ErrorPage />} />
          <Route path="/myInfo" element={<ErrorPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<ErrorPage />} />
          <Route path="/landmap" element={<ErrorPage />} />
          <Route path="/login" element={<ErrorPage />} />
          <Route path="/signup" element={<ErrorPage />} />
          <Route path="/addProduct" element={<ErrorPage />} />
          <Route path="/market" element={<ErrorPage />} />
          <Route path="/myInfo" element={<ErrorPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes> */}
      </Router>
      <Footer />
    </>
  );
}

export default router;
