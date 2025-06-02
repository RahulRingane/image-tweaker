import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import auth from "./Auth";
import Dashboard from "../components/Dashboard";
import Upload from "../components/Upload";
import Navbar from "../components/Navbar";
import SpeedDial from "../components/SpeedDial";
import { Toaster } from "react-hot-toast";
import DeleteImage from "../components/DeleteImage";
import NotFound from "./NotFound";
import EditImage from "../components/EditImage";


export default function Pages() {
  return (
    <>
      <Navbar />
      <Upload />
      <DeleteImage />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={auth("login")} />
        <Route path="/register" element={auth("signup")} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/dashboard/edit/:imageId" element={<EditImage />} />
      </Routes>
      <SpeedDial />
      <Toaster />
    </>
  );
}