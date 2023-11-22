import axios from 'axios'
import { useEffect, useState } from 'react'
import swal from 'sweetalert2'

export default function Fleets() {
  const [data, setData] = useState([])
  const [code, setcode] = useState()
  const [model, setmodel] = useState()
  const [totalBuinessSeats, settotalBuinessSeats] = useState()
  const [totalEconomySeats, settotalEconomySeats] = useState()
  const [totalPremiumSeats, settotalPremiumSeats] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      model == undefined ||
      code == undefined ||
      totalBuinessSeats == undefined ||
      totalEconomySeats == undefined ||
      totalPremiumSeats == undefined
    ) {
      swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Please fill all details',
      })
      return
    }
    axios
      .post('http://localhost:8080/api/fleets', {
        code: code,
        model: model,
        totalBuinessSeats: totalBuinessSeats,
        totalEconomySeats: totalEconomySeats,
        totalPremiumSeats: totalPremiumSeats,
      })
      .then((resp) => {
        console.log(resp)
        swal.fire({
          title: 'Success',
          text: resp.data,
        })
        setcode('')
        setmodel('')
        settotalBuinessSeats('')
        settotalEconomySeats('')
        settotalPremiumSeats('')
        loadData()
      })
      .catch((err) => {
        swal.fire({
          title: 'error',
          icon: 'error',
          text: 'Cannot save flight',
        })
      })
  }
  const handleDelete = (id) => {
    axios
      .delete('http://localhost:8080/api/fleets/' + id)
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
  const loadData = () => {
    axios.get('http://localhost:8080/api/fleets').then((resp) => {
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
            <h5 className='p-2'>Planes List</h5>
            <table className='table table-bordered'>
              <thead>
                <th>Id</th>
                <th>Code</th>
                <th>Model</th>
                <th>Economy Seats</th>
                <th>Business Seats</th>
                <th>Premium Seats</th>
                <th>Action</th>
              </thead>
              <tbody>
                {data?.map((x) => (
                  <tr key={x?.id}>
                    <td>{x?.id}</td>
                    <td>{x?.code}</td>
                    <td>{x?.model}</td>
                    <td>{x?.totalEconomySeats}</td>
                    <td>{x?.totalBuinessSeats}</td>
                    <td>{x?.totalPremiumSeats}</td>
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
            <h5>Add New Plane</h5>
            <form>
              <div className='mb-2'>
                <label>Code</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={code}
                  onChange={(e) => setcode(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>model</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={model}
                  onChange={(e) => setmodel(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>Business Seats</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={totalBuinessSeats}
                  onChange={(e) => settotalBuinessSeats(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>Economy Seats</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={totalEconomySeats}
                  onChange={(e) => settotalEconomySeats(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>Premium Seats</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={totalPremiumSeats}
                  onChange={(e) => settotalPremiumSeats(e.target.value)}
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
