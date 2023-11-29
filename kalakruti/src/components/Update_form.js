import { PhotoIcon } from '@heroicons/react/24/solid';
import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Update_form() {
 
    const [formData, setFormData] = useState({
      product_name: '',
      product_description: '',
      product_code: '',
      product_img: null,
      product_sp: 0,
      product_cp: 0,
      product_quantity: 0
    });

    const {product_code} = useParams();

    
    const fetchDetail = async() =>{
      try {
        const response = await fetch(`http://127.0.0.1:3000/products/search/${product_code}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        //set form data to the returned data
        setFormData(prev=> ({...prev, ...data}));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    useEffect(() => {
      fetchDetail();
    }, [])
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("entered");
    
      try {
        const response = await fetch(`http://192.168.39.56:3000/updateProducts/${product_code}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers needed
          },
          body: JSON.stringify(formData),
        });
    
        if (!response.ok) {
          // Check if the response status is not OK (e.g., 404 Not Found)
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        // console.log(data);
        if(data.error){
          // Show error toast
          toast.error('Error submitting form. Please try again.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }else{
          // Show success toast
          toast.success('Form submitted successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      };
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    
    return (
      <Fragment>
      <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Update Product Details</h1>
      </div>
    </header>
    <div className='flex items-center justify-center h-screen mt-5'>
      <form className='w-full max-w-6xl'>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
  
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                    <input
                      type="text"
                      name="product_name"
                      id="product_name"
                      autoComplete="product_name"
                      value={formData.product_name}
                      onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
  
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Code
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                    <input
                      type="text"
                      name="product_code"
                      id="product_code"
                      autoComplete="product_code"
                      value={formData.product_code}
                      onChange={(e) => setFormData({ ...formData, product_code: e.target.value })}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
  
              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Description
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    name="product_description"
                    id="product_description"
                    autoComplete="product_description"
                    value={formData.product_description}
                    onChange={(e) => setFormData({ ...formData, product_description: e.target.value })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
  
              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Quantity
                </label>
                <div className="mt-2">
                  <input
                   type="text"
                   name="product_quantity"
                   id="product_quantity"
                   autoComplete="product_quantity"
                   value={formData.product_quantity}
                   onChange={(e) => setFormData({ ...formData, product_quantity: e.target.value })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                  Cost Price
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="product_cp"
                    id="product_cp"
                    autoComplete="product_cp"
                    value={formData.product_cp}
                    onChange={(e) => setFormData({ ...formData, product_cp: e.target.value })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                  Selling Price
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="product_sp"
                    id="product_sp"
                    autoComplete="product_sp"
                    value={formData.product_sp}
                    onChange={(e) => setFormData({ ...formData, product_sp: e.target.value })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
        
             
             
             <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Product photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => {setFormData({ ...formData, product_img: e.target.files[0]}); console.log(formData.product_img)}}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          </div>
  
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            onClick={e => handleSubmit(e)}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      </div>
      <ToastContainer />

      </Fragment>
    )
  }
  