import axios from 'axios'
import { useEffect, useState } from 'react'
import swal from 'sweetalert2'

export default function Locations() {
  const [data, setData] = useState([])
  const [airport, setairport] = useState()
  const [city, setcity] = useState()
  const [state, setstate] = useState()
  const [country, setcountry] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(airport, city, state)
    if (airport === undefined || city === undefined || state === undefined) {
      swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Please fill all details',
      })
      return
    }
    axios
      .post('http://localhost:8080/api/locations', {
        airport: airport,
        city: city,
        state: state,
        country: country,
      })
      .then((resp) => {
        swal.fire({
          title: 'Success',
          text: resp.data,
        })
        setairport('')
        setstate('')
        setcity('')
        setcountry('')
        loadData()
      })
      .catch((err) => {
        console.log('Error', err)
      })
  }
  const handleDelete = (id) => {
    axios.delete('http://localhost:8080/api/locations/' + id).then((resp) => {
      swal.fire({
        icon: 'error',
        title: 'Deleted',
        text: resp.data,
      })
      loadData()
    })
  }
  const loadData = () => {
    axios.get('http://localhost:8080/api/locations').then((resp) => {
      setData(resp.data)
    })
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-sm-8'>
            <h5 className='p-2'>Locations List</h5>
            <table className='table table-bordered'>
              <thead>
                <th>Id</th>
                <th>Airport</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Action</th>
              </thead>
              <tbody>
                {data?.map((x) => (
                  <tr key={x?.id}>
                    <td>{x?.id}</td>
                    <td>{x?.airport}</td>
                    <td>{x?.city}</td>
                    <td>{x?.state}</td>
                    <td>{x?.country}</td>
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
          <div className='col-sm-4'>
            <h5>Add Location</h5>
            <form>
              <div className='mb-2'>
                <label>Airport</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={airport}
                  onChange={(e) => setairport(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>City</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>State</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={state}
                  onChange={(e) => setstate(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>Country</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={country}
                  onChange={(e) => setcountry(e.target.value)}
                />
              </div>
              <button
                onClick={handleSubmit}
                className='btn btn-primary btn-sm float-end'
              >
                Save Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
