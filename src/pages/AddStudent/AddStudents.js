import React, {useState,useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import "./AddStudents.css";
import fireDb from "../../firebase";
import {toast} from "react-toastify";

// declaring the initial state for the user input variables
const initialState ={
  Fname: "",Mname:"",Lname:"",rollNo:"",
  addressOne:"",addressTwo:"",
  landmark:"",city:"",pincode:"",
}
// option array for class
const classOptions = [
  {label: "I",value: "I",},{label: "II",value: "II",},{label: "III",value:"III",},
  {label: "IV",value: "IV",},{label: "V",value: "V",},{label: "VI",value: "VI",},
  {label: "VII",value:"VII",},{label: "VIII",value: "VIII",},{label: "IX",value:"IX",},
  {label: "X",value:"X",},{label: "XI",value: "XI",},{label: "XII",value: "XII",},
];
// option array for division
const divisionOptions =[
  {label:"A",value:"A"},{label:"B",value:"B"},{label:"C",value:"C"},{label:"D",value:"D"},{label:"E",value:"E"},
];

function AddStudents() {
  const [state,setState] = useState(initialState);
  const [data,setData] = useState({});

  const handleInputChange =(e)=>{
    const {name,value} = e.target;
    setState({...state,[name]:value})
  };
  
  const {Fname,Mname,Lname,rollNo,addressOne,addressTwo,landmark,city,pincode} = state;
  const history = useNavigate();

  const {id} = useParams(); 
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
  },[id]);
  useEffect(()=>{
    if(id){
      setState({...data[id]})
    }
    else{
      setState({...initialState})
    }
    return()=>{
      setState({...initialState})
    }
  },[id,data])

  const handleSubmit =(e)=>{
    e.preventDefault();
    if(!Fname || !Mname || !Lname || !addressOne ){
      toast.error("Please provide the values for every input");
    }
    else{
      if(!id){
        fireDb.child("Student Data").push(state,(err)=>{
          if(err){
            toast.error(err);
          }
          else{
            toast.success("Student data Added successfully");
          }
        });
      }
      else{
        fireDb.child(`Student Data/${id}`).set(state,(err)=>{
          if(err){
            toast.error(err);
          }
          else{
            toast.success("Student data updated successfully");
          }
        });
      }
      setTimeout(()=> history.push("/"),200);
    }
  };

  return (
    <>
    <div style={{marginTop: "100px"}}>
      <h3>Add Student Data</h3>
      <form >

          <div className="nameInput">
            <input type="text" name="Fname" id="Fname" placeholder='First Name' value={Fname || ""} onChange={handleInputChange}/>
            <input type="text" name="Mname" id="Mname" placeholder='Middle Name' value={Mname || ""} onChange={handleInputChange}/>
            <input type="text" name="Lname" id="Lname" placeholder='Last Name' value={Lname || ""} onChange={handleInputChange}/>
          </div>
          
          <div className="detailsInput">
            <select name="class" id="class" onChange={handleInputChange} className="select">
                <option  value=""><p>Select Your Class</p></option>
                {classOptions.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
            </select>
            <select name="division" id="division" onChange={handleInputChange} className="select">
                <option  value=""><p>Select Your Division</p></option>
                {divisionOptions.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
            </select>
            <input type="number" name="rollNo" id="rollNo" placeholder='Enter Roll Number:' maxLength={2} value={rollNo || ""} onChange={handleInputChange}/>
          </div>

          <div className="addressInput">
            <input type="text" name="addressOne" id="addressOne" placeholder='Address Line 1:' value={addressOne || ""} onChange={handleInputChange}/>
            <input type="text" name="addressTwo" id="addressTwo" placeholder='Address Line 2:' value={addressTwo || ""} onChange={handleInputChange}/>
          </div>
          
          <div className="secondaryAddress">
            <input type="text" name="landmark" id="landmark" placeholder='Landmark: ' value={landmark || ""} onChange={handleInputChange}/>
            <input type="text" name="city" id="city" placeholder='City: ' value={city || ""} onChange={handleInputChange}/>
            <input type="number" name="pincode" id="pincode" placeholder='Pincode: ' value={pincode || ""} onChange={handleInputChange}/>
          </div>

          <div className="submit">
            <input type="submit" value={id?"Update Student Data" :"Add Student"} onClick={handleSubmit}/>
          </div>          
      </form>
    </div>
    </>
  )
}

export default AddStudents