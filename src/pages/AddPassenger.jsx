import axios from 'axios'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'

export default function AddPassenger() {
  const navigate = useNavigate()
  const [fname, setfname] = useState([])
  const [lname, setlname] = useState([])
  const [age, setage] = useState()
  const [gender, setgender] = useState()
  const [passportno, setpassportno] = useState()
  const [mealPref, setmealPref] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8080/api/passengers', {
        firstName: fname,
        lastName: lname,
        age: age,
        gender: gender,
        passportNo: passportno,
        mealPref: mealPref,
        userid: sessionStorage.getItem('id'),
      })
      .then((resp) => {
        console.log(resp)
        swal.fire({
          title: 'Success',
          text: resp.data,
        })
        navigate('/passengers')
      })
      .catch((err) => {
        console.log('Error', err)
      })
  }
  return (
    <>
      <div className='container mt-5'>
        <form>
          <div class='row'>
            <div className='col-sm-4 mx-auto p-3'>
              <h5 className='text-center'>Add Passenger</h5>
              <div className='mb-2'>
                <label>First Name</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={fname}
                  onChange={(e) => setfname(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>Last Name</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={lname}
                  onChange={(e) => setlname(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>Gender</label>
                <select
                  type='text'
                  className='form-control form-control-sm'
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                >
                  <option value=''>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className='mb-2'>
                <label>Age</label>
                <input
                  type='number'
                  className='form-control form-control-sm'
                  value={age}
                  onChange={(e) => setage(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>Passport</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={passportno}
                  onChange={(e) => setpassportno(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>Meal Preferences</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={mealPref}
                  onChange={(e) => setmealPref(e.target.value)}
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
