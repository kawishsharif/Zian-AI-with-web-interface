import { cn } from "@/lib/utils";
import MainLayout from "../components/layout";
import { Input } from "@/components/ui/input";
import GrBorderBox from "@/components/ui/gr-border-box";
import { useNavigate } from "react-router";
import { PrimaryBtn } from "@/components/ui/buttons";
import { useForm } from "react-hook-form";
import { NewPasswordSchema, newPasswordSchema } from "@/types/forms.types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import api from "@/api";
import { Spinner } from "@/components/ui/spinner";

export default function NewPasswordPage() {
  const navigate = useNavigate();
  const form = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    mode: "all",
  });
  const { formState } = form;
  const { token } = useParams();
  const [passwordCreated, setPasswordCreated] = useState(false);

  const handleFormSubmit = async (data: NewPasswordSchema) => {
    if (!token) return;
    const res = await api.user.createNewPwd({
      password: data.password,
      token: token,
    });
    if (res.success) {
      return setPasswordCreated(true);
    }
    form.setError("confPassword", {
      message: res.message,
    });
  };

  return (
    <MainLayout secure={false} sidebar={false}>
      <div className="flex flex-col items-center h-screen justify-center py-20">
        {passwordCreated ? (
          <GrBorderBox className="p-[2px] rounded-20 w-full max-w-[500px] shadow-xl">
            <div className=" rounded-20 bg-gr-purple-dark">
              <div className="w-full flex flex-row  items-center justify-between px-5 pt-5">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <div></div>
              </div>
              <div className=" px-6 pb-[50px] md:px-8">
                <img
                  src="/images/resetpassword.png"
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
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </PrimaryBtn>
                </div>
              </div>
            </div>
          </GrBorderBox>
        ) : (
          <GrBorderBox className="p-[2px] rounded-20 w-full max-w-[500px] shadow-xl">
            <div
              className={cn(
                "transform overflow-hidden rounded-20 bg-gr-purple-light",
                "relative"
              )}
            >
              <div className="px-8 pt-[30px] pb-[50px]  rounded-20 bg-gr-purple-dark">
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
                <div className="font-nebula text-white text-center text-2xl font-normal mt-5">
                  CREATE NEW PASSWORD
                </div>
                <Form {...form}>
                  <form
                    method="post"
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                  >
                    <div className="p-3 lg:p-5 lg:pt-8 space-y-4 md:mx-6 md:text-sm text-xs">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            {fieldState.error && <FormMessage />}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confPassword"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Retype New Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            {fieldState.error && <FormMessage />}
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-between md:mx-11 mx-3">
                      <div></div>
                      <div className="">
                        <PrimaryBtn
                          className=" h-full w-full md:w-auto px-6 py-3"
                          type="submit"
                        >
                          {formState.isSubmitting ? (
                            <Spinner className="h-5" />
                          ) : (
                            <span>Submit</span>
                          )}
                        </PrimaryBtn>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </GrBorderBox>
        )}
      </div>
    </MainLayout>
  );
}
