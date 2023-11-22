import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="Footer stick-bottom  text-center text-white mx-auto" style={{ background: "#5595f4",width:"96%" }}>

      <div className="container-fluid p-1"  >

        <a className="btn btn-outline-light btn-floating m-2" href="#" type="button"
        ><i className="fa fa-facebook-f"></i
        ></a>

        <a className="btn btn-outline-light btn-floating m-2" href="#" type="button"
        ><i className="fa fa-twitter"></i
        ></a>

        <a className="btn btn-outline-light btn-floating m-2" href="#" Type="button"
        ><i className="fa fa-google"></i
        ></a>

        <a className="btn btn-outline-light btn-floating m-2" href="#" type="button"
        ><i className="fa fa-instagram"></i
        ></a>

        <a className="btn btn-outline-light btn-floating m-2" href="#" type="button"
        ><i className="fa fa-linkedin"></i
        ></a>


        <a className="btn btn-outline-light btn-floating m-2" href="#" type="button"
        ><i className="fa fa-github"></i
        ></a>


      </div>
      <div>
        <h2>Air Ticket Booking System</h2>
        <p>Contact Me : 9823675437   &ensp; &ensp; &ensp;    Gmail: flightbooking@gmail.com</p>

      </div>


      <div className="text-center p-1" >
        © 2022 Copyright by Flight Booking Website
        
      </div>
<br />
    </footer>
  );
}
