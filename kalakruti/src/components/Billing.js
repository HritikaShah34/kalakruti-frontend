import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Structure from './Structure';

const Billing = () => {

  const [productData, setproductData] = useState([])

  const fetch_products = async() => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      setproductData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  useEffect(() => {
    fetch_products();
  }, [])
  
  // const productData = [
  //   { id: 1, name: 'Product 1', price: 20, image: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg' },
  //   { id: 2, name: 'Product 2', price: 30, image: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg' },
  //   // Add more product data as needed
  // ];

  const [userName, setUserName] = useState('')
  const [products, setProducts] = useState([
    // { id: 1, name: 'Product 1', price: 20, quantity: 2, image: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg' },
    // { id: 2, name: 'Product 2', price: 30, quantity: 1, image: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg' },
    // Add more product data as needed
  ]);

  const [quantity, setQuantity] = useState(1);
  const [productName, setProductName] = useState('');

  const totalAmount = products.reduce((total, product) => total + product.product_sp * product.product_quantity, 0);

  const handleCancel = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.product_code !== productId));
  };

  const handleAddProduct = () => {
    if (!productName || isNaN(quantity) || quantity < 1) {
      // Validation: Product name must be selected, and quantity must be a positive number.
      return;
    }

    const selectedProduct = productData.find((product) => product.product_name === productName);

    if (selectedProduct) {
      console.log("selectProduct",selectedProduct);
      
      const newProduct = {
        product_code: selectedProduct.product_code,
        product_name: selectedProduct.product_name,
        product_sp: selectedProduct.product_sp,
        product_quantity: quantity,
        product_img: selectedProduct.product_img,
      };
      console.log("newProduct",newProduct);

      setProducts((prevProducts) => [...prevProducts, newProduct]);
      // Reset input values after adding product
      setProductName('');
      setQuantity(1);
    }
  };

  const updateQuantity = (product_name, newQuantity) =>{
    //
    const updatedProducts = products.map(product =>
      product.product_name === product_name ? { ...product, quantity: newQuantity } : product
    );

    // Update the state with the new array
    setProducts(updatedProducts);
  }

  const pdfContainerRef = useRef(null);

  const downloadInvoice = async () => {
    const pdfContainer = pdfContainerRef.current;

    if (!pdfContainer) {
      console.error('PDF container not found.');
      return;
    }

    const canvas = await html2canvas(pdfContainer);
    const pdf = new jsPDF({ unit: 'mm', format: 'A4', precision: 10 });
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG',10, 10, 240, 190, undefined, 'FAST');
    pdf.save('invoice.pdf');
  };

  // const [product_code, setproduct_code] = useState();
  return (<div>
    <div className="p-8 bg-gray-100">
  {/* Product Entry */}
  <div className="mb-4">
    <h2 className="text-3xl font-bold mb-4 text-gray-800">Product Entry</h2>
    <div className="mb-4 flex items-center">
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="border border-gray-300 rounded-md p-1 mr-2"
      />
      <select
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="border border-gray-300 rounded-md p-1 mr-2"
      >
        <option value="" hidden>Select a product...</option>
        {productData.map((product) => (
          <option key={product.product_code} value={product.product_name}>
            {product.product_name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
          updateQuantity(productName, e.target.value);
        }}
        className="border border-gray-300 rounded-md p-1 mr-2"
      />
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
        onClick={handleAddProduct}
      >
        Add Product
      </button>
    </div>
  </div>
  {/* Rest of your component */}
</div>

      {
      console.log(products)
      }
      {/* Two Columns: Order Details and Order Summary */}
      <div className="flex">
        {/* Order Details */}
        <div className="w-1/2 mr-4">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Order Details</h2>
          {products.map((product) => (
            <div key={product.product_code} className="flex items-center mb-4 bg-white rounded p-2 shadow-md">
              <img src={`http://localhost:3000/${product.product_img}`} alt={product.product_name} className="w-12 h-12 rounded-full object-cover mr-2" />
              <div>
                <p className="text-lg font-bold text-gray-800">{product.product_name}</p>
                <p className="text-gray-600">{product.product_quantity} x Rs.{product.product_sp}</p>
              </div>
              <button
                className="ml-auto text-red-500"
                onClick={() => handleCancel(product.product_code)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-1/2 bg-white p-4 rounded shadow-md overflow-hidden h-58">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Subtotal:</p>
            <p className="text-gray-800">Rs. {totalAmount.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Shipping:</p>
            <p className="text-gray-800">Rs. 0.00</p>
          </div>
          <div className="border-t border-gray-400 my-2" />
          <div className="flex justify-between">
            <p className="font-bold text-gray-600">Total:</p>
            <p className="font-bold text-gray-800">Rs. {totalAmount.toFixed(2)}</p>
          </div>
          <div className='mt-4'>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={downloadInvoice}>
          Download Invoice PDF
        </button>
        </div>
        </div>
        
      </div>
      <div  ref={pdfContainerRef} className='mt-4'>
        <Structure name={userName} totalAmount={totalAmount.toFixed(2)} products={products}/>
      </div>
      
    </div>
  );
};

export default Billing;
