import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Sell from "./pages/Sell";
import NotFound from "./pages/NotFound";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ConfirmEmail from "./pages/auth/ConfirmEmail";

import Messages from "./pages/account/Messages";
import Notifications from "./pages/account/Notifications";

import Vehicles from "./pages/account/vehicles/Vehicles";
import AddVehicle from "./pages/account/vehicles/AddVehicle";

import Profile from "./pages/account/profile/Profile";
import ChangeUsername from "./pages/account/profile/ChangeUsername";

import Listing from "./pages/Listing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirm_email" element={<ConfirmEmail />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />

        <Route path="/sell" element={<Sell />} />

        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route path="/account/my_vehicles" element={<Vehicles />} />
        <Route path="/account/add_vehicle" element={<AddVehicle />} />

        <Route path="/account/my_profile" element={<Profile />} />
        <Route path="/account/change_username" element={<ChangeUsername />} />

        <Route path="/listing/:listingId" element={<Listing />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
