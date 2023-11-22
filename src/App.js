import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Carouselslide from "./pages/Carousel";
import Aboutus from "./pages/Aboutus";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import CustomersList from "./pages/CustomerList";
import UserDetails from "./pages/UserDetails";
import MyBookings from "./pages/MyBookings";
import SearchResult from "./pages/SearchResult";
import UserProfile from "./pages/UserProfile";
import ForgotPassword from "./pages/ForgotPassword";
import MyPayments from "./pages/MyPayments";
import CustomerRegister from "./pages/CustomerRegister";
import Locations from "./pages/Locations";
import Fleets from "./pages/Fleets";
import Flights from "./pages/Flights";
import AddFlight from "./pages/AddFlight";
import AddPassenger from "./pages/AddPassenger";
import Passenger from "./pages/Passengers";
import Booknow from "./pages/Booknow";
import Bookings from "./pages/Bookings";

export default function App() {
  return (
   <div style={{width:"100vw"}}>
     <BrowserRouter>
     <Navbar/>     
        <Routes>
          <Route element={<><Carouselslide/><Aboutus /><Footer/></>} path="/" exact />
          <Route element={<><SearchResult /></>} path="/search" exact />
          <Route element={<Login/>} path="/login" />
          <Route element={<CustomerRegister/>} path="/cregister" />
          <Route element={<CustomersList/>} path="/users" />
          <Route element={<Locations/>} path="/locations" />
          <Route element={<Fleets/>} path="/fleets" />
          <Route element={<Flights/>} path="/flights" />
          <Route element={<Passenger/>} path="/passengers" />
          <Route element={<AddFlight/>} path="/addflight" />
          <Route element={<AddPassenger/>} path="/addpassenger" />
          <Route element={<UserDetails/>} path="/udetails/:id" />
          <Route element={<MyBookings/>} path="/mybookings" />
          <Route element={<Bookings/>} path="/bookings" />
          <Route element={<Booknow/>} path="/book/:id" />
          <Route element={<MyPayments/>} path="/mypayments" />
          <Route element={<UserProfile/>} path="/profile" />
          <Route element={<ForgotPassword/>} path="/forgotpwd" />
        </Routes>
     </BrowserRouter>     
   </div>
  );
}

