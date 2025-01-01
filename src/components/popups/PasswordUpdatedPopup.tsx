import { Fragment, ReactNode, useState } from "react"
import { PrimaryBtn } from "../ui/buttons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { TriggerFunProps } from "../WarningPopup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




type Props = {
    trigger?: ({ close, open }: TriggerFunProps) => ReactNode
}


export default function PasswordUpdatedPopup({ trigger }: Props) {
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
                    <PrimaryBtn className=" h-full md:w-auto md:px-6 px-4 py-2 md:py-3" onClick={openModal}>
                        Update Password
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
                                    "w-full max-w-[500px] transform overflow-hidden rounded-20 bg-gr-purple-dark shadow-xl transition-all",
                                    "relative"
                                )}>
                                    <div className="w-full flex flex-row  items-center justify-between px-5 mt-5">
                                        <div></div>
                                        <button type="button" onClick={closeModal}
                                            className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>

                                    <div className="px-8 pb-[50px] max-h-[calc(100vh_-_200px)] overflow-y-auto">
                                        {/* content */}
                                        <img src="/images/passwordupdated.png" width={80} height={80} loading="lazy"
                                            className={cn(
                                                "w-[100px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                                                "block"
                                            )}
                                            alt="" />
                                        <div className="font-jakarta text-white text-center text-2xl font-normal mt-5">
                                            Password updated successfully!
                                        </div>
                                        <div>
                                            <p className="text-sm font-normal font-jakarta text-white/70 text-center my-4">
                                                You can now use your new password to login
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <PrimaryBtn className="py-3 h-full px-6 w-auto">
                                                Done
                                            </PrimaryBtn>
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


