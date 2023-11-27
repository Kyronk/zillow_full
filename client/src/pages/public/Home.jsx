import React from 'react'

const Home = () => {
    return (
        <div className='bg-white w-full'>
            <div className='w-full h-fit relative'>
                <img src="img/banner.png" alt="banner" className="" />
                <div className='absolute inset-0 flex-col gap-6 pt-12 flex items-center justify-center'>
                    <h1 className='text-5xl text-white'>Find Your Dream Home</h1>
                    <span className='text-white flex flex-col text-lg items-center'>
                        <span>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
                        posuere cubilia curae;</span>
                        <span>
                            Proin sodales ultrices nulla blandit volutpat.
                        </span>
                    </span>
                </div>
            </div>

            <div className="w-main mx-auto"> content </div>
        </div>
    )
}

export default Home