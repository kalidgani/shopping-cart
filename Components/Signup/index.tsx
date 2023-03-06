import logo from "@/assets/images/thumbnails/Logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {useForm} from 'react-hook-form'
import Error from "../Common/error";

function Signup() {
   const route = useRouter()

  const {register, watch, handleSubmit, formState : {errors}, reset} = useForm()

  const onsubmit = (value : any) => {
   const userData = JSON.parse(localStorage.getItem('next-user')!)
   const sortedData = {
     email : value.email,
     password :  value.password
   }
   if(userData === null){
      localStorage.setItem('next-user', JSON.stringify([sortedData]))
   }else{
      const data = [...userData, sortedData]
   localStorage.setItem('next-user', JSON.stringify(data))
   }
   route.push('/login')
   reset();
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
                    <div className="card_content_wrap text-center"></div>
                    <div className="card_content_wrap text-center">
                      <div className="logo_wrap">
                        <Image src={logo} alt="logo" />
                        <h6>Create an account</h6>
                      </div>
                      <form onSubmit={handleSubmit(onsubmit)}> 
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
                              placeholder="email"
                              className="form-control input_modify"
                              id="exampleFormControlInput1"
                              {...register("email", {required : "this field is required", pattern : {value: /\S+@\S+\.\S+/,
                              message: "please enter valid email"}})}
                            />
                           <Error errors={errors?.email} />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label label_modify"
                            >
                              {" "}
                              <span className="mendatary">*</span> Password
                            </label>
                            <input
                              type="password"
                              placeholder="password"
                              className="form-control input_modify"
                              id="exampleFormControlInput2"
                              {...register('password', {required : 'this field is required', validate : (val : string) =>{
                                 if(!val.match(/.{8,}/g)){
                                    return 'password must be atleast 8 characters'
                                 }
                                 if(!val.match(/[A-Z]/g)){
                                    return 'password must contain one cap'
                                 }
                                 if(!val.match(/[#?!@$%^&*-]/g)){
                                    return 'password must contain one special character'
                                 }
                              }})}
                            />
                           <Error errors={errors?.password} />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label label_modify"
                            >
                              {" "}
                              <span className="mendatary">*</span>Confirm
                              Password
                            </label>
                            <input
                              type="password"
                              className="form-control input_modify"
                              id="exampleFormControlInput3"
                              placeholder="confirm password"
                              {...register('confirmPassword', {required : 'this field is required', validate : (val :string) =>{
                                 if(val !== watch('password')){
                                    return 'password do not match'
                                 }
                              }})}
                            />
                           <Error errors={errors?.confirmPassword} />
                          </div>
                          <div className="mb-0 auth_btn">
                            <button
                              type="submit"
                              className="theme-btn-primary theme-btn"
                            >
                              Sign Up
                            </button>
                          </div>
                          <div className="already">
                            {" "}
                            <Link href="/login">Already have Account</Link>
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
  );
}

export default Signup;
