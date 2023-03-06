import AddProduct from '@/Components/AddProduct'
import { product } from '@/Components/Common/types';
import { useRouter } from 'next/router'
import React from 'react'

function EditProduct({product} : product) {
  console.log(product);
  
    const router = useRouter()
    const {pathname} = router
  return (
    <AddProduct pathname={pathname} product={product}/>
  )
}
export const getServerSideProps = async (context : any) =>{
  const {params} = context
  let data = {}
  if(params && params.productId){
    const response = await fetch(`http://localhost:4000/products/${params.productId}`)
   data = await response.json()
  }else{
data={}
  }
 
    return{
     props : {
       product : data
     }
    }
 }


export default EditProduct