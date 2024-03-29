import React, { useEffect, useState } from 'react'

import clsx from 'clsx';
import { toast } from 'react-toastify';

import { InputForm, Button, InputRadio, OtpVerifier } from "../index";
import { useForm } from 'react-hook-form';
import { apiRegister, apiSignIn } from '../../apis/auth';

import Swal from "sweetalert2";
import { useAppStore } from '../../store/useAppStore';
import { useUserStore } from '../../store/useUserStore';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { twMerge } from "tailwind-merge"; 

import auth from '../../utils/firebaseConfig';


const Login = () => {

    const { setModal } = useAppStore();

    const [isLoading, setIsLoading] = useState(false);

    const [variant, setVariant] = useState("LOGIN");
    const [isShowConformOTP, setIsShowConformOTP] = useState(false);
    const { 
        register, 
        formState: { errors }, 
        handleSubmit,
        reset,
    } = useForm();

    const {token, setToken, roles } = useUserStore();

    // console.log(token );
    // console.log(errors);
    const toggleLoading = () => setIsLoading(prev => !prev);

    const handleCaptchaVerify = () => {
        // console.log(window.recaptchVerify);
        if (!window.recaptchVerify) {
            window.recaptchVerify = new RecaptchaVerifier(
                auth, 
                "recaptcha-verifier", 
                {
                    size: "invisible",
                    callback: (response) => {
                        // console.log({callback: response})
                    },
                    "expired-callback" : (response) => {
                        console.log({expired: response})
                    }
            }
            )
        }
    }

    const handleSendOTP = (phone) => {
        setIsLoading(true);
        handleCaptchaVerify();
        const verifier = window.recaptchVerify;
        const formatPhone = "+84" + phone.slice(1)
        signInWithPhoneNumber(auth, formatPhone, verifier).then((result) => {
            setIsLoading(false);
            // console.log(result);
            window.confirmationResult = result;
            toast.success("Sent otp  your phone. please check code in your phone");
            setIsShowConformOTP(true);

        }).catch((error) => {
            setIsLoading(false);
            // console.log(error);
            window.isSendOTP = false;
            toast.error("Something went wrong.");
        })
    }

    const onSubmit = async (data) => {
        if(variant === "REGISTER") {
            // console.log(data)
            if (data?.roleCode !== "ROL7") {
                // logic verify phone number
                // handleCaptchaVerify();
                handleSendOTP(data.phone);
            }
            // toggleLoading();
            // setIsLoading(true);
            // const response = await apiRegister(data);
            
            // // toggleLoading();
            // setIsLoading(false);
            // console.log(response);
            // if(response.success) {
            //     Swal.fire({
            //         icon: "success",
            //         title: "Congrats!",
            //         text: response.mes,
            //         showConfirmButton: true,
            //         confirmButton: "Go sign in"
            //     }).then(({ isConfirmed }) => {
            //         if(isConfirmed) setVariant("LOGIN")
            //     })
            // } else toast.error(response.mes)
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

    const handleRegister = async (data) => {
        const response = await apiRegister(data);
        // toggleLoading();
            // setIsLoading(false);
            // console.log(response);
        if(response.success) {
            Swal.fire({
                icon: "success",
                title: "Congrats!",
                text: response.mes,
                showConfirmButton: true,
                confirmButton: "Go sign in"
            }).then(({ isConfirmed }) => {
                if(isConfirmed) {
                    setVariant("LOGIN");
                    setIsShowConformOTP(false);
                
                }
            })
        } else toast.error(response.mes)
    }

    useEffect(() => {
        reset();
    }, [variant])

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={twMerge(
                clsx("bg-white relative text-lg rounded-md px-6 py-8 w-[600px] flex flex-col items-center gap-6",
                isShowConformOTP && "w-[600px] h-[280px]")
            )}
        >
            {isShowConformOTP && ( <div
                className='absolute inset-0 bg-white rounded-md'>
                <OtpVerifier 
                    callback={handleSubmit(handleRegister)}
                />
            </div>)}
            {/* <div
                className='absolute inset-0 bg-white rounded-md'>
                <OtpVerifier />
            </div> */}

            <h1 className='text-5xl font-dance font-semibold tracking-tight'>Welcome to Zillow</h1>

            <div className={twMerge(clsx("flex border-b w-full justify-start gap-6", isShowConformOTP && "hidden"))}>
                <span
                    onClick={() => setVariant("LOGIN")}
                    className={clsx(variant === "LOGIN" && "border-b-4 border-blue-500", "cursor-pointer")}
                > Login </span>
                <div id="recaptcha-verifier"></div>
                <span
                    onClick={() => setVariant("REGISTER")}
                    className={clsx(variant === "REGISTER" && "border-b-4 border-blue-700", "cursor-pointer")}
                >New Account</span>
            </div>


            <form className={twMerge(clsx("flex flex-col px-4 w-full", isShowConformOTP && "hidden"))}>
                <InputForm
                    placeholder="Enter your phone"
                    label="Phone Number"
                    inputClassname="rounded-md"
                    register={register} 
                    id="phone"
                    validate={{
                        required: 'This field cannot empty.',
                        pattern: {
                            value: /(0[1|3|5|7|8|9])+([0-9]{8})\b/,
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
                    id="roleCode" 
                    validate={{required: "Name must be fille"}}
                    errors={errors}
                    optionClassname={"grid grid-cols-3 gap-4"}
                    // option={[
                    //     {id:1, label: "User", value: "USER"},
                    //     {id:2, label: "Agent", value: "AGENT"},
                    //     {id:3, label: "ADMIN", value: "ADMIN"}
                    // ]}
                    option={roles?.filter(el => el.code !== "ROL1")?.map(el => ({ label: el.value, value: el.code}))}
                />
                )}

                <Button 
                    disabled={isLoading}
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