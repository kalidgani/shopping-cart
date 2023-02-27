import ProductList from '@/Components/ProductList'
import { getAllProducts } from '@/Redux/productSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function Home({product}) {
  const dispatch = useDispatch()

  useEffect(() =>{
  dispatch(getAllProducts(product))
  },[])

  return (
    <>
      <ProductList />
    </>
  )
}

export const getServerSideProps = async () =>{
 const response = await fetch('http://localhost:4000/products?_page=1&_limit=5')
 const data = await response.json()

   return{
    props : {
      product : data
    }
   }
}