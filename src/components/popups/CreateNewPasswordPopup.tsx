import { Fragment, ReactNode, useState } from "react"
import { SecondaryBtn } from "../ui/buttons"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { TriggerFunProps } from "../WarningPopup"
import { InputEl } from "../ui/input"
import NewPasswordCreatedPopup from "./NewPasswordCreatedPopup"
import GrBorderBox from "../ui/gr-border-box"





type Props = {
    trigger?: ({ close, open }: TriggerFunProps) => ReactNode
}


export default function CreateNewPasswordPopup({ trigger }: Props) {
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
                        Create New Password
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
                                    "w-full max-w-[500px] transform overflow-hidden  shadow-xl transition-all",
                                    "relative"
                                )}>
                                    <GrBorderBox>
                                        <div className="px-8 pt-[30px] pb-[50px] max-h-[calc(100vh_-_200px)] rounded-20 bg-gr-purple-dark">
                                            {/* content */}
                                            <img src="/images/avatar.png" width={100} height={100} loading="lazy"
                                                className={cn(
                                                    "w-[100px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                                                    "block"
                                                )}
                                                alt="" />
                                            <div className="font-nebula text-white text-center text-2xl font-normal mt-5">
                                                CREATE NEW PASSWORD
                                            </div>
                                            <div className="p-3 lg:p-5 lg:pt-8 space-y-4 md:mx-6 md:text-sm text-xs">
                                                <InputEl label="New Password" placeholder="" />
                                                <InputEl label="Retype New Passowrd" placeholder="" />
                                            </div>
                                            <div className="flex justify-between md:mx-11 mx-3">
                                                <div>
                                                </div>
                                                <div className="">
                                                    <NewPasswordCreatedPopup />
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


