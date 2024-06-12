import React from 'react'

import { useForm } from 'react-hook-form'
import { InputForm } from "../../components";

const Personal = () => {

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm();

    return (
        <div className='h-full'>
            <div className='h-14 flex justify-between items-center border-b px-6'>
                <h1 className='text-3xl font-bold text-main-700'>Personal Information</h1>
            </div>

            <form className='max-w-[600px] space-y-4 mx-auto my-6'>
                <InputForm
                    id="name"
                    register={register}
                    validate={{reuiqred: "this field cannot empty."}}
                    errors={errors}
                    label="Fullname"
                    require
                    placeholder="Required full name"
                />

                <InputForm
                    id="phone"
                    register={register}
                    validate={{reuiqred: "this field cannot empty."}}
                    errors={errors}
                    label="Phone number"
                    require
                    placeholder="Required phone number"
                />
                
                <InputForm
                    id="email"
                    register={register}
                    validate={{reuiqred: "this field cannot empty."}}
                    errors={errors}
                    label="Email"
                    require
                    placeholder="Required email"
                />

                <InputForm
                    id="address"
                    register={register}
                    validate={{reuiqred: "this field cannot empty."}}
                    errors={errors}
                    label="Address"
                    require
                    placeholder="Required address"
                />

            </form>

        </div>
    )
}

export default Personal