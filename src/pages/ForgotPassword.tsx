import { cn } from "@/lib/utils";
import MainLayout from "../components/layout";
import { Input } from "@/components/ui/input";
import GrBorderBox from "@/components/ui/gr-border-box";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryBtn } from "@/components/ui/buttons";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ForgotPasswordSchema, forgotPasswordSchema } from "@/types/forms.types";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/api";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";


export default function ForgotPasswordPage() {
    const form = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "all"
    });
    const [passwordReset, setPasswordReset] = useState(false);
    const [resending, setResending] = useState(false);
    const { formState } = form

    const handleFormSubmit = async (data: ForgotPasswordSchema) => {
        const res = await api.user.forgotPassword(data);
        if (res.success) {
            return setPasswordReset(true)
        }
        form.setError("email", {
            message: res.message
        })
    }


    const resendEmail = async () => {
        setResending(true)
        await api.user.forgotPassword({ email: form.getValues("email") });
        setResending(false)
    }


    return (
        <MainLayout secure={false}>
            <div className="flex flex-col items-center  justify-center py-20  overflow-auto">
                {
                    passwordReset ?
                        <GrBorderBox className="p-[2px] rounded-20 h-full w-full max-w-[500px] shadow-xl">
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
                                            We have sent the instructions to your email. Please follow those instructions to reset your password.
                                            <br /><br />
                                            Didn't received email?
                                            <button type="button"
                                                onClick={resendEmail}
                                                className="bg-transparent ml-2 border-none text-primary underline">
                                                {resending ? <Spinner className="h-3" /> : <span>Resend</span>}
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </GrBorderBox>
                        :
                        <GrBorderBox className="p-[2px] rounded-20 h-full w-full max-w-[500px] shadow-xl">
                            <div className={cn(
                                "transform overflow-hidden rounded-20 bg-gr-purple-light",
                                "relative"
                            )}>
                                <div className="w-full flex flex-row  items-center justify-between px-5 pt-5 ">
                                    <button type="button" onClick={() => window.history.back()}
                                        className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                    </button>
                                    <div></div>
                                </div>
                                <div className="px-5 pb-10 md:px-8 md:pb-[50px] ">
                                    {/* content */}
                                    <img src="/images/avatar.png" width={100} height={100} loading="lazy"
                                        className={cn(
                                            "w-[100px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                                            "block"
                                        )}
                                        alt="" />
                                    <div className="font-nebula text-white text-center text-2xl font-normal mt-5">
                                        Forgot Password?
                                    </div>
                                    <div>
                                        <p className="md:text-sm text-xs font-normal font-jakarta text-white/70 text-center mt-4">
                                            We got this. Please enter your registered email below and we will send instructions to reset your password.
                                        </p>
                                    </div>
                                    <Form {...form}>
                                        <form method="post" onSubmit={form.handleSubmit(handleFormSubmit)}>
                                            <div className="lg:p-5 lg:pt-8 space-y-4 md:text-sm text-xs pt-4 lg:px-0 px-1">
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <Input type="email" autoComplete="email" {...field} />
                                                            </FormControl>
                                                            {fieldState.error && <FormMessage />}
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="flex justify-between md:px-0 px-1 lg:pt-0 pt-5">
                                                <div></div>
                                                <div>
                                                    <PrimaryBtn type="submit" className=" h-full w-full md:w-auto px-8 py-3" >
                                                        {
                                                            formState.isSubmitting ?
                                                                <Spinner className="h-5" />
                                                                :
                                                                <span>Submit</span>
                                                        }
                                                    </PrimaryBtn>
                                                </div>
                                            </div>
                                        </form>
                                    </Form>
                                </div>
                            </div>
                        </GrBorderBox>
                }
            </div>
        </MainLayout>
    );
}

