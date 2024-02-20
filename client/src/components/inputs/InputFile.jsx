import React, { useEffect, useState } from 'react'
import { twMerge } from "tailwind-merge";
import clsx from 'clsx';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { apiUploadImages } from '../../apis/beyond';
import { FaSpinner } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-toastify";

const InputFile = ({
    // style = "form-input",
    containerClassname, 
    label, 
    id, 
    // type="text",
    // register,
    // errors = {},
    inputClassname,
    validate,
    multiple,
    getImages,
    errors,
    // placeholder
}) => {
    // console.log(errors.images)

    const { 
        register, 
        // formState: {errors}, 
        watch} = useForm();
    const rawImages = watch(id);
    const [images, setImages] = useState([]);
    const [isLoading , setIsLoading] = useState(false);


    const handleUpload = async (files) => {
        const formData = new FormData();
        const uploadPromises = [];
        const imageLink = [];
        setIsLoading(true);
        for(let file of files) {
            formData.append("file", file);
            formData.append("upload_preset", import.meta.env.VITE_CLOUNDINARY_UPLOAD_PERSETS);        

            // const response = await apiUploadImages(formData);
            // if(response.status === 200) imageLink.push(response.data.secure_url);
            // if(response.status === 200) imageLink.push({id: response.data.public_id, path: response.data.secure_url});
            // console.log(response);
            uploadPromises.push(apiUploadImages(formData));
        }
        const response = await Promise.all(uploadPromises);
        setIsLoading(false);
        if (response && response.length > 0) {
            const tempArrImage = [];
            for (let result of response) {
                if (result.status === 200) 
                    tempArrImage.push({
                        id: result.data.public_id,
                        path: result.data.secure_url
                })
            }
            setImages(tempArrImage);
        } else toast.error("Something went wrong");
        // console.log(response)
        // if( response && response.length > 0) {
        //     const imagesArray = response.map((el) => (el.status === 200 ? el.data.secure_url : undefined))?.filter((el) => el !== undefined);
        // }

    };

    useEffect(() => {
        if(rawImages && rawImages instanceof FileList && rawImages.length > 0) {
            handleUpload(rawImages)
        }
    }, [rawImages]);

    useEffect(() => {
        // if( images && images.length > 0) getImages(images)
        getImages(images);
    }, [images]);

    const handleDeleteImage = (e, imageId) => {
        e.preventDefault();
        setImages((prev) => prev.filter((el) => el.id !== imageId));
    }

    // console.log(images)

    return (
        <div className={twMerge(clsx("flex flex-col gap-2 w-full my-2", containerClassname ))}>
        {label && <span className='font-medium text-main-700' htmlFor={id}>{label}</span>}
        <input 
            type="file"
            id={id} 
            {...register(id, validate)}
            className='hidden'
            multiple={multiple}
            />

        <label 
            className='bg-gray-100 w-full p-16 flex items-center justify-center'
            htmlFor={id}
        >

            {isLoading ?  (
                <span className='animate-spin text-main-600'> 
                    <FaSpinner size={30}/> 
                </span> )
                : images?.length > 0 ? (
                    <div className='grid grid-cols-4 gap-4 '>
                        {images?.map((el, idx) => (
                            <div key={idx} className='col-span-1 relative'>
                                <span
                                    // onClick={() => setImages(prev => prev.filter(item => item.id !== el.id))} 
                                    onClick={(e) => handleDeleteImage(e, el.id)}
                                    className='w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer absolute top-1 right-0'>
                                    <TiDeleteOutline  size={18}/>
                                </span>
                                <img src={el.path} alt=""  className='w-full object-contain'/>
                            </div>
                        ) )}
                    </div> )
                    : ( 
                    <div className='flex flex-col justify-center items-center' >
                        <span className='text-5xl text-gray-300'>
                            <FaCloudUploadAlt />
                        </span>
                        <span> Choose image ... only support image with extension JPEG, PNG, JPG</span> 
                    </div>)
            }

        </label>
        
        {errors.images && <small className="text-red-600">{errors.images?.message}</small> }
    </div>
    )
}

export default InputFile