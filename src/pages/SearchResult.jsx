import axios from 'axios'
import { format, parse } from 'date-fns'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

export default function SearchResult(props) {
  const dispatch = useDispatch()
  const data = props.data
  const state = useSelector((state) => state)
  console.log('LoggedIn ', state.loggedin.IsLoggedIn)
  const isuser =
    state.loggedin.IsLoggedIn && sessionStorage.getItem('role') === 'User'
      ? true
      : false
  return (
    <div className='mx-auto my-2 bg-white' style={{ width: '95%' }}>
      <h5 className='p-2 text-center'>Todays Flight List</h5>
      {data.length > 0 ? (
        <table className='table table-bordered table-responsive'>
          <thead>
            <tr>
              <th rowSpan={2}>Flight No</th>
              <th rowSpan={2}>Fleet</th>
              <th colSpan={2} className='text-center'>
                Location
              </th>
              <th className='text-center'>Flight Date</th>
              <th colSpan={2} className='text-center'>
                Flight Time
              </th>
              <th colspan={3} className='text-center'>
                Seats Available
              </th>
              <th rowSpan={2}>Action</th>
            </tr>
            <tr>
              <th>Departure Location</th>
              <th>Arrival Location</th>
              <th>Flight Date</th>
              <th>Arrival</th>
              <th>Departure</th>
              <th>Business</th>
              <th>Premium</th>
              <th>Economy</th>
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
                <td>{x?.flightStatus.remainingBuinessSeats}</td>
                <td>{x?.flightStatus.remainingPremiumSeats}</td>
                <td>{x?.flightStatus.remainingEconomySeats}</td>
                <td>
                  {isuser && (
                    <Link
                      to={'book/' + x?.id}
                      className='btn btn-danger btn-sm'
                    >
                      Book Now
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className='text-center p-2'>No flights found</h5>
      )}
    </div>
  )
}
