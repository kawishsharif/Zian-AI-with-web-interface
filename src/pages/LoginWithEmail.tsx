import { cn } from "@/lib/utils";
import MainLayout from "../components/layout";
import { Input } from "@/components/ui/input";
import { PrimaryBtn } from "@/components/ui/buttons";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailloginSchema, emailLoginSchema } from "@/types/forms.types";
import { Spinner } from "@/components/ui/spinner";
import useUiState from "@/components/hooks/useUiState";
import { EmailLoginApiResponse } from "@/types/response.types";
import api from "@/api";
import { useNavigate } from "react-router-dom";
import GrBorderBox from "@/components/ui/gr-border-box";
import Anchor from "@/components/ui/anchor-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function LoginWithEmailPage() {
  const form = useForm<EmailloginSchema>({
    resolver: zodResolver(emailLoginSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  const navigate = useNavigate();
  const { uiState, setProcessing, setUiData } =
    useUiState<EmailLoginApiResponse>();
  const [emailSent, setEmailSent] = useState(false);

  const handleFormSubmit = async (data: EmailloginSchema) => {
    setProcessing(true);
    const response = await api.user.emaillogin({
      type: "email",
      email: data.email
    });

    if (response.success) {
      return setEmailSent(true);
    }
    form.setError("email", {
      message: response.message,
    });

    setUiData(response);
    setProcessing(false);
  };

  return (
    <MainLayout secure={false}>
      <div className="flex flex-col items-center justify-center py-36  ">
        {emailSent ? (
          <GrBorderBox className="p-[2px] rounded-20 w-full  max-w-[500px] shadow-xl">
            <div className=" rounded-20 bg-gr-purple-dark">
              <div className="w-full flex flex-row  items- justify-between px-5 pt-5">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <div></div>
              </div>
              <div className=" px-6 pb-[50px] md:px-8">
                <img
                  src="/images/emailsent.png"
                  width={80}
                  height={80}
                  loading="lazy"
                  className={cn(
                    "w-[80px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                    "block"
                  )}
                  alt=""
                />
                <div className="font-nebula text-white text-center text-2xl font-normal mt-5">
                  LOGIN LINK SENT
                </div>
                <div className=" flex  justify-center items-center">
                  <p className="md:text-sm md:max-w-[80%] text-center text-xs font-normal font-jakarta text-white/70  md:my-4 my-2">
                    We have sent you a link to login, Please check your email
                    and login instantly by clicking on that link.{" "}
                  </p>
                </div>
              </div>
            </div>
          </GrBorderBox>
        ) : (
          <>
            <GrBorderBox className="p-[2px] rounded-20 w-full max-w-[500px] shadow-xl ">
              <div
                className={cn(
                  "transform overflow-hidden rounded-20 bg-gr-purple-light",
                  "relative"
                )}
              >
                <Form {...form}>
                  <form
                    method="POST"
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                  >
                    <div className="w-full flex flex-row  items-center justify-between px-4 pt-5 md:px-5">
                      <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </button>
                      <div></div>
                    </div>
                    <div className="px-4 md:px-20 py-[30px] ">
                      {/* content */}

                      <img
                        src="/images/avatar.png"
                        width={100}
                        height={100}
                        loading="lazy"
                        className={cn(
                          "w-[100px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                          "block"
                        )}
                        alt=""
                      />
                      <div className="font-nebula text-white text-center text-2xl font-normal mt-4">
                        LOGIN WITH EMAIL
                      </div>
                      <div className="text-white/70  font-jakarta text-center text-xs mb-5 md:mb-0 md:mt-5 md:text-sm">
                        We will sent you login link to your email
                      </div>
                      <div className="lg:py-5 lg:pt-8 space-y-[10px] md:text-sm text-xs">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  autoComplete="email"
                                  {...field}
                                />
                              </FormControl>
                              {fieldState.error && <FormMessage />}
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-end mt-5 md:mb-[30px]">
                        <div>
                          <PrimaryBtn
                            type="submit"
                            disabled={uiState?.processing}
                            className="py-3 h-[44px] px-6 md:w-auto"
                          >
                            {uiState?.processing ? (
                              <Spinner />
                            ) : (
                              <span>Email Login Link</span>
                            )}
                          </PrimaryBtn>
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </GrBorderBox>
            <div className="text-white font-jakarta text-xm font-normal mt-5 w-[298px] md:w-[360px] md:text-sm text-center">
              By accessing this page, Zian.ai domain, or using Zian AI service,
              you agree to be bound by the
              <Anchor href="/terms" className="ps-1">
                Terms of Service
              </Anchor>{" "}
              and{" "}
              <Anchor href="/privacy" className="ps-1">
                Privacy Policy
              </Anchor>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
