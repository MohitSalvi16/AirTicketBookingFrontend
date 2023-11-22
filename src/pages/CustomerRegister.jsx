import React, { useState } from 'react'
import axios from 'axios'
import '../components/3.css'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'

export default function CustomerRegister() {
  return (
    <div>
      <CustomerTable />
    </div>
  )
}

function CustomerTable() {
  const navigate = useNavigate()
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphones] = useState('')
  const [password, setpassword] = useState('')
  const [address, setAddress] = useState('')
  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  const [country, setcountry] = useState('')
  const [zipcode, setzipcode] = useState('')
  const [uname, setuname] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const handleForm = (e) => {
    e.preventDefault()
    if (uname == '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter valid details!',
      })
    } else if (uname.length < 2 || uname.length > 15) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Name should be min 2 and max length is 15 letters',
      })
    } else if (email === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter valid details!',
      })
    } else if (phone === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter Contact Number',
      })
    } else if (password === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter password',
      })
    } else if (password.length < 6 || password.length > 15) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password length is min 6 and max length is 15',
      })
    } else {
      submit()
    }
  }
  const submit = async () => {
    const url = `http://localhost:8080/api/users`
    await axios
      .post(url, {
        firstName: fname,
        lastName: lname,
        userName: uname,
        email: email,
        question: question,
        answer: answer,
        password: password,
        contact: {
          address: address,
          mobile: phone,
          city: city,
          state: state,
          country: country,
          zipcode: zipcode,
        },
      })
      .then((resp) => {
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registered Successfully',
          showConfirmButton: false,
          timer: 1500,
        })
        navigate('/login')
      })
      .catch((error) => {
        swal.fire({
          position: 'center',
          icon: 'error',
          title: error.response.data,
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }

  return (
    <div className='container mt-5'>
      <div className='title'>User Registration Form</div>
      <form>
        <div className='user-details'>
          <div className='input-box'>
            <span className='details'>First Name</span>
            <input
              type='text'
              placeholder='Enter first name'
              value={fname}
              onChange={(e) => setfname(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Last Name</span>
            <input
              type='text'
              placeholder='Enter last name'
              value={lname}
              onChange={(e) => setlname(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>User Name</span>
            <input
              type='text'
              placeholder='Enter user id'
              value={uname}
              onChange={(e) => setuname(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Address</span>
            <input
              type='text'
              placeholder='Enter your address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>City</span>
            <input
              type='text'
              placeholder='Enter your city'
              value={city}
              onChange={(e) => setcity(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>State</span>
            <input
              type='text'
              placeholder='Enter your state'
              value={state}
              onChange={(e) => setstate(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Country</span>
            <input
              type='text'
              placeholder='Enter your country'
              value={country}
              onChange={(e) => setcountry(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Zip Code</span>
            <input
              type='text'
              placeholder='Enter your zipcode'
              value={zipcode}
              onChange={(e) => setzipcode(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Mobile Number</span>
            <input
              type='text'
              maxLength={10}
              minLength={10}
              placeholder='Enter your number'
              id='mobileNo'
              value={phone}
              onChange={(e) => setphones(e.target.value)}
              required
            />
          </div>

          <div className='input-box'>
            <span className='details'>Email</span>
            <input
              type='email'
              placeholder='Enter your email'
              id='emailid'
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Password</span>
            <input
              type='password'
              placeholder='Enter your password'
              id='password'
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>
          <div className='input-box'>
            <span className='details'>Security Question</span>
            <select
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            >
              <option>Select Security Question</option>
              <option>What is your nick name ?</option>
              <option>Which is your favorite pet name ?</option>
            </select>
          </div>
          <div className='input-box'>
            <span className='details'>Answer</span>
            <input
              type='text'
              placeholder='Enter your Answer'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='button'>
          <input
            type='submit'
            className='bg-info bg-gradient'
            value='Submit'
            onClick={handleForm}
          />
        </div>
      </form>
    </div>
  )
}
