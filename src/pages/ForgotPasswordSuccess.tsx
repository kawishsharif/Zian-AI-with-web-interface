import { cn } from "@/lib/utils";
import MainLayout from "../components/layout";
import GrBorderBox from "@/components/ui/gr-border-box";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




export default function ForgotPasswordSuccessPage() {

    return (
        <MainLayout secure={false}>
            <div className="flex flex-col items-center justify-center py-20">
                <GrBorderBox className="p-[2px] rounded-20 w-full max-w-[500px] shadow-xl">
                    <div className={cn(
                        "rounded-20  bg-gr-purple-light",
                    )}>
                        <div className="w-full flex flex-row  items-center justify-between px-4 pt-5 md:px-5">
                            <button type="button" onClick={() => window.history.back()}
                                className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                            <div></div>
                        </div>
                        <div className="px-6 pb-9 space-y-[10px]  md:pb-[50px] md:px-8 md:space-y-0">
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
            </div>
        </MainLayout>
    );
}

