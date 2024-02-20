import React from 'react'
import { Button, Title, InputForm, InputText, Textarea, InputFile } from '../../../components'
import { CiCirclePlus } from "react-icons/ci";
import { useForm } from 'react-hook-form';
import { apiCreateNewPropertyType } from '../../../apis/propertyType';
import { toast } from "react-toastify";

const Create = () => {

    const { 
        register, 
        formState: {errors}, 
        handleSubmit, 
        reset, 
        setValue,
        setError,
        clearErrors
    } = useForm();

    const handleCreateNewProperty = async (data) => {
        console.log(data);
        // const resp = await 
        if (!data.images || data.images.length === 0 ) {
            setError("images", {
                message: "this field cannot empty.",
                type: "require"
            })
        } else {
            const {images, ...payload} = data;
            // const response = await apiCreateNewPropertyType(data);
            const response = await apiCreateNewPropertyType({...payload, image: images[0]});
            
            if (response.success) {
                toast.success(response.mes);
                reset();
                getImages([]);
            } else toast.error(response.mes);
        }
    };

    const getImages = (images) => {
        if(images && images.length > 0) clearErrors("images");
        setValue(
            "images",
            images?.map((el) => el.path)
        )
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
                    multiple={true}
                    // getImages={images => setValue("images", images?.map(el => el.path))}
                    getImages={getImages}
                />

                

            </form>
        </div>
    )
}

export default Create