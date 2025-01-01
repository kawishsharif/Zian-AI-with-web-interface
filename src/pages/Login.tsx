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
import { LoginFormSchema, loginFormSchema } from "@/types/forms.types";
import { Spinner } from "@/components/ui/spinner";
import useUiState from "@/components/hooks/useUiState";
import { LoginApiResponse } from "@/types/response.types";
import api from "@/api";
import { AutoHideAlert } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import GrBorderBox from "@/components/ui/gr-border-box";
import Anchor from "@/components/ui/anchor-link";
import { useCookies } from "react-cookie";

export default function LoginPage() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCookie] = useCookies(["authToken"]);
  const navigate = useNavigate();
  const { uiState, setProcessing, setUiData } = useUiState<LoginApiResponse>();

  const handleFormSubmit = async (values: LoginFormSchema) => {
    setProcessing(true);
    const response = await api.user.login(values);

    if (response.success && response.data) {
      setCookie("authToken", response.data.authorization, {
        maxAge: 24 * 60 * 60,
        path: "/",
        sameSite: "lax",
      });
      navigate("/", { replace: true });
      window.location.reload();
    }

    setUiData(response);
    setProcessing(false);
  };

  return (
    <MainLayout secure={false}>
      <div className="flex flex-col items-center justify-center py-20  ">
        <GrBorderBox className="p-[2px] rounded-20 h-full w-full max-w-[500px] shadow-xl ">
          <div
            className={cn(
              "transform overflow-hidden rounded-20 bg-gr-purple-dark",
              "relative"
            )}
          >
            <Form {...form}>
              <form
                method="POST"
                onSubmit={form.handleSubmit(handleFormSubmit)}
              >
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
                  <div className="font-nebula text-white text-center text-2xl font-normal mt-5">
                    Login
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
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              autoComplete="password"
                              {...field}
                            />
                          </FormControl>
                          {fieldState.error && <FormMessage />}
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-between mt-3 lg:mt-0">
                    <a
                      href="/login-with-email"
                      className="font-jakarta md:text-sm text-xs font-normal text-white hover:text-primary"
                    >
                      Login with email
                    </a>
                    <a
                      href="/forgot-password"
                      className="font-jakarta md:text-sm text-xs font-normal text-white hover:text-primary"
                    >
                      Forgot Password
                    </a>
                  </div>
                  {!uiState?.state?.success && uiState?.state?.message && (
                    <AutoHideAlert
                      containerClassName="py-5"
                      title={"Heads Up!"}
                      message={uiState.state.message}
                    />
                  )}
                  <div className="flex justify-between mt-5 md:mb-[30px]">
                    <div className="">
                      <p className="font-jakarta md:text-sm text-xs font-bold text-white">
                        Don't have an account?
                      </p>
                      <a
                        href="/signup"
                        className="font-jakarta md:text-sm text-xs font-bold text-primary underline"
                      >
                        Sign up here
                      </a>
                    </div>
                    <div>
                      <PrimaryBtn
                        type="submit"
                        disabled={uiState?.processing}
                        className="py-3 h-full px-6 md:w-auto"
                      >
                        {uiState?.processing ? <Spinner /> : <span>Login</span>}
                      </PrimaryBtn>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </GrBorderBox>
        <div className="text-white font-jakarta text-xm font-normal mt-5 w-[298px] md:w-[360px] md:text-sm text-center">
          By accessing this page, Zian.ai domain, or using Zian AI service, you
          agree to be bound by the
          <Anchor href="/terms" className="ps-1">
            Terms of Service
          </Anchor>{" "}
          and{" "}
          <Anchor href="/privacy" className="ps-1">
            Privacy Policy
          </Anchor>
        </div>
      </div>
    </MainLayout>
  );
}
