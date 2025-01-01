import { Fragment, ReactNode, useState } from "react"
import { PrimaryBtn } from "../ui/buttons"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { TriggerFunProps } from "../WarningPopup"
import { InputEl } from "../ui/input"
import SelectEl from "../ui/selectel"
import { TextAreaEl } from "../ui/textarea"
import GrBorderBox from "../ui/gr-border-box"




type Props = {
    trigger?: ({ close, open }: TriggerFunProps) => ReactNode
}


export default function OnboardingPopup({ trigger }: Props) {
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
                    <span onClick={openModal}>Sign Up</span>

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
                                    "w-full max-w-[500px] transform overflow-hidden  shadow-xl transition-all ",
                                    "relative"
                                )}>
                                    <GrBorderBox>
                                        <div className="md:px-8 py-[30px] max-h-[calc(100vh_-_200px)] rounded-20 bg-gr-purple-light">
                                            {/* content */}
                                            <img src="/images/avatar.png" width={100} height={100} loading="lazy"
                                                className={cn(
                                                    "w-[100px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                                                    "block"
                                                )}
                                                alt="" />
                                            <div className="font-nebula text-white text-center text-2xl font-normal mt-5">
                                                Customize ZIAN
                                                <br />Ai for your business
                                            </div>
                                            <div className="p-3 lg:p-5 lg:pt-8 space-y-[10px]">
                                                <InputEl label="Your Website Link" placeholder="" />
                                                <SelectEl
                                                    className="w-full"
                                                    labelNode={
                                                        <label className="w-full flex items-center justify-between text-start flex-wrap gap-1 mb-2">
                                                            <p className="text-white font-bold text-sm w-full md:w-auto">
                                                                Your Industry
                                                            </p>
                                                        </label>
                                                    }
                                                    options={[
                                                        {
                                                            text: "Select industry",
                                                            value: "Select industry",
                                                            disabled: false
                                                        },
                                                    ]} />
                                                <TextAreaEl
                                                    labelNode={
                                                        <label className="w-full flex items-center justify-between">
                                                            <p className="text-white text-sm font-bold">
                                                                Your target SEO search keywords (up to 5)
                                                            </p>
                                                        </label>
                                                    }
                                                    placeholder="Enter keyword and press enter" />
                                                <div className="flex justify-between">
                                                    <div></div>
                                                    <div>
                                                        <PrimaryBtn className="py-3 h-full px-6 md:w-auto">
                                                            Submit & Complete Sign up
                                                        </PrimaryBtn>
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


