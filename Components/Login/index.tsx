import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import logo from '@/assets/images/thumbnails/Logo.svg'
import Image from "next/image";
import {useForm} from 'react-hook-form';
import { Login } from "../Common/types";
import { useDispatch } from "react-redux";
import { login } from "@/Redux/authSlice";
import Error from "../Common/error";


function Login() {
  const [authError, setAuthError] = useState("");
  const route = useRouter()
  const dispatch = useDispatch()

  const {register, handleSubmit, formState : {errors}, reset} = useForm<Login>()

  const submitHandler = (value : Login) =>{
        // const userData = JSON.parse(localStorage.getItem('next-user')!)
        // const validation = userData && userData.findIndex((item :login) =>{
        //   return item.email === value.email && item.password === value.password
        // })
        // if(validation !== null && validation > -1){
          
        // }
        dispatch(login(value)).then((res : any) =>{
         if(!res.error){
          route.push('/')
         }else{
          setAuthError(res.error.message)
              reset()
         }
        })
   
  }

  return (
    <div className="App">
      <div id="wrapper">
        <div className="page-wrapper auth_wrapper">
          <div className="content-area-wrapper">
            <div className="content-wrapper">
              <div className="container">
                <div className="card products_blc">
                  <div className="card-body">
                    <div className="card_content_wrap text-center">
                      <div className="card_content_wrap text-center">
                        <div className="logo_wrap">
                          <Image
                            src={logo}
                            alt="logo"
                          />
                          <h6>
                            Don’t have an account yet?
                            <Link className="signUpSpan" href="/signup">
                              {" "}
                              Sign Up
                            </Link>
                          </h6>
                        </div>
                        <form onSubmit={handleSubmit(submitHandler)}>
                          <div className="form_wrapper">
                            <div className="mb-4">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label label_modify"
                              >
                                <span className="mendatary">*</span> Email
                              </label>
                              <input
                                type="email"
                                className="form-control input_modify"
                                placeholder="email"
                                {...register("email", {required : "this field is required"})}
                              />
                             <Error errors={errors?.email} />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="exampleFormControlInput2"
                                className="form-label label_modify"
                              >
                                {" "}
                                <span className="mendatary">*</span> Password
                              </label>
                              <input
                                type="password"
                                className="form-control input_modify"
                                placeholder="password"
                                {...register("password", {required : "this field is required"})}
                                />
                                <Error errors={errors?.password} />
                            </div>
                            <p className="text-danger text-center">{authError}</p>
                            <div className="mb-0 auth_btn">
                              <button
                                type="submit"
                                className="theme-btn-primary theme-btn"
                              >
                                Sign In
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
