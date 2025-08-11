import { useState } from 'react';
import '../dashboard/Dashboard.css';
import {db} from '../../firebase';
import { collection, addDoc ,Timestamp} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import loader from '../../assets/loader.gif'
const NewInvoice = () => {
const[to,setTo] = useState('');
const[phone,setPhone]=useState('');
const[address,setAddress]=useState('');
const[productName,setProductName]=useState('');
const[price,setPrice]=useState('');
const[quantity,setQuantity]=useState(1);
const[total,setTotal]=useState(0);
const[isLoading,SetIsLoading]=useState(false)
// const [product,setProduct] = useState([
//   {id:0,name:'Laptop',price:89000,qty:2},
//   {id:1,name:'Mobile',price:76000,qty:9},
//   {id:2,name:'Fridge',price:8000,qty:1}
// ])

const [product,setProduct] = useState([])

const navigate = useNavigate();


const addProduct = ()=>{
  setProduct([...product,{'id':product.length,'name':productName,'price':price,'qty':quantity}])
  const t = quantity*price
  setTotal(total+t)
  setProductName('')
  setPrice('')
  setQuantity(1)
  
}

const saveProduct = async ()=>{
  SetIsLoading(true)
  console.log(to,phone,address)
  console.log(product,total)
  const data = await addDoc(collection(db,'invoice'),{
    to:to,
    phone:phone,
    address:address,
    product:product,
    total:total,
    uid:localStorage.getItem('uid'),
    time:Timestamp.fromDate(new Date())
  })
  console.log(data)
  navigate('/dashboard/invoices')
  SetIsLoading(false)
}
  return (
    <div>
      <div className='header-row'>
        <p className="new-invoice-heading">New Invoice</p>
      <button onClick={saveProduct} className="add-button" type="button">{isLoading && <img src={loader} alt='loader' style={{height:'20px',width:'20px'}}/>}Save Invoice</button>
      </div> 

      <form className="new-invoice-form">
        <div className="first-row">
          <input onChange={(e) => {setTo(e.target.value);}} placeholder="To" value={to}/>
          <input onChange={(e) => {setPhone(e.target.value);}} placeholder="phone" value={phone}/>
          <input onChange={(e) => {setAddress(e.target.value);}} placeholder="Address"value={address}/>
        </div>
        <p>Add Product</p>
        <div className="first-row">
          <input onChange={(e) => {
              setProductName(e.target.value);
            }}
            placeholder="Product Name"
            value={productName}
          />
          <input
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            placeholder="Price"
            value={price}
          />
          <input
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            type="number"
            placeholder="Quantity"
            value={quantity}
          />
        </div>
        <button onClick={addProduct} className="add-button" type="button">Add Product</button>
      </form>
      {product.length>0 && <div className="product-wrapper">
        <div className="product-list">
          <p>S.No</p>
          <p>Product Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total Price</p>
        </div>
        {product.map((data, index) => (
          <div className="product-list" key={index}>
            <p>{index + 1}</p>
            <p>{data.name}</p>
            <p>{data.price}</p>
            <p>{data.qty}</p>
            <p>{data.qty * data.price}</p>
          </div>
        ))}

        <div className='total-wrapper'>
          <p>Total:= {total}</p>
          </div>
      </div>}
    </div>
  );
}

export default NewInvoice