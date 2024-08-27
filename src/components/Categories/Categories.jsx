import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios';

function Categories() {
  const [categories, setcategories] = useState([])
    const [Loading, setLoading] = useState(true)
    function getCategories() {
        setLoading(true)
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then((res) => {
                setcategories(res.data.data)

            })
    }
    useEffect(() => {
        getCategories()
    }, [])
  return (
    <>
    {categories.length > 0 ?
        <div className="row grid place-content-center gap-y-16 lg:gap-0 md:gap-0 relative mt-28">
            {categories.map((category) =>

                <div className="w-full md:w-1/3 lg:w-1/3  mt-[-100px] p-6  category" key={category.name}>
                    <img src={category.image} className='w-full rounded-t-lg hover:shadow-gray-700 shadow-lg duration-500 h-[70%] object-cover' alt="" />
                    <h2 className='text-center categoryName bg-green-500 p-3 rounded-b-md   hover:shadow-gray-700 shadow-lg duration-500 text-2xl text-white font-semibold font-sans'>{category.name}</h2>
                </div>


            )}
        </div>
        : <div className="spinner mx-auto mt-48"></div>
    }


</>
  );
}

export default Categories