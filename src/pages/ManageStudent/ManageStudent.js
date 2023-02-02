import React, {useState,useEffect} from 'react'
import fireDb from "../../firebase"
import {Link} from "react-router-dom";
import "./ManageStudent.css";
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ManageStudent() {
  const [data,setData] = useState({});

  useEffect(()=>{
    fireDb.child("Student Data").on("value",(snapshot)=>{
      if(snapshot.val() !== null){
        setData({...snapshot.val()})
      }
      else{
        setData({});
      }
    });
    return() =>{
      setData({})
    }
  },[]);

  const onDelete = (id) =>{
    if(window.confirm("Are you sure you wish to delete the data ?")){
      fireDb.child(`Student Data/${id}`).remove((err)=>{
        if(err){
          toast.error(err);
        }
        else{
          toast.success("Data deleted successfully");
        }
      })
    }
  }
  return (
    <>
    <div style={{marginTop: "100px"}}>
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{textAlign:"center"}}>Sr.No</th>
            <th style={{textAlign:"center"}}>Name</th>
            <th style={{textAlign:"center"}}>Class</th>
            <th style={{textAlign:"center"}}>Roll No</th>
            <th style={{textAlign:"center"}}>View / Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id,index) => {
            return(
              <tr key={id}>
                <th scope='row'>{index+1}</th>
                <td>{data[id].Fname + " " + data[id].Lname}</td>
                <td>{data[id].class + "-" + data[id].division}</td>
                <td>{data[id].rollNo}</td>
                <td>
                  <Link to={`/view/${id}`}>
                    <VisibilityIcon className='icon'/>
                  </Link>
                  <Link to={`/update/${id}`}>
                    <EditIcon className='icon'/>
                  </Link>
                    <DeleteIcon className='icon' onClick={()=>onDelete(id)}/>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default ManageStudent