import { useState } from 'react'
import axios from 'axios'
import '../components/login.css'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'
import { useDispatch } from 'react-redux'

function Login() {
  const navigate = useNavigate()
  const [userid, setuserid] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleForm = (e) => {
    e.preventDefault()
    if (userid === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter valid details!',
      })
    } else if (password === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter password',
      })
    } else {
      checkUser()
    }
  }

  const checkUser = async () => {
    let user = { userName: userid, password: password }
    await axios
      .post('http://localhost:8080/api/users/validate', user)
      .then((resp) => {
        sessionStorage.setItem('uname', resp.data.firstName)
        sessionStorage.setItem('role', resp.data.admin ? 'Admin' : 'User')
        sessionStorage.setItem('userid', resp.data.userName)
        sessionStorage.setItem('id', resp.data.id)
        dispatch({ type: 'IsLoggedIn' })
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Welcome ' + resp.data.firstName,
          showConfirmButton: false,
          timer: 1500,
        })
        navigate('/')
      })
      .catch((error) => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data,
        })
      })
  }

  return (
    <div>
      <div className='center'>
        <h5 className='p-3 text-center bg-info rounded-top bg-gradient text-white'>
          Login
        </h5>
        <form>
          <div className='txt_field'>
            <input
              name='email'
              type='text'
              value={userid}
              onChange={(e) => setuserid(e.target.value)}
            />
            <span></span>
            <label>User Name</label>
          </div>
          <div className='txt_field'>
            <input
              name='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span></span>
            <label>Password</label>
          </div>
          <div className='mb-4'>
            <label style={{color:"#2691d9"}}>Role</label>
            <select name='role' className='form-control'>
              <option>Select Role</option>
              <option>Admin</option>
              <option>Customer</option>
            </select>
            <span></span>
          </div>
          <input type='submit' value='Login' onClick={handleForm} />
          <br />
          <br />
          <Link to='/forgotpwd' className='pass d-block'>
            Forgot Password?
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login
