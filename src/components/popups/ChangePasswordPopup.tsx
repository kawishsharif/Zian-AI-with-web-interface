import { Fragment, ReactNode, useState } from "react"
import {  SecondaryBtn } from "../ui/buttons"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { TriggerFunProps } from "../WarningPopup"
import { InputEl } from "../ui/input"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PasswordUpdatedPopup from "./PasswordUpdatedPopup"
import GrBorderBox from "../ui/gr-border-box"




type Props = {
    trigger?: ({ close, open }: TriggerFunProps) => ReactNode
}


export default function ChangePasswordPopup({ trigger }: Props) {
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
                        Change password
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
                                    "w-full max-w-[805px] transform overflow-hidden rounded-20 bg-gr-purple-dark shadow-xl transition-all",
                                    "relative"
                                )}>
                                    <div className="w-full flex flex-row  items-center justify-between px-5 mt-5">
                                        <div></div>
                                        <button type="button" onClick={closeModal}
                                            className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>

                                    <div className=" flex flex-col">
                                        {/* content */}
                                        <div className="mx-7 md:space-y-7 space-y-3 pb-24 md:pb-80">
                                            <div className="font-jakarta text-white text-[32px] font-bold">
                                                Update Password
                                            </div>
                                            <div className="space-y-4  md:text-sm text-xs">
                                                <InputEl label="Enter your current password" placeholder="" />
                                                <InputEl label="Enter new password" placeholder="" />
                                            </div>
                                        </div>
                                        <GrBorderBox className="p-px md:p-[2px] overflow-hidden w-full rounded-none">
                                            <div className="flex justify-end bg-gr-purple-dark px-5 py-2 md:py-4 md:px-6">
                                                <div className="space-x-[10px]">
                                                    <SecondaryBtn className="py-4 text-sm">
                                                        Cancel
                                                    </SecondaryBtn>
                                                    <PasswordUpdatedPopup />
                                                </div>
                                            </div>
                                        </GrBorderBox>
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


