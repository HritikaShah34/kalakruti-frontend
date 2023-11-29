import React from 'react';
import image from '../resources/white.jpg';

export default function Structure(props) {
  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md border border-gray-300">
      <div className="mb-6 text-center">
        <img src={image} alt="Business Logo" className="h-16 mx-auto" />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Buyer Information</h2>
        <p>Name of Buyer: {props.name}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Item List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Item</th>
              <th className="border p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {props.products.map((product) => (
              <tr key={product.product_code}>
                <td className="border p-2">{product.product_name}</td>
                <td className="border p-2">Rs. {product.product_sp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <p className="text-right">Product Amount: RS. {props.totalAmount}</p>
        <p className="text-right">Total Amount: Rs. {props.totalAmount}</p>
      </div>

      <div>
        <p className="text-sm font-bold">Business Address:</p>
        <address className="text-sm">
          Kalakruti- The Art Gallery <br />
          Shop No. 06, Ground Floor, Earth Aaron,<br />
          Besides Bachubhai Crave Eatable, Ghogha Circle to Rupani Road, Bhavnagar- 364001, Gujarat<br />
        </address>
      </div>
    </div>
  );
}
