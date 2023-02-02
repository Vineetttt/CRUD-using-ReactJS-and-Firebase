import React, {useState,useEffect} from 'react'
import fireDb from "../../firebase"
import {useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./View.css";

function View() {
  const [user,setUser] = useState({});

  const {id} = useParams();
  useEffect(()=>{
    fireDb.child(`Student Data/${id}`)
    .get()
    .then((snapshot)=>{
      if(snapshot.exists()){
        setUser({...snapshot.val()})
      }
      else{
        setUser({})
      }
    });
  },[id])
  console.log(user);
  return (
    <>
    <div style={{marginTop:"100px"}}>
      <div className="card">
        <div className="card-header">
          <p>Student Detail</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{id}</span>
          <br/><br/>

          <strong>Name:</strong>
          <span>{" "+user.Fname + " " + user.Lname}</span>
          <br/><br/>

          <div className='classDiv'>
            <strong>Class:</strong>
            <span>{" "+user.class + "-" + user.division}</span>
            <br/><br/>

            <strong className='roll'>Roll No:</strong>
            <span>{" "+user.rollNo}</span>
            <br/><br/>
          </div>

          <strong>Address:</strong>
          <span>{" "+user.addressOne}</span>
          <br/><br/>

          <strong>Landmark:</strong>
          <span>{" "+user.landmark}</span>
          <br/><br/>

          <strong>City:</strong>
          <span>{" "+user.city}</span>
          <br/><br/>

          <strong>Pincode:</strong>
          <span>{" "+user.pincode}</span>
          <br/><br/>
          
          <Link to="/"> 
            <button className='goBack'>Go Back</button>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default View