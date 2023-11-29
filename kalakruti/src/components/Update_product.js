import { useEffect, useState } from 'react';
import { BiEditAlt } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { Link ,useNavigate  } from 'react-router-dom';

// const products = [
//   {
//     id: 1,
//     name: 'Throwback Hip Bag',
//     href: '#',
//     color: 'Salmon',
//     price: '$90.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
//     imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
//   },
//   {
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
//   {
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },{
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },{
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },{
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },{
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
//   // More products...
// ]

export default function Update_product() {
  // const [open, setOpen] = useState(true)
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const handleEditClick = (product_code) => {
    // Navigate to the update product page and pass the product name as a parameter
    navigate(`/update/${product_code}`);
    console.log(product_code);
  };

  const handleDelete = async(product_code) => {
    console.log(typeof(product_code));
    
    try {
      await fetch(`http://127.0.0.1:3000/deleteProducts/${product_code}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
      });

      // After successful deletion, fetch updated data
      fetch_products();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
  const fetch_products = async() => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetch_products();
  }, [products])
  
  return (
    <div className="">
      <header className="bg-white shadow">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Product Details</h1>
    </div>
  </header>
    <div className="flow-root mt-5">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
        {products.map((product) => (
          
            <li key={product.product_code} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                src={`http://localhost:3000/${product.product_img}`}
                alt="No image"
                className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                    {/* <a href={product.href}>{product.name}</a> */}
                    {product.product_name}
                    </h3>
                    <p className="ml-4">{product.product_sp}</p>
                </div>
                {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">Qty {product.product_quantity}</p>
                <div className="flex">
                <div className="space-x-2">
                <button 
                    type="button"
                    onClick={()=> handleEditClick(product.product_code)}
                    className="font-medium text-indigo-600 hover:text-indigo-500 text-2xl"
                >
                    <BiEditAlt />
                </button>
             
                <button
                    type="button"
                    onClick={()=> handleDelete(product.product_code)}
                    className="font-medium text-red-500 hover:text-red-400 text-xl"
                >
                    <BsFillTrashFill />
                </button>
                </div>
                </div>
                </div>
            </div>
            </li>
        ))}
        </ul>
    </div>
    </div>
             
  )
}
