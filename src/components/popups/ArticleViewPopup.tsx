import { Fragment, ReactNode, useState } from "react"
import { PrimaryBtnNeon, SecondaryBtn } from "../ui/buttons"
import { Dialog, Transition } from "@headlessui/react"
import { b64Image, cn } from "@/lib/utils"
import { TriggerFunProps } from "../WarningPopup"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Article } from "@/types/response.types"
import { AnchorNeon } from "../ui/anchor-link"
import { useToast } from "../ui/use-toast"




type Props = {
    article: Article,
    trigger?: ({ close, open }: TriggerFunProps) => ReactNode;
}


export default function ArticleViewPopup({ trigger, article }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast()

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const copyTitle = async () => {
        await navigator.clipboard.writeText(article.headline);
        toast({
            title: "Article title copied to clipboard.",
            variant: "default",
            duration: 1500
        })
    }
    const copyArticleBody = async () => {
        await navigator.clipboard.writeText(article.body);
        toast({
            title: "Article copied to clipboard.",
            variant: "default",
            duration: 1500,
        })
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
                        Article View Popup
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

                    <div className="fixed inset-0">
                        <div className="flex min-h-full items-center justify-center md:p-4">
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
                                    "w-full max-w-[95vw] md:max-w-[805px] transform flex flex-col bg-gr-purple-light shadow-xl transition-all",
                                    "relative overflow-hidden pb-5 max-h-[98vh] rounded-20"
                                )}>
                                    <div className="w-full flex flex-row gap-5 items-start justify-between sticky top-0 px-4 pt-4 pb-0 md:px-8 md:pt-8 md:pb-0">
                                        <div className="w-full mt-8 md:mt-0 md:max-w-[90%]">
                                            <h1 className="text-2xl font-bold font-jakarta">
                                                {article.headline}
                                            </h1>
                                            <div className="flex flex-wrap items-center mt-5 gap-2">
                                                <PrimaryBtnNeon onClick={copyTitle} className="text-sm">
                                                    Copy Title
                                                </PrimaryBtnNeon>
                                                <PrimaryBtnNeon onClick={copyArticleBody} className="text-sm">
                                                    Copy Article
                                                </PrimaryBtnNeon>
                                                <AnchorNeon href={b64Image(article.image)} download={`${article.headline}.jpg`} target="_blank" className="text-sm">
                                                    Download Image
                                                </AnchorNeon>
                                            </div>
                                        </div>
                                        <button type="button" onClick={closeModal}
                                            className={cn(
                                                "text-white block text-3xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer",
                                                "absolute top-4 md:top-8 right-4 md:right-5"
                                            )}>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>

                                    <div className="max-h-full mt-5 overflow-y-auto flex flex-col p-4 md:p-8">
                                        <div className="min-h-[430px] md:min-h-[330px] rounded-10 border py-2 md:py-4 border-white/20 overflow-hidden">
                                            <div className="max-h-[430px] md:max-h-[330px] px-2 md:px-5 pb-5 overflow-y-auto">
                                                <p className="text-sm font-light font-jakarta text-body whitespace-pre-line">
                                                    {article.body}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-5 h-full pb-5">
                                            <img src={b64Image(article.image)}
                                                width={800}
                                                height={400}
                                                alt=""
                                                className="w-full h-auto object-fill"
                                            />
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


