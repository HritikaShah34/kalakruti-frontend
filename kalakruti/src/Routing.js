import React from 'react'
import Add_Product from './components/Add_Product'
import Billing from './components/Billing'
import Dashboard from './components/Dashboard'
import Update_form from './components/Update_form'
import Update_product from './components/Update_product'
import { Route, BrowserRouter , Routes } from 'react-router-dom'
import App from './App'
import Signin from './components/Signin'
import Signup from './components/Signup'

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/Signin" element={<Signin/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addProduct" element={<Add_Product/>} />
        <Route path="/update/:product_code" element={<Update_form />} />
        <Route path="/getProducts" element={<Update_product />} />
        {/* <Route path="/update-product" element={<Update_form/>} /> */}
        <Route path="/billing" element={<Billing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing