import React from 'react'
import { Button, Title, InputForm, InputText, Textarea, InputFile } from '../../../components'
import { CiCirclePlus } from "react-icons/ci";
import { useForm } from 'react-hook-form';

const Create = () => {

    const { register, formState: {errors}, handleSubmit, reset, setValue} = useForm();

    const handleCreateNewProperty = (data) => {
        console.log(data);
    }

    return (
        <div className=''>
            <Title title="Create New Property Type">
                <Button 
                    onClick={handleSubmit(handleCreateNewProperty)}
                
                    >
                    <CiCirclePlus size={20} />
                    <span>Create</span>
                </Button>
            </Title>

            <form className='p-4 flex flex-col gap-4'>
                <InputForm
                    id="name"
                    register={register}
                    errors= {errors}
                    validate={{ required: "this field cannot empty."}}
                    label="Property Type name"
                /> 

                {/* <InputText
                    id="description"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    label="Description"
                    validate={{ required: "This field cannot empty."}}
                /> */}
                <Textarea 
                    id="description"
                    register={register}
                    errors= {errors}
                    validate={{ required: "this field cannot empty."}}
                    label="Description"
                />

                <InputFile 
                    id="image"
                    register={register}
                    errors= {errors}
                    validate={{ required: "this field cannot empty."}}
                    label="Image"
                />

                

            </form>
        </div>
    )
}

export default Create