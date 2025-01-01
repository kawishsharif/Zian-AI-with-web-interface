import { cn } from "@/lib/utils";
import MainLayout from "../components/layout";
import GrBorderBox from "@/components/ui/gr-border-box";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryBtn } from "@/components/ui/buttons";
import { useNavigate } from "react-router";




export default function NewPasswordSuccessPage() {
    const navigate = useNavigate();

    return (
        <MainLayout secure={false}>
            <div className="flex flex-col items-center justify-center py-20">
                <GrBorderBox className="p-[2px] rounded-20 w-full max-w-[500px] shadow-xl">

                    <div className=" rounded-20 bg-gr-purple-dark">
                        <div className="w-full flex flex-row  items-center justify-between px-5 pt-5">
                            <button type="button"
                                onClick={() => window.history.back()}
                                className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                            <div></div>
                        </div>
                        <div className=" px-6 pb-[50px] md:px-8">

                            <img src="/images/resetpassword.png" width={80} height={80} loading="lazy"
                                className={cn(
                                    "w-[80px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                                    "block"
                                )}
                                alt="" />
                            <div className="font-nebula text-white text-center text-2xl font-normal mt-5">
                                New password created
                            </div>
                            <div>
                                <p className="md:text-sm text-xs font-normal font-jakarta text-white/70 text-center md:my-4 my-2">
                                    You can now use this new password to login
                                </p>
                            </div>
                            <div className="text-center md:mt-0 mt-5">
                                <PrimaryBtn
                                    className="py-3 h-full px-6 w-auto"
                                    onClick={() => navigate("/login")}>
                                    Login
                                </PrimaryBtn>
                            </div>
                        </div>
                    </div>
                </GrBorderBox>
            </div>
        </MainLayout>
    );
}

