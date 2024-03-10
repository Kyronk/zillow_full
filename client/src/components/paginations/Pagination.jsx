import React from 'react'
import usePagination from "../../hooks/usePagination";
import PaginationItem from './PaginationItem';
import Button from '../commons/Button';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import {twMerge} from "tailwind-merge";

import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import clsx from 'clsx';
import withRouter from '../../hocs/withRouter';

const Pagination = ({
    total,
    limit,
    page, 
    sibling,
    navigate,
    location
}) => {

    const pagination = usePagination({total: total, limit: limit, currentPage: page, sibling: 0})
    // const pagination = usePagination({total: 12, limit: 2, currentPage: 5, sibling: 0})
    const [searchParams] = useSearchParams();
    // console.log(pagination);
    // const navigate = useNavigate();
    const handleNextPage = () => {
        if (+page >= Math.ceil(+total / +limit)) return
        navigate({
            pathname: location.pathname,
            search: createSearchParams({page: page + 1}).toString(),
        });
    };
    const handleBackPage = () => {
        if(+page <= 1 || !page) return
        navigate({
            pathname: location.pathname,
            search: createSearchParams({page: page - 1}).toString(),
        });
    };

    return (
        <div className='flex items-center justify-center gap-2'>
            <Button 
                onClick={handleBackPage}
                className={twMerge(clsx("bg-main-500", (!page || +page === 1) ? "cursor-not-allowed opacity-50" : ""))}
                
                >
                <FaArrowLeft />
            </Button>
            {pagination?.map((el, idx) => <PaginationItem page={searchParams.get("page")} content={el} key={idx} />)}
            <Button 
                onClick={handleNextPage}
                className={twMerge(
                    clsx("bg-main-500", +page === Math.ceil(+total / +limit) ? "cursor-not-allowed opacity-50" : ""))}

                >
                <FaArrowRight />
            </Button>
        </div>
    )
}

export default withRouter(Pagination);