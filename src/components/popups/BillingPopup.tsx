import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { faCreditCard, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavigationItem } from "../sidebar"
import useAuthUserStore from "@/lib/zustand/authUserStore"
import CustomTooltip from "../custom-tooltip"







export default function BillingPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const { authUser } = useAuthUserStore()


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }




    return (
        <>
            <NavigationItem
                onClick={openModal} active={isOpen}
                className="mb-3"
                text="Billing & Plan"
                icon={<FontAwesomeIcon icon={faCreditCard} />} />

            <Transition appear show={isOpen} static as={Fragment}>
                <Dialog as="div" onClose={() => setIsOpen(true)} static className="relative z-50">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className={cn(
                                    "w-full max-w-[805px] transform overflow-hidden rounded-20  shadow-xl transition-all",
                                    "relative  border-primary rounded-20"
                                )}>

                                    <div className="flex flex-col pb-12 space-y-32 p-7 bg-gr-purple-dark md:pb-7">
                                        {/* content */}

                                        <div className="space-y-6 lg:space-y-10">
                                            <div>
                                                <div className="flex flex-row items-center justify-between w-full ">
                                                    <div>
                                                        <h1 className="text-2xl md:text-[32px] font-jakarta font-bold text-white">
                                                            Billing & Plan
                                                        </h1>
                                                    </div>
                                                    <button type="button" onClick={closeModal}
                                                        className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-point">
                                                        <FontAwesomeIcon icon={faXmark} />
                                                    </button>
                                                </div>

                                            </div>
                                            <div className="space-y-2">
                                                <div>
                                                    <div className="space-y-[6px]">
                                                        <h1 className="text-base font-bold text-white font-jakarta md:text-xl">
                                                            {/* {authUser?.profile?.package} Plan: {authUser?.profile?.quota}  Articles per week */}
                                                            Free Plan
                                                        </h1>
                                                        <p className="text-sm font-normal md:text-base font-jakarta text-white/70">
                                                            Current quota remaining: {Math.max(0, (authUser?.quota ?? 0) - 1)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="w-full h-1 bg-white">
                                                    <div className="bg-primary w-[90%] h-full">
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center justify-between gap-5 pb-12 md:flex-row md:pb-0">
                                                <div className="w-full p-[10px] flex items-center justify-center border border-body/10 rounded-10 bg-body/10 md:w-auto md:p-[14px]">
                                                    <p className="text-sm font-medium text-white font-Inter">
                                                        To change or upgrade your plan, please email
                                                        <a href="mailto:hello@zian.ai" className="pl-1 underline">
                                                            hello@zian.ai
                                                        </a>
                                                    </p>
                                                </div>
                                                <CustomTooltip
                                                    title="Upgrade"
                                                    className="w-full"
                                                    content={
                                                        <>
                                                            To increase articles volume, please email <a href="mailto:hello@zian.ai" className="underline">hello@zian.ai</a>
                                                        </>
                                                    } />
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


