import { Fragment, ReactNode, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { TriggerFunProps } from "../WarningPopup"
import { InputEl } from "../ui/input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import InstructionsSentPopup from "./InstructionsSentPopup"
import GrBorderBox from "../ui/gr-border-box"




type Props = {
    trigger?: ({ close, open }: TriggerFunProps) => ReactNode
}


export default function ForgotPassword({ trigger }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            {
                trigger ?
                    trigger?.({
                        open: openModal,
                        close: closeModal
                    })
                    :
                    <p className="font-jakarta md:text-sm text-xs font-normal text-white" onClick={openModal}>
                        Forgot password?
                    </p>
            }



            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                        <div className="flex min-h-full items-center justify-center p-4">
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
                                    "w-full max-w-[500px] transform overflow-hidden shadow-xl transition-all",
                                    "relative"
                                )}>

                                    <GrBorderBox>
                                        <div className="rounded-20 bg-gr-purple-light">
                                            <div className="w-full flex flex-row  items-center justify-between px-5 pt-5 ">
                                                <button type="button" onClick={closeModal}
                                                    className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                                    <FontAwesomeIcon icon={faArrowLeft} />
                                                </button>
                                                <div></div>
                                            </div>
                                            <div className="px-5 pb-10  md:px-8 md:pb-[50px] ">
                                                {/* content */}
                                                <img src="/images/avatar.png" width={100} height={100} loading="lazy"
                                                    className={cn(
                                                        "w-[100px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                                                        "block"
                                                    )}
                                                    alt="" />
                                                <div className="font-nebula text-white text-center text-2xl font-normal mt-5">
                                                    Forgot Password?
                                                </div>
                                                <div>
                                                    <p className="md:text-sm text-xs font-normal font-jakarta text-white/70 text-center mt-4">
                                                        We got this. Please enter your registered email below and we will send instructions to reset your password
                                                    </p>
                                                </div>
                                                <div className="lg:p-5 lg:pt-8 space-y-4 md:text-sm text-xs pt-4 lg:px-0 px-1">
                                                    <InputEl label="Email" placeholder="" />
                                                </div>
                                                <div className="flex justify-between md:px-0 px-1 lg:pt-0 pt-5">
                                                    <div></div>
                                                    <div>
                                                        <InstructionsSentPopup />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </GrBorderBox>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


