
import './App.css';
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import Login from './component/login/Login';
import Dashboard from './component/dashboard/Dashboard';
import Register from './component/register/Register';
import Invoives from './component/dashboard/Invoives';
import NewInvoice from './component/dashboard/NewInvoice';
import Home from './component/dashboard/Home';
import Setting from './component/dashboard/Setting';
import InvoiceDetail from './component/dashboard/InvoiceDetail';
function App() {
  const myRouter = createBrowserRouter([
    {path:'',Component:Login},
    {path:'/register',Component:Register},
    {path:'/login',Component:Login},
    {path:'/dashboard',Component:Dashboard,children:([
      {path:'',Component:Home},
      {path:'home',Component:Home},
      {path:'invoices',Component:Invoives},
      {path:'new-invoice',Component:NewInvoice },
      {path:'settings',Component:Setting},
      {path:'invoice-detail',Component:InvoiceDetail}
    ])},
    
  ])
return (
  <div>
   <RouterProvider router = {myRouter}/>
   </div>
  );
}

export default App;
