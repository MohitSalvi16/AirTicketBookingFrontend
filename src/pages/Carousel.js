import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult';
export default function Carouselslide() {
  const navigate=useNavigate()
  const [locations,setlocations]=useState([])
  const [fromlocation,setfromlocation]=useState('')
  const [tolocation,settolocation]=useState('')
  const [fromdate,setfromdate]=useState('')
  const [data,setData]=useState([])
  const handleSearch=e=>{
      e.preventDefault()
      axios.get('http://localhost:8080/api/flights/search?flightDate='+fromdate+"&fromlocation="+fromlocation+"&tolocation="+tolocation).then((resp) => {
      setData(resp.data)
    })
  }
  const state=useSelector((state)=>state);
  useEffect(()=>{
    axios.get('http://localhost:8080/api/locations')
    .then(resp=>{
      setlocations(resp.data)
    }).catch(err=>{
      console.log(err)
    })
    axios.get('http://localhost:8080/api/flights/todays').then((resp) => {
      setData(resp.data)
    })
  },[])
  return (
    <>
    <div className='mt-5'>
      <div className="d-block w-100"
         style={{height:"500px",backgroundImage:"url('header4.jpg')",backgroundSize:"100% 100%"}}>
           <form className="d-block mx-auto" style={{width:"80%",position:"absolute",top:"44%",left:"50%",transform:"translate(-50%,-50%)"}}>
             <div className='row'>
             <div className='col-sm-3 offset-1'>
                <select className="form-control me-2" value={tolocation} onChange={e=>settolocation(e.target.value)}>
                    <option value="">Source</option>
                    {locations.map(x=>(
                    <option value={x.id}>{x.airport} - {x.city} - {x.country}</option>
                    ))}
                </select>
                </div>
                <div className='col-sm-3'>
                <select className="form-control me-2" value={fromlocation} onChange={e=>setfromlocation(e.target.value)}>
                    <option value="">Destination</option>
                    {locations.map(x=>(
                    <option value={x.id}>{x.airport} - {x.city} - {x.country}</option>
                    ))}
                </select>
                </div>
               
                <div className='col-sm-3'>
                <input type="date" className='form-control me-2' value={fromdate} onChange={e=>setfromdate(e.target.value)} />
                </div>                
                <div className='col-sm-1'>
                <button onClick={handleSearch} className="btn btn-warning bg-gradient text-white" type="submit"><i className="fa fa-search"></i></button>
                </div>
                </div>
            </form>
         </div>
    </div>
    <SearchResult data={data} />
    </>
  );
}
