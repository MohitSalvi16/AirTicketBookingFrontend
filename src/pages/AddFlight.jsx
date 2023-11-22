import axios from 'axios'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'

export default function AddFlight() {
  const navigate = useNavigate()
  const [locations, setlocations] = useState([])
  const [fleets, setfleets] = useState([])
  const [flightid, setflightid] = useState()
  const [departureLocation, setdepartureLocation] = useState()
  const [arrivalLocation, setarrivalLocation] = useState()
  const [fleet, setfleet] = useState()
  const [departureTime, setdepartureTime] = useState()
  const [flightDate, setflightDate] = useState()
  const [arrivalTime, setarrivalTime] = useState()
  const [economyFare, seteconomyFare] = useState()
  const [premiumFare, setpremiumFare] = useState()
  const [businessFare, setbusinessFare] = useState()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      fleet == undefined ||
      flightDate == undefined ||
      departureLocation == undefined ||
      arrivalTime == undefined ||
      businessFare == undefined ||
      economyFare == undefined ||
      premiumFare == undefined ||
      arrivalLocation == undefined
    ) {
      swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Please fill all required details',
      })
      return
    }
    axios
      .post('http://localhost:8080/api/flights', {
        id: flightid,
        departureLocationId: parseInt(departureLocation),
        arrivalLocationId: parseInt(arrivalLocation),
        fleetId: fleet,
        flightDate: flightDate,
        departureTime: departureTime,
        arrivalTime: arrivalTime,
        fare: {
          businessFare: businessFare,
          economyFare: economyFare,
          premiumFare: premiumFare,
        },
      })
      .then((resp) => {
        console.log(resp)
        swal.fire({
          title: 'Success',
          text: resp.data,
        })
        navigate('/flights')
      })
      .catch((err) => {
        console.log('Error', err)
        swal.fire({
          title: 'Error',
          icon: 'error',
          text: err.response.data,
        })
      })
  }

  const loadData = () => {
    axios.get('http://localhost:8080/api/locations').then((resp) => {
      setlocations(resp.data)
    })
    axios.get('http://localhost:8080/api/fleets').then((resp) => {
      setfleets(resp.data)
    })
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <>
      <div className='container mt-5'>
        <h5>Add fleet</h5>
        <form>
          <div class='row'>
            <div className='col-sm-4 offset-1 p-3'>
              <div className='mb-2'>
                <label>Flight No</label>
                <input
                  type='number'
                  className='form-control form-control-sm'
                  value={flightid}
                  onChange={(e) => setflightid(e.target.value)}
                />
              </div>

              <div className='mb-2'>
                <label>Arrival Location</label>
                <select
                  type='text'
                  className='form-control form-control-sm'
                  value={arrivalLocation}
                  onChange={(e) => setarrivalLocation(e.target.value)}
                >
                  <option value=''>Select Location</option>
                  {locations.map((x) => (
                    <option value={x.id}>
                      {x.airport} {x.city} {x.state} {x.country}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-2'>
                <label>Departure Location</label>
                <select
                  type='text'
                  className='form-control form-control-sm'
                  value={departureLocation}
                  onChange={(e) => setdepartureLocation(e.target.value)}
                >
                  <option value=''>Select Location</option>
                  {locations.map((x) => (
                    <option value={x.id}>
                      {x.airport} {x.city} {x.state} {x.country}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-2'>
                <label>Flight Date</label>
                <input
                  type='date'
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className='form-control form-control-sm'
                  value={flightDate}
                  onChange={(e) => setflightDate(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>Arrival Time</label>
                <input
                  type='time'
                  className='form-control form-control-sm'
                  value={arrivalTime}
                  onChange={(e) => setarrivalTime(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>Departure Time</label>
                <input
                  type='time'
                  className='form-control form-control-sm'
                  value={departureTime}
                  onChange={(e) => setdepartureTime(e.target.value)}
                />
              </div>
            </div>
            <div className='col-sm-4 offset-1 p-3'>
              <div className='mb-2'>
                <label>Select Fleet</label>
                <select
                  type='text'
                  className='form-control form-control-sm'
                  value={fleet}
                  onChange={(e) => setfleet(e.target.value)}
                >
                  <option value=''>Select Fleet</option>
                  {fleets.map((x) => (
                    <option value={x.id}>
                      {x.code} {x.model}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mb-2'>
                <label>Business Fare</label>
                <input
                  type='number'
                  className='form-control form-control-sm'
                  value={businessFare}
                  onChange={(e) => setbusinessFare(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>Premium Fare</label>
                <input
                  type='number'
                  className='form-control form-control-sm'
                  value={premiumFare}
                  onChange={(e) => setpremiumFare(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>Economy Fare</label>
                <input
                  type='number'
                  className='form-control form-control-sm'
                  value={economyFare}
                  onChange={(e) => seteconomyFare(e.target.value)}
                />
              </div>

              <button
                onClick={handleSubmit}
                className='btn btn-primary btn-sm float-end'
              >
                Save Details
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
