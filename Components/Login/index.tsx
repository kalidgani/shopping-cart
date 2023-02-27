import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import logo from '@/assets/images/thumbnails/Logo.svg'
import Image from "next/image";
import {useForm} from 'react-hook-form';

function Login() {
  const [authError, setAuthError] = useState("");
  const route = useRouter()

  const {register, handleSubmit, formState : {errors}, reset} = useForm()

  const submitHandler = (value) =>{
        const userData = JSON.parse(localStorage.getItem('next-user'))
        const validation = userData && userData.findIndex((item) =>{
          return item.email === value.email && item.password === value.password
        })
        if(validation !== null && validation > -1){
          Cookies.set('token', "true")
          route.push('/')
        }
        setAuthError(validation === -1 || validation === null ? 'email or password incorrect' : '')
         reset()
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
                              <p className="text-danger">{errors.email?.message}</p>
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
                                <p className="text-danger">{errors.password?.message}</p>
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
