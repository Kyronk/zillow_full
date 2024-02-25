import React from 'react'
import SearchItem from './SearchItem'
import Button from '../commons/Button'

const Search = () => {
    return (
        //  1 rem = 16px
        <div className='bg-white py-8 grid grid-cols-4 rounded-md shadow-lg w-[1096px] mx-auto h-[8em] mt-[-4em] relative z-20'>
            <SearchItem />
            <SearchItem />
            <SearchItem />
            {/* <SearchItem /> */}
            <div>
                <Button>
                    Search
                </Button>
            </div>
            
        </div>
    )
}

export default Search