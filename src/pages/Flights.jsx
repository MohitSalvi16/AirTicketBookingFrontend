import axios from 'axios'
import { parse } from 'date-fns'
import { format } from 'date-fns/esm'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert2'

export default function Flights() {
  const [data, setData] = useState([])
  const loadData = () => {
    axios.get('http://localhost:8080/api/flights').then((resp) => {
      setData(resp.data)
    })
  }
  const handleDelete = (id) => {
    axios
      .delete('http://localhost:8080/api/flights/' + id)
      .then((resp) => {
        swal.fire({
          icon: 'error',
          title: 'Deleted',
          text: resp.data,
        })
        loadData()
      })
      .catch((err) => {
        swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Cannot delete flight',
        })
      })
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <>
      <div className='container mt-5'>
        <Link to='/addflight' className='btn btn-primary btn-sm float-end'>
          Add Flight
        </Link>
        <h5 className='p-2'>Flights List</h5>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th rowSpan={2}>Id</th>
              <th rowSpan={2}>Fleet</th>
              <th colSpan={2} className='text-center'>
                Location
              </th>
              <th className='text-center'>Flight Date</th>
              <th colSpan={2} className='text-center'>
                Flight Time
              </th>
              <th rowSpan={2}>Action</th>
            </tr>
            <tr>
              <th>Departure Location</th>
              <th>Arrival Location</th>
              <th>Flight Date</th>
              <th>Arrival</th>
              <th>Departure</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((x) => (
              <tr key={x?.id}>
                <td>{x?.id}</td>
                <td>{x?.fleet.code}</td>
                <td>
                  {x?.departureLocation.airport}
                  <br />
                  <small>
                    ({x?.departureLocation?.city},{x?.departureLocation?.state},
                    {x?.departureLocation?.country})
                  </small>
                </td>
                <td>
                  {x?.arrivalLocation.airport}
                  <br />({x?.arrivalLocation?.city},{x?.arrivalLocation?.state},
                  {x?.arrivalLocation?.country})
                </td>
                <td>
                  {format(
                    parse(x?.flightDate, 'yyyy-MM-dd', new Date()),
                    'dd-MMM-yyyy'
                  )}
                </td>
                <td>{x?.departureTime}</td>
                <td>{x?.arrivalTime}</td>
                <td>
                  <button
                    onClick={(e) => handleDelete(x.id)}
                    className='btn btn-danger btn-sm'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
