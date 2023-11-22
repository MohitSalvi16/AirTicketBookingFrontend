import { ButtonGroup, Button } from 'react-bootstrap';
import { Modal, Form } from 'react-bootstrap';
import { useState } from 'react';

export default function Aboutus() {

  {/* This is for feedback button*/}
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 {/* This is for Help Center button*/}
  const [view, setView] = useState(false);

  const handleClosed = () => setView(false);
  const handleView = () => setView(true);

   {/* This is for T&C Apply button*/}
   const [showtc, setShowtc] = useState(false);

   const handleClosetc = () => setShowtc(false);
   const handleShowtc = () => setShowtc(true);


  return (
    <div className="mt-3 mx-auto p-4 text-center" style={{width:"96%",background:"white"}}>
      <div className="fw-bold fs-2" id="aboutus">About Flight Booking</div>
      <p className='mx-auto' style={{width:"70%"}}> Launched in 2022, Flight Booking is India’s No.1 online flight booking website book and search flights. Adjudged as the most preferred flight booking portal in India by various independent surveys.
      </p>

    </div>
  );
}
