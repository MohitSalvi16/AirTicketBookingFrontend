import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function CustomersList() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8080/api/users').then((resp) => {
      setData(resp.data)
    })
  }, [])
  return (
    <>
      <div className='container mt-5'>
        <h5 className='p-2'>Users List</h5>
        <table className='table table-bordered'>
          <thead>
            <th>Id</th>
            <th>Name</th>
            <th>User Id</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email Id</th>
            <th>Status</th>
          </thead>
          <tbody>
            {data
              .filter((x) => !x.admin)
              .map((x) => (
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>
                    {x.firstName} {x.lastName}
                  </td>
                  <td>{x.userName}</td>
                  <td>
                    {x?.contact?.city} {x?.contact?.state}
                  </td>
                  <td>{x?.contact?.mobile}</td>
                  <td>{x.email}</td>
                  <td>{x.active ? 'Active' : 'Inactive'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
