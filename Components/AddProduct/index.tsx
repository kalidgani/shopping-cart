import { generalActive, addProducts, variationActive, updateProducts } from "@/Redux/productSlice";
import { RootState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { formValue } from "../Common/types";
import Error from "../Common/error";
import { PriceError, StockError, VariantError } from "../Common/VariationError";

function AddProduct(props: any) {
  const dispatch = useDispatch();
  const [thumbnail, setThumbnail] = useState([]);
  const router = useRouter()
  const {product, pathname, id} = props

  const isGeneral = useSelector((state: RootState) => state.product.isGeneral);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      id : product?.id,
      productName : product?.productName,
      description : product?.description,
      category : product?.category,
      status : product?.status,
      price : product?.price,
      comparePrice : product?.comparePrice,
      costPerItem : product?.costPerItem,
      taxRate : product?.taxRate,
      variation: product && product.variation ? product.variation :  [{ variant: "", price: "", stock: "", productImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpOE8CF8ZK0rN-yAfBtwjBKrpYsQcHVtpO_g&usqp=CAU" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "variation",
    control,
  });

  const onSubmit =  async (value : formValue ) => {
    if(pathname === '/edit-product/[productId]'){
  //     const response = await fetch(`http://localhost:4000/products/${id}`, {
  //   method : 'PUT',
  //   body : JSON.stringify(value),
  //   headers : {
  //     'Content-Type': 'application/json'
  //   }
  // })
  dispatch(updateProducts({value,id}))
    }else{
      value.id = new Date().getTime().toString()
    //   const response = await fetch('http://localhost:4000/products', {
    //   method : 'POST',
    //   body : JSON.stringify(value),
    //   headers : {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // const data = await response.json()
    dispatch(addProducts(value))
    }
    reset()
    router.push('/')
  };
  
  const  discardHandler = () =>{
    reset()
    router.push('/')
  }



  return (
    <>
      <div className="content-area-wrapper">
        <div className="content-wrapper">
          <div className="filter_wrapper  d-block d-sm-none">
            <div className="filet_left_content">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABHNCSVQICAgIfAhkiAAAAXtJREFUOE+tVEFOwkAU7e8Q1yyNmFhv0Ih7yg1acW89AXADj1BOYN2D9gaUPZjeABZiXLI2DOObZmiGwSKGTjJpZ/6819f/3x+yjHHu+g6r1bpCCA8hV4UzIkr5ej34ypKFidmuSQ80mp1IWFYXey+YiU20kvGNEHU8fMwHkEbL6bD/G2FBdtHsZDmQc7/s61K1zViCY/PP2SgwCXMypcg749xbZEmupmw4rl//ZiwFMF3ORj39HKmvzaHo+lA+dFAZhpSqOmSHhxSZMaQlhrqVro5Urp5AJnNx9ADOJyF6y/dXr6gmNgWq1v6YDtOjmXDw8vbeQ5XHEFEUUSqrlExaoprfrLQAlVpDM20Lpm0fadoxsj7ZM+22giiEtMYVzBv80U5vOOfCFo+wRbzTAfpCa/TYIko2qtFt2ehCyEYPoWiA90wQPZuEO7eGJM6vIMZ6ALgAtOQeQBOQZ5zzaKu6cXMXmoR7ZP8xrkl4EllePKUQr8HJZAWhbTs/jATsJjmQpCoAAAAASUVORK5CYII="
                      alt="search"
                    />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control input_modify"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div className="card nav_pills_card nav_pills_card_new">
            <div className="card-body">
              <div className="heading_wrapper heading_right_content">
                <h1 className="head_title">
                  {pathname === "/edit-product/[productId]"
                    ? "Edit Product"
                    : "Add Product"}
                </h1>
                <div className="btn_wrapper">
                  <button
                    type="button"
                    className="theme-btn btn-outline-secondary"
                    onClick={discardHandler}
                  >
                    Discard
                  </button>
                  <button
                    type="button"
                    className="theme-btn theme-btn-primary"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Save
                  </button>
                </div>
              </div>
              <ul
                className="nav nav-pills mb-0 nav_pills_wrapper"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${isGeneral ? "active" : ""}`}
                    onClick={() => dispatch(generalActive())}
                    id="pills-general-tab"
                    data-toggle="pill"
                    data-target="#pills-general"
                    type="button"
                    role="tab"
                    aria-controls="pills-general"
                    aria-selected={isGeneral ? "true" : "false"}
                  >
                    General
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${!isGeneral ? "active" : ""}`}
                    onClick={() => dispatch(variationActive())}
                    id="pills-variation-tab"
                    data-toggle="pill"
                    data-target="#pills-variation"
                    type="button"
                    role="tab"
                    aria-controls="pills-variation"
                    aria-selected={!isGeneral ? "true" : "false"}
                  >
                    Variant
                  </button>
                </li>
                {
                  <p className="text-danger">
                    {errors.variation ? "please select variant" : ""}
                  </p>
                }
              </ul>
            </div>
          </div>
          <div className="tab-content" id="pills-tabContent">
            <div
              className={`tab-pane fade ${isGeneral ? "show active" : ""}`}
              id="pills-general"
              role="tabpanel"
              aria-labelledby="pills-general-tab"
            >
              <div className="card nav_pills_card">
                <div className="card-body">
                  <div>
                    <div className="form-title">Basic Info</div>
                    <div className="form-group">
                      <label htmlFor="productName">
                        <span className="text-danger">*</span> Product Name
                      </label>
                      <input
                        type="name"
                        className="form-control"
                        id="productName"
                        {...register("productName", {
                          required: "this field is required",
                        })}
                      />
                     <Error errors={errors?.productName} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Description">
                        <span className="text-danger">*</span> Description
                      </label>
                      <textarea
                        id="Description"
                        className="form-control"
                        rows={3}
                        {...register("description", {
                          required: "this field is required",
                        })}
                      ></textarea>
                      <Error errors={errors?.description} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card nav_pills_card">
                <div className="card-body">
                  <div>
                    <div className="form-title">Pricing</div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="price">
                            <span className="text-danger">*</span> Price
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="price"
                            {...register("price", {
                              min: 0,
                            })}
                          />
                          <Error errors={errors?.price} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="comparePrice">
                            <span className="text-danger">*</span> Compare price
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="comparePrice"
                            {...register("comparePrice", {
                              min: 0,
                            })}
                          />
                          <Error errors={errors?.comparePrice} />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor=" costPerItem">
                            <span className="text-danger">*</span> Cost per item
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="costPerItem"
                            {...register("costPerItem", {
                              min: 0,
                            })}
                          />
                          <Error errors={errors?.costPerItem} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="taxRate">
                            <span className="text-danger">*</span> Tax rate
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="taxRate"
                            {...register("taxRate", {
                              min: 0,
                            })}
                          />
                          <Error errors={errors?.taxRate} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card nav_pills_card">
                <div className="card-body">
                  <div>
                    <div className="form-title">Organization</div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="category">Category</label>
                          <select
                            className="form-control"
                            id="category"
                            {...register("category", {
                              required: "this field is required",
                            })}
                          >
                            <option value="">Select</option>
                            <option value="cloths">Cloths</option>
                            <option value="bags">Bags</option>
                            <option value="shoes">Shoes</option>
                            <option value="watches">Watches</option>
                            <option value="laptops">Laptops</option>
                            <option value="home appliances">
                              Home Appliances
                            </option>
                            <option value="mobiles">Mobiles</option>
                          </select>
                          <Error errors={errors?.category} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="tags">Status</label>
                          <select
                            className="form-control"
                            id="tags"
                            {...register("status", {
                              required: "this field is required",
                            })}
                          >
                            <option value="">Select</option>
                            <option value="In stock">In stock</option>
                            <option value="Limited stock">Limited stock</option>
                            <option value="out of stock">out of stock</option>
                          </select>
                          <Error errors={errors?.status} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`tab-pane fade ${!isGeneral ? "show active" : ""}`}
              id="pills-variation"
              role="tabpanel"
              aria-labelledby="pills-variation-tab"
            >
              <div className="card nav_pills_card">
                <div className="card-body">
                  <div>
                    <div className="form-title">Variants</div>
                    <p>
                      Add A Custome Variat Options For Your Product, Like
                      Different Sizes Or Colors.
                    </p>
                    <div className="">
                      {fields.map((item, i) => (
                        <div key={item.id}>
                          <div className={i > 0 ? "isMinus" : ""}>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor=" variantName">
                                    <span className="text-danger">*</span>{" "}
                                    variation
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="variantName"
                                    {...register(`variation.${i}.variant`, {
                                      required: "this field is required",
                                    })}
                                  />
                                  <VariantError errors={errors?.variation} i={i}/>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor=" variantPrice">
                                    <span className="text-danger">*</span> Price
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="variantPrice"
                                    {...register(`variation.${i}.price`, {
                                      required: "this field is required",
                                      min: 0,
                                    })}
                                  />
                                 <PriceError errors={errors?.variation} i={i}/>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor=" variantStock">
                                    <span className="text-danger">*</span> Stock
                                    keeping unit
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="variantStock"
                                    {...register(`variation.${i}.stock`, {
                                      required: "this field is required",
                                      min: 0,
                                    })}
                                  />
                                  <StockError errors={errors?.variation} i={i}/>
                                </div>
                              </div>
                            </div>
                            {i > 0 ? (
                              <span
                                className="removeSpan"
                                onClick={() =>{
                                let data =  thumbnail.filter((item : any) => item.index !== i)
                                setThumbnail(data)
                                 remove(i)
                                } }
                              >
                                -
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="form-group uploader-wrapper">
                            <label htmlFor="variantImage">
                              <span className="text-danger">*</span> Upload
                              Image
                            </label>
                            <div className="uploader-wrapper-inner">
                              <img alt='variant-image' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpOE8CF8ZK0rN-yAfBtwjBKrpYsQcHVtpO_g&usqp=CAU'} width='150px' height='100px'/>
                              {/* {thumbnail.length ?
                                thumbnail.map((item) => {
                                  if (item.index === i) {
                                    return (
                                     <PreviewImage file={item.base64} />
                                    );
                                  } 
                                }) : (
                                  <>
                                  <Image src={picture} alt="pictures" />
                                  Click or drag file to upload
                                </>
                               )} */}
                              {/* <input
                                type="file"
                                id="variantImage"
                                {...register(`variation.${i}.productImage`, {
                                  onChange(e) {
                                    const file = e.target.files[0];
                                    if (
                                      !file?.name.match(/\.(jpg|jpeg|png)$/)
                                    ) {
                                      e.target.value = null;
                                      let data =  thumbnail.filter((item) => item.index !== i)
                                setThumbnail(data)
                                      return false;
                                    }
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.onloadend = (evt) => {
                                      if (
                                        evt.target.readyState ===
                                        FileReader.DONE
                                      ) {
                                        const base64 = evt.target.result.split(",")[1];
                                          
                                        const imageData = {
                                          base64: base64,
                                          index: i,
                                        };
                                        setThumbnail((pre) => {
                                          let duplicate = pre.filter((item) => item.index !== i)
                                          return [...duplicate, imageData];
                                        });
                                      }
                                    };
                                  },
                                })}
                              />
                            
                            <p className="text-danger">
                              {errors.variation?.[i]?.productImage?.message}
                            </p> */}
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        className="uploader-add-btne"
                        type="button"
                        onClick={() => {
                          append({
                            variant: "",
                            price: "",
                            stock: "",
                            image: "",
                          });
                        }}
                      >
                        Add field
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
