import { Fragment, ReactNode, useState } from "react"
import { PrimaryBtn, SecondaryBtn } from "../ui/buttons"
import { faEye, faXmark } from "@fortawesome/free-solid-svg-icons"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { TriggerFunProps } from "../WarningPopup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




type Props = {
    trigger?: ({ close, open }: TriggerFunProps) => ReactNode
}


export default function PostViewPopup({ trigger }: Props) {
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
                    <SecondaryBtn onClick={openModal} className="p-3">
                        <FontAwesomeIcon icon={faEye} />
                    </SecondaryBtn>
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
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                                    "w-full max-w-3xl transform overflow-hidden rounded-20 bg-gr-purple-dark shadow-xl transition-all",
                                    "relative"
                                )}>
                                    <div className="w-full flex flex-row p-5 items-center justify-between pb-3">
                                        <div></div>
                                        <button type="button" onClick={closeModal}
                                            className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>

                                    <div className="p-8 py-16 max-h-[calc(100vh_-_200px)] overflow-y-auto">
                                        {/* content */}
                                    </div>
                                    <div className="w-full min-h-[20px] bg-gr-purple-dark p-4 md:p-5 flex md:hidden items-center gap-3 justify-end">
                                        <SecondaryBtn  filled={false} className="border-white/10 py-3 px-8 w-full md:w-auto">
                                            Regenerate Image
                                        </SecondaryBtn>
                                        <PrimaryBtn className="py-3 h-full px-8 w-full md:w-auto">
                                            Send Now
                                        </PrimaryBtn>
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


