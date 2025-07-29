import React, { use, useEffect, useState } from "react";
import { db } from "../../firebase";
import {  collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import loader from '../../assets/loader.gif'


const Invoives = () => {
  const[invoices,setInvoices]=useState([]);
  const[isLoading,setISLoading]= useState(false);
  const navigate = useNavigate();

    useEffect(()=>{
        getData();
    },[])

    const getData = async ()=>{
      setISLoading(true)
      const q = query(collection(db,"invoice"),where('uid', "==" ,localStorage.getItem('uid')))
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs);
      const data = querySnapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
      }))
      console.log(data)
      setInvoices(data);
      setISLoading(false);
    }

    const deleteInvoice = async(id)=>{
      // console.log(id)
      const isSure = window.confirm("Are you sure you want to delete the invoice ?")
      if(isSure){
        try{
            await deleteDoc(doc(db,'invoice',id))
            getData();
          }
        catch{
          window.alert("Something went Wrong");
        }
      }
    }
    
  return (
    <div>
      { isLoading?
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}><img src={loader} alt='loader'/></div>:
      <div>
        {
        invoices.map(data=>(
          <div className="box" key={data.id}>
            <p>{data.to}</p>
            <p>{new Date(data.time.seconds * 1000).toLocaleDateString()}</p>
            <p>Rs.{data.total}</p>
            <button onClick={()=>{deleteInvoice(data.id)}} className="deleteButton"><DeleteIcon/>Delete</button>
            <button onClick={()=>{navigate('/dashboard/invoice-detail',{state:data})}} className=" deleteButton viewButton"><RemoveRedEyeIcon/>View</button>
          </div>
        ))
      }
        {
          invoices.length<1 && <div className="no-invoice-wrapper">
            <p>You have no Invoice till now</p>
            <button onClick={()=>{navigate('/dashboard/new-invoice')}}>Create New Invoice</button>
            </div>
        }
        </div>
      }
    </div>
  
  );

}
export default Invoives;
