// eslint-disable-next-line react-hooks/exhaustive-deps
import { product } from '@/Components/Common/types'
import ProductList from '@/Components/ProductList'
import { getAllProducts, productCollectionsRef } from '@/Redux/productSlice'
import { getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function Home({product} : product) {
  console.log(product)
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
 const response = await getDocs(productCollectionsRef)
 const data = response.docs.map((doc) => ({...doc.data(),id:doc.id}))

   return{
    props : {
      product : data
    }
   }
}