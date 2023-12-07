import AddProduct from "@/Components/AddProduct";
import { product } from "@/Components/Common/types";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";

function EditProduct({ product, id }: product) {
  console.log(product,id)
  const router = useRouter();
  const { pathname } = router;
  return <AddProduct pathname={pathname} product={product} id={id} />;
}
export const getServerSideProps = async (context: any) => {
  const { params } = context;
  let data;
  if (params && params.productId) {
    //   const response = await fetch(`http://localhost:4000/products/${params.productId}`)
    //  data = await response.json()
    const docRef = doc(db, "products", params.productId);
    const response = await getDoc(docRef);
    data = {product : response.data(), id :response.id};
  } else {
    data = {};
  }

  return {
    props: {
      product: data?.product?.product,
      id : data?.id
    },
  };
};

export default EditProduct;
