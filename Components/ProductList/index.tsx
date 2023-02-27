import { actionActive, deleteProduct, editClicked, getAllProducts } from "@/Redux/productSlice"
import { RootState } from "@/Redux/store"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { debounce } from "../Common/utils";


function ProductList() {
    const dispatch = useDispatch()
    const router = useRouter()
    const action = useSelector((state : RootState) => state.product.action)
    const productId = useSelector((state : RootState) => state.product.productId)
    const product = useSelector((state: RootState) => state.product.productList);
    //const [search,setSearch] = useState('')

    const deleteHandler = async (id) => {
      const response = await fetch(`http://localhost:4000/products/${id}`, {
    method : 'DELETE'
  })
  const data = await response.json()
  dispatch(deleteProduct(id))
  console.log(response);
    }

    const editHandler = (id) =>{
        dispatch(editClicked())
        router.push(`/edit-product/${id}`)
    }

    const searchHandler =  async (e) => {
      const {value} = e.target
         const response = await fetch(`http://localhost:4000/products?q=${value}`)
         const data = await response.json()
         dispatch(getAllProducts(data))   
    }

    const optimzedVersion = debounce(searchHandler)
    
    //${value ? `category=${value}` : ''}
    
  return (
    <div className="content-area-wrapper">
    <div className="content-wrapper">
       <div className="filter_wrapper  d-block d-sm-none">
          <div className="filet_left_content">
             <div className="input-group">
                <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1"><img src="images/icons/magnifying-glass.png" alt="search" /></span></div>
                <input type="text" className="form-control input_modify" placeholder="Search" />
             </div>
          </div>
       </div>
       <div className="heading_wrapper d-flex flex-wrap">
          <h1 className="head_title">Product List</h1>
          <nav aria-label="breadcrumb" className="breadcrumb_wrapper">
             <ul className="breadcrumb">
                <li className="breadcrumb-item">E-Commerce</li>
                <li className="breadcrumb-item active" aria-current="page">Product List</li>
             </ul>
          </nav>
       </div>
       <div className="card products_blc">
          <div className="card-body">
             <div className="filter_wrapper">
                <div className="filet_left_content">
                   <div className="input-group">
                      <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABHNCSVQICAgIfAhkiAAAAXtJREFUOE+tVEFOwkAU7e8Q1yyNmFhv0Ih7yg1acW89AXADj1BOYN2D9gaUPZjeABZiXLI2DOObZmiGwSKGTjJpZ/6819f/3x+yjHHu+g6r1bpCCA8hV4UzIkr5ej34ypKFidmuSQ80mp1IWFYXey+YiU20kvGNEHU8fMwHkEbL6bD/G2FBdtHsZDmQc7/s61K1zViCY/PP2SgwCXMypcg749xbZEmupmw4rl//ZiwFMF3ORj39HKmvzaHo+lA+dFAZhpSqOmSHhxSZMaQlhrqVro5Urp5AJnNx9ADOJyF6y/dXr6gmNgWq1v6YDtOjmXDw8vbeQ5XHEFEUUSqrlExaoprfrLQAlVpDM20Lpm0fadoxsj7ZM+22giiEtMYVzBv80U5vOOfCFo+wRbzTAfpCa/TYIko2qtFt2ehCyEYPoWiA90wQPZuEO7eGJM6vIMZ6ALgAtOQeQBOQZ5zzaKu6cXMXmoR7ZP8xrkl4EllePKUQr8HJZAWhbTs/jATsJjmQpCoAAAAASUVORK5CYII=" alt="search" /></span></div>
                      <input type="text" className="form-control input_modify"  placeholder="Search" onChange={optimzedVersion} />
                   </div>
                </div>
                <div className="filter_btn_wrapper">
                   <Link className="btn theme-btn-primary theme-btn" href="/add-product">Add Product</Link>
               </div>
             </div>
             <div className="app_table table-responsive">
                <table className="table">
                   <thead>
                      <tr>
                         <th scope="col"><label className="checkbox_container text-uppercase"> Product Id</label></th>
                         <th scope="col" className="th_didivder">
                            Products 
                            <span className="filter-order-link">
                               <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                  <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                     <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                     <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                  </g>
                               </svg>
                            </span>
                         </th>
                         <th scope="col" className="th_didivder">
                            Category 
                            <span className="filter-order-link">
                               <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                  <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                     <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                     <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                  </g>
                               </svg>
                            </span>
                         </th>
                         <th scope="col" className="th_didivder">
                            Price 
                            <span className="filter-order-link">
                               <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                  <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                     <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                     <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                  </g>
                               </svg>
                            </span>
                         </th>
                         <th scope="col" className="th_didivder">
                            Stock 
                            <span className="filter-order-link">
                               <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                  <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                     <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                     <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                  </g>
                               </svg>
                            </span>
                         </th>
                         <th scope="col" className="th_didivder">
                            Status 
                            <span className="filter-order-link">
                               <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                  <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                     <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                     <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                  </g>
                               </svg>
                            </span>
                         </th>
                         <th scope="col" className="th_didivder">
                            Action 
                            <span className="filter-order-link">
                               <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13">
                                  <g id="Group_22146" data-name="Group 22146" transform="translate(-501 -126.5)">
                                     <path id="Icon_ionic-md-arrow-dropdown" data-name="Icon ionic-md-arrow-dropdown" d="M9,13.5,14.5,19,20,13.5Z" transform="translate(492 120.5)" fill="rgba(69,85,96,0.2)"></path>
                                     <path id="Icon_ionic-md-arrow-dropdown-2" data-name="Icon ionic-md-arrow-dropdown" d="M9,19l5.5-5.5L20,19Z" transform="translate(492 113)" fill="rgba(69,85,96,0.2)"></path>
                                  </g>
                               </svg>
                            </span>
                         </th>
                      </tr>
                   </thead>
                   <tbody>
                      {product && product.map((item) =>(
                        <tr key={item.id}>
                        <td><label className="checkbox_container text-uppercase">{item.id}</label></td>
                        <td>
                           <div className="media align-items-center">
                              <div className="product_thumb"><img src={item.variation[0].productImage} alt="Images" width={50} height={50}  /></div>
                              <div className="media-body product_des">
                                 <h6 className="product_name">{item.productName}</h6>
                              </div>
                           </div>
                        </td>
                        <td className="text_primary">{item.category}</td>
                        <td>${item.variation[0].price}</td>
                        <td>{item.variation[0].stock}</td>
                        <td>{item.status}</td>
                        <td className="actions">
                           <div className={`dropdown dropdown_wrapper ${action && productId === item.id ? 'show' : ''}`}>
                              <button className="dropdown-toggle" onClick={() => dispatch(actionActive(item.id))} data-toggle="dropdown" aria-expanded={action && productId === item.id ? 'true' : 'false'}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVEiJ7ZSxCYAwEEUfWmrhEilTuZMTGTdwB+dwB0FXsNHCiAFBIl4KSR78JnD//nHhICY00FtpafMSWIDNarZvYtSO+alaskHJkdqdoPApzD0brMAAVMAINMD0OmYUKKsgdFxLNtLmivs39Zokk07yBcOVvg3VJOiS/08614+kcx2OHQgqLpVdcUDeAAAAAElFTkSuQmCC" alt="Donts" /></button>
                              <div className={`dropdown-menu dropdown-menu-right ${action && productId === item.id ? 'show' : ''}`} style={action && productId === item.id ? {position: "absolute", transform: "translate3d(-124px, 26px, 0px)", top: "0px", left: "0px", willChange: "transform"} : {}}  ><button className="dropdown-item" onClick={() => editHandler(item.id)}>Edit</button><button className="dropdown-item" onClick={() => deleteHandler(item.id)}>Delete</button></div>
                           </div>
                        </td>
                     </tr>
                      ))}
                   </tbody> 
                </table>
             </div>
          </div>
       </div>
    </div>
 </div>
  )
}

export default ProductList