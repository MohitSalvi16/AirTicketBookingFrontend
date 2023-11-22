import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function MyBookings() {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const handleCancel = (id) => {
    axios
      .get('http://localhost:8080/api/bookings/cancel/' + id)
      .then((resp) => {
        Swal.fire({ title: resp.data })
        loadData()
      })
  }
  const loadData = () => {
    axios
      .get(
        'http://localhost:8080/api/bookings?userid=' +
          sessionStorage.getItem('id')
      )
      .then((resp) => {
        setData(resp.data)
      })
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <>
      <div className='container mt-5'>
        <h5 className='p-2'>My Booking History</h5>
        <table className='table table-bordered'>
          <thead>
            <th>Id</th>
            <th>Booking Date</th>
            <th>Flight No</th>
            <th>Passenger</th>
            <th>Seat Type</th>
            <th>No of Seats</th>
            <th>From</th>
            <th>To</th>
            <th>Cost</th>
            <th>Travel Date</th>
            <th>Status</th>
            <th>Action</th>
          </thead>
          <tbody>
            {data.map((x) => (
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.bookingDate}</td>
                <td>{x.flight.id}</td>
                <td>
                  {x.passenger.firstName} {x.passenger.lastName}
                </td>
                <td>{x.seatType}</td>
                <td>{x.noOfSeats}</td>
                <td>
                  {x.flight.arrivalLocation.city}{' '}
                  {x.flight.arrivalLocation.country}{' '}
                </td>
                <td>
                  {x.flight.departureLocation.city}{' '}
                  {x.flight.departureLocation.country}{' '}
                </td>
                <td>{x.totalCost}</td>
                <td>{x.travelDate}</td>
                <td>{x.status}</td>
                <td>
                  {x.status === 'Booked' ? (
                    <button
                      onClick={(e) => handleCancel(x.id)}
                      className='btn btn-danger btn-sm'
                    >
                      Cancel Booking
                    </button>
                  ) : (
                    ''
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
