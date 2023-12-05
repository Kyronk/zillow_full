import React, { useEffect, useState } from 'react'

import clsx from 'clsx';
import { toast } from 'react-toastify';

import { InputForm, Button, InputRadio } from "../index";
import { useForm } from 'react-hook-form';
import { apiRegister, apiSignIn } from '../../apis/auth';

import Swal from "sweetalert2";
import { useAppStore } from '../../store/useAppStore';
import { useUserStore } from '../../store/useUserStore';

const Login = () => {

    const { setModal } = useAppStore();

    const [isLoading, setIsLoading] = useState(false);

    const [variant, setVariant] = useState("LOGIN");
    const { 
        register, 
        formState: { errors }, 
        handleSubmit,
        reset,
    } = useForm();

    const {token, setToken} = useUserStore();

    console.log(token )
    // console.log(errors);
    const toggleLoading = () => setIsLoading(prev => !prev);

    const onSubmit = async (data) => {
        if(variant === "REGISTER") {
            // toggleLoading();
            setIsLoading(true);
            const response = await apiRegister(data);
            
            // toggleLoading();
            setIsLoading(false);
            console.log(response);
            if(response.success) {
                Swal.fire({
                    icon: "success",
                    title: "Congrats!",
                    text: response.mes,
                    showConfirmButton: true,
                    confirmButton: "Go sign in"
                }).then(({ isConfirmed }) => {
                    if(isConfirmed) setVariant("LOGIN")
                })
            } else toast.error(response.mes)
        }
        // console.log(data);
        if(variant === "LOGIN") {
            // console.log(data);
            const {name, role, ...payload} = data;
            const response = await apiSignIn(data);
            if(response.success){
                toast.success(response.mes);
                setToken(response.accessToken);
                setModal(false, null);

            }else toast.error(response.mes);
        }

    }

    useEffect(() => {
        reset();
    }, [variant])

    return (
        <div
            className='bg-white text-lg rounded-md px-6 py-8 w-[500px] flex flex-col items-center gap-6'
            onClick={(e) => e.stopPropagation()}
        >
            <h1 className='text-5xl font-dance font-semibold tracking-tight'>Welcome to Zillow</h1>

            <div className="flex border-b w-full justify-start gap-6">
                <span
                    onClick={() => setVariant("LOGIN")}
                    className={clsx(variant === "LOGIN" && "border-b-4 border-blue-500", "cursor-pointer")}
                > Login </span>
                <span
                    onClick={() => setVariant("REGISTER")}
                    className={clsx(variant === "REGISTER" && "border-b-4 border-blue-700", "cursor-pointer")}
                >New Account</span>
            </div>


            <form className="flex flex-col px-4 w-full ">
                <InputForm
                    placeholder="Enter your phone"
                    label="Phone Number"
                    inputClassname="rounded-md"
                    register={register} 
                    id="phone"
                    validate={{
                        required: 'This field cannot empty.',
                        pattern: {
                            value: /(0[3|5|7|8|9])+([0-9]{8})\b/,
                            message: "Phone number invalid"
                        }
                    }}
                    errors={errors}
                    />

                <InputForm
                    placeholder="Enter your password"
                    label="Password"
                    inputClassname="rounded-md"
                    register={register} 
                    id="password"
                    type='password'
                    validate={{ required: "Password must be fille."}}
                    errors={errors}
                    />

                {variant === "REGISTER" &&
                    <InputForm
                        placeholder="Enter your full name"
                        label="Full name"
                        inputClassname="rounded-md"
                        register={register} 
                        id="name" 
                        validate={{required: "Name must be fille"}}
                        errors={errors}
                        />
                        
                }
                {variant === "REGISTER" && (
                    <InputRadio 
                    label="Type account: "
                    register={register} 
                    id="role" 
                    validate={{required: "Name must be fille"}}
                    errors={errors}
                    option={[
                        {id:1, label: "User", value: "USER"},
                        {id:2, label: "Agent", value: "AGENT"},
                        // {id:3, label: "ADMIN", value: "ADMIN"}
                    ]}
                />
                )}

                <Button 
                    onClick={handleSubmit(onSubmit)}
                    className="py-2 my-6">
                    {variant === "LOGIN" ? "Sign in" : "Register"}
                </Button>
                {variant === "LOGIN" && 
                    <span className='cursor-pointer text-main-500 hover:underline w-full text-center'>
                        Forgot your password?
                    </span>
                }
            </form>
            
        </div>
    )
}

export default Login