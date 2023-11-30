import React, { useEffect, useState } from 'react'

import clsx from 'clsx';


import { InputForm, Button } from "../index";
import { useForm } from 'react-hook-form';

const Login = () => {

    const [variant, setVariant] = useState("LOGIN");
    const { 
        register, 
        formState: { errors }, 
        handleSubmit,
        reset,
    } = useForm();

    // console.log(errors);

    const onSubmit = (data) => {
        console.log(data);
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
                    id="number"
                    validate={{required: 'This field cannot empty.'}}
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