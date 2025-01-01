import GrBorderBox from "../components/ui/gr-border-box";
import MainLayout from "../components/layout";
import { PrimaryBtnNeon } from "@/components/ui/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import CustomTooltip from "@/components/custom-tooltip";
import { CrossCircledIcon } from '@radix-ui/react-icons'
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function BillingPage() {

    return (
        <div className="hidden">
        <MainLayout heading="Billing & plan">
            <div className="flex flex-col lg:flex-row gap-5 pb-8">
                <div className="p-7 space-y-6 lg:space-y-10 border border-primary bg-gr-purple-dark rounded-[20px] w-full lg:w-[60%]">
                    <div className="flex w-full flex-col lg:flex-row justify-between lg:items-center gap-3">
                        <h1 className="text-xl font-jakarta font-bold text-white">
                            Basic Plan
                        </h1>
                        <p className=" font-normal font-jakarta text-white space-x-1">
                            <span className="text-base font-bold md:text-xl">
                                $30
                            </span>
                            <span className="text-white/70 text-sm md:text-base">
                                per week
                            </span>
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <p className="text-sm font-normal font-jakarta text-white/70">
                                Weekly quota: 6 / 10
                            </p>
                        </div>
                        <div className="bg-white w-full h-1">
                            <div className="bg-primary w-[60%] h-full">
                            </div>
                        </div>
                    </div>
                    <CustomTooltip
                        title="Upgrade"
                        className="py-3 w-full lg:w-auto"
                        content={
                            <>
                                To change your plan or increase your weekly quota, please email hello@zian.ai
                            </>
                        } />
                </div>
                <div className="p-7 space-y-6 border border-primary rounded-[20px] w-full lg:w-[40%] bg-gr-purple-dark">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-jakarta font-bold text-white">
                            Payment method
                        </h1>
                        <p className="text-xs font-bold font-jakarta text-primary space-x-1 md:text-sm">
                            <span>
                                +
                            </span>
                            <span>
                                Add New
                            </span>
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-sm font-jakarta font-bold text-white">
                            <FontAwesomeIcon icon={faCreditCard} className="text-white/70" />
                            <span className="pl-[10px]">
                                Visa ending in
                            </span>
                        </h1>
                        <button className="bg-transparent text-white/40">
                            <CrossCircledIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-sm font-jakarta font-bold text-white">
                            <FontAwesomeIcon icon={faCreditCard} className="text-white/70" />
                            <span className="pl-[10px]">
                                Mastercard ending in 1234
                            </span>
                        </h1>
                        <button className="bg-transparent">
                            <CrossCircledIcon className="w-5 h-5" />
                        </button>
                    </div>

                </div>

            </div>


            <GrBorderBox className="w-full p-px md:p-[2px] rounded-20" type="lg">
                <div className="h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                    {/* Drafts Table  */}
                    <div className="w-full h-full rounded-20 flex flex-col">
                        <div className="border-b-[5px] text-xs font-semibold px-4 w-full hidden lg:flex justify-between items-center py-5 border-primary lg:gap-3">
                            <div className="flex items-center justify-between w-full">
                                <span className="block text-start lg:w-2/3">Invoice</span>
                                <span className="block text-start min-w-[120px]">Billing Date</span>
                                <span className="block text-start min-w-[80px]">Amount</span>
                                <span className="block text-start min-w-[80px]">Plan</span>
                            </div>
                            <span className="block text-start min-w-[170px]"></span>
                        </div>
                        <div className="lg:py-0 divide-y divide-white/10 px-4 lg:px-0 max-h-[600px] overflow-y-auto">
                            <SingleBiillingRow />
                            <SingleBiillingRow />
                            <SingleBiillingRow />
                            <SingleBiillingRow />
                            <SingleBiillingRow />
                            <SingleBiillingRow />
                            <SingleBiillingRow />
                            <SingleBiillingRow />
                        </div>
                        <Pagination />
                    </div>
                </div>

            </GrBorderBox>
        </MainLayout>
        </div>
    );
}


function SingleBiillingRow() {
    return (
        <div className="flex items-center justify-between w-full lg:gap-3 py-5 lg:px-4" >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-3 lg:gap-0">
                <span className="block text-sm lg:py-3 text-start overflow-hidden lg:w-2/3">
                    Invoice #007 - May 2023
                </span>
                <span className="flex items-center gap-2 lg:block lg:py-3 text-start overflow-hidden md:min-w-[120px]">
                    <p className="lg:w-full text-xs md:text-sm">
                        May 1, 2023
                    </p>
                    <span className="block lg:hidden w-1 h-1 bg-white rounded-full" />
                    {/* For responsive add ammount here  */}
                    <p className="lg:hidden text-xs md:text-sm">
                        $30.00
                    </p>
                </span>
                {/* This ammount will only be visible on desktop */}
                <span className="hidden lg:block lg:py-3 text-start  overflow-hidden md:min-w-[80px]">
                    <p className="w-full line-clamp-1 text-xs md:text-sm">
                        $30.00
                    </p>
                </span>
                <span className="block lg:py-3 text-start overflow-hidden min-w-[80px]">
                    <p className="w-full line-clamp-1 text-xs md:text-sm">
                        Basic Plan
                    </p>
                </span>
            </div>
            <span className="block text-white py-1 lg:py-3 text-start min-w-max lg:min-w-[170px] overflow-hidden">
                <PrimaryBtnNeon className=" py-3 h-10 px-5 lg:px-10 font-medium text-[15px] inline-flex items-center justify-center w-auto lg:w-full">
                    Download
                </PrimaryBtnNeon>
            </span>
        </div>
    );
}

function Pagination() {
    const [activePage, setActivePage] = useState(1);
    const visiblePages = [1, 2, 3, 4];

    const onPageChange = (page: number) => {
        const lastPage = visiblePages[visiblePages.length - 1];
        let newPage = page;
        if (newPage <= 0) newPage = 1
        if (newPage >= lastPage) newPage = lastPage
        setActivePage(newPage);
    }

    return (
        <div className="w-full border-t border-white/10 py-[10px] px-5 lg:sticky bottom-0 rounded-b-20 bg-dark flex items-center justify-end">
            <div className="flex items-center gap-2">
                <button type="button"
                    onClick={() => onPageChange(1)}
                    className="outline-none bg-white/5 rounded text-xs font-normal hover:bg-primary transition-all p-2 w-8 h-8 aspect-square">
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button type="button"
                    onClick={() => onPageChange(activePage - 1)}
                    className="outline-none bg-white/5 rounded text-xs font-normal hover:bg-primary transition-all p-2 w-8 h-8 aspect-square">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                {
                    visiblePages.map((page) => (
                        <button key={page} type="button"
                            onClick={() => onPageChange(page)}
                            className={cn(
                                "outline-none rounded text-xs font-normal transition-all p-2 w-8 h-8 aspect-square",
                                activePage === page ? "bg-primary" : "bg-white/5 hover:bg-primary"
                            )}>
                            {page}
                        </button>
                    ))
                }
                <button type="button"
                    onClick={() => onPageChange(activePage + 1)}
                    className="outline-none bg-white/5 rounded text-xs font-normal hover:bg-primary transition-all p-2 w-8 h-8 aspect-square">
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
                <button type="button"
                    onClick={() => onPageChange(visiblePages[visiblePages.length - 1])}
                    className="outline-none bg-white/5 rounded text-xs font-normal hover:bg-primary transition-all p-2 w-8 h-8 aspect-square">
                    <FontAwesomeIcon icon={faChevronRight} />
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
        
    )
    
}

