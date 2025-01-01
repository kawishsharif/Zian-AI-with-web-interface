import { Fragment, ReactNode, useState } from "react"
import { PrimaryBtn } from "../ui/buttons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { TriggerFunProps } from "../WarningPopup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GrBorderBox from "../ui/gr-border-box"




type Props = {
    trigger?: ({ close, open }: TriggerFunProps) => ReactNode
}


export default function InstructionsSentPopup({ trigger }: Props) {
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
                    <PrimaryBtn className=" h-full w-full md:w-auto px-8 py-3" onClick={openModal}>
                        Submit
                    </PrimaryBtn>
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
                                            <div className="w-full flex flex-row  items-center justify-between px-4 pt-5 md:px-5">
                                                <button type="button" onClick={closeModal}
                                                    className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </button>
                                                <div></div>
                                            </div>
                                            <div className="px-6  pb-9 space-y-[10px]  md:pb-[50px] md:px-8 md:space-y-0">
                                                {/* content */}

                                                <img src="/images/instructions-logo.png" width={80} height={80} loading="lazy"
                                                    className={cn(
                                                        "w-[80px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                                                        "block"
                                                    )}
                                                    alt="" />
                                                <div className="font-nebula text-white text-center text-2xl font-normal md:pt-7">
                                                    Instructions sent
                                                </div>
                                                <div className="flex justify-center">
                                                    <p className="md:text-sm text-xs font-normal font-jakarta text-white/70 text-center md:py-4 max-w-full md:max-w-[80%]">
                                                        We have sent the instructions to your email. Please follow those instructions to reset your password
                                                    </p>
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


