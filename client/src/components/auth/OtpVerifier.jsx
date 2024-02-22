import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import Button from '../commons/Button';

const OtpVerifier = ({phone, callback}) => {

    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleConfirmOTP = () => {
        setIsLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then((result) => {
                console.log(result);
                setIsLoading(false);
                callback();
            })
            .catch((err) => {
                setIsLoading(false);
            })
    }

    return (
        <div className='p-4 flex justify-center items-center h-full flex-col gap-12'>
            <span>We sent OTP code to your phone number <span>{phone}</span>. Please check your phone</span>
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>•</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={"otp-item h-20 border rounded-md outline-none inset-block border-blue-600 text-lg mx-1"}
                />
            <div className='flex gap-4 items-center justify-center'>
                <Button
                    onClick={handleConfirmOTP}
                    disabled={isLoading}
                    // handleOnClick={handleConfirmOTP}
                >Confirm OTP</Button>
                <Button
                    disabled={isLoading}
                    onClick={() => setOtp("")}
                    // handleOnClick={() => setOtp("")}
                    className="bg-orange-600"
                >Clear</Button>
            </div>
        </div>
    )
}

export default OtpVerifier