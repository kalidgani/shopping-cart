// eslint-disable-next-line react-hooks/exhaustive-deps
import { product } from '@/Components/Common/types'
import ProductList from '@/Components/ProductList'
import { getAllProducts } from '@/Redux/productSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function Home({product} : product) {
  const dispatch = useDispatch()
  useEffect(() =>{
  dispatch(getAllProducts(product))
  // eslint-disable-next-line react-hooks/exhaustive-deps
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