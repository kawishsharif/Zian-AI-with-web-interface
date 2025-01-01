import { Fragment, ReactNode, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { PrimaryBtn, SecondaryBtn } from "./ui/buttons"



export type TriggerFunProps = {
    close: () => void;
    open: () => void;
}


type Props = {
    heading: string;
    description: string;
    positiveText: string;
    negativeText: string;
    trigger: ({ close, open }: TriggerFunProps) => ReactNode;
}


export default function WarningPopup({
    heading, description, negativeText,
    positiveText, trigger
}: Props) {
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
                trigger({
                    open: openModal,
                    close: closeModal
                })
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
                                    <div className="py-12 px-4 sm:px-8 md:p-7 max-h-[calc(100vh_-_200px)] overflow-y-auto">
                                        <div className="text-center md:text-start w-full px-4 md:px-0">
                                            <h3 className="text-white text-xl font-jakarta font-bold">
                                                {heading}
                                            </h3>
                                            <p className="text-white font-normal font-jakarta text-xs md:text-sm mt-[5px] md:mt-[14px]">
                                                {description}
                                            </p>
                                        </div>
                                        <div className="mt-[30px] md:mt-[60px] w-full min-h-[20px] bg-gr-purple-dark p-4 md:p-5 flex items-center gap-3 justify-center md:justify-end">
                                            <SecondaryBtn filled={false} onClick={closeModal} className="border-white/10 py-3 px-4 md:px-8 w-full md:w-auto">
                                                {negativeText}
                                            </SecondaryBtn>
                                            <PrimaryBtn className="py-3 h-full px-4 md:px-8 w-full md:w-auto">
                                                {positiveText}
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


