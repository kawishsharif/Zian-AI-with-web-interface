import { cn } from "@/lib/utils";
import MainLayout from "../components/layout";
import { Input, TagsInputEl } from "@/components/ui/input";
import { PrimaryBtn } from "@/components/ui/buttons";
import Anchor from "@/components/ui/anchor-link";
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
import {
  CustomizeSchema,
  SignUpFormSchema,
  customizeSchema,
  signUpFormSchema,
} from "@/types/forms.types";
import { Spinner } from "@/components/ui/spinner";
import useUiState from "@/components/hooks/useUiState";
import {
  KeywordApiResponse,
  SignUpApiResponse,
  TIndustry,
} from "@/types/response.types";
import api from "@/api";
import { AutoHideAlert } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import GrBorderBox from "@/components/ui/gr-border-box";
import { useState } from "react";
import { useSwrFetcher } from "@/lib/useSwrFetcher";
import apiConfig from "@/config/api.config";
import { FormSelect } from "@/components/ui/select";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { useCookies } from "react-cookie";

export default function SignUpPage() {
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    mode: "all",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCookie] = useCookies(["authToken"]);
  const navigate = useNavigate()

  const { uiState, setUiData } = useUiState<SignUpApiResponse>();
  const [curStep, setCurStep] = useState<"SIGNUP" | "ONBOARDING">("SIGNUP");

  const handleSignUpFormSubmit = async (values: SignUpFormSchema) => {
    const response = await api.user.signup(values);

    if (response.success && response.data) {
      axios.defaults.headers.common["Authorization"] = response.data;
      setCurStep("ONBOARDING");
    }

    setUiData(response);
  };

  return (
    <MainLayout secure={false}>
      <div className="flex flex-col items-center justify-center py-20 ">
        <GrBorderBox className="p-[2px] rounded-20 w-full max-w-[500px] shadow-xl">
          <div
            className={cn(
              "transform overflow-hidden rounded-20 bg-gr-purple-light",
              "relative"
            )}
          >
            {curStep === "ONBOARDING" ? (
              <OnBoardingForm onCompleted={() => {
                if (uiState.state?.data) {
                  setCookie("authToken", uiState.state.data, {
                    maxAge: 24 * 60 * 60,
                    path: "/",
                    sameSite: "lax",
                  });
                  navigate("/");
                  window.location.reload()
                }
              }} />
            ) : (
              <Form {...form}>
                <form
                  name="signup form"
                  onSubmit={form.handleSubmit(handleSignUpFormSubmit)}
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
                    <div className="mt-5 text-2xl font-normal text-center text-white font-nebula">
                      Sign Up
                    </div>
                    <div className="lg:py-5 lg:pt-8 space-y-[10px] md:text-sm text-xs">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                autoComplete="name"
                                {...field}
                              />
                            </FormControl>
                            {fieldState.error && (
                              <FormMessage>
                                {fieldState.error?.message}
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />

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
                            {fieldState.error && (
                              <FormMessage>
                                {fieldState.error?.message}
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                id="phone-number"
                                autoComplete="tel"
                                {...field}
                              />
                            </FormControl>
                            {fieldState.error && (
                              <FormMessage>
                                {fieldState.error?.message}
                              </FormMessage>
                            )}
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
                            {fieldState.error && (
                              <FormMessage>
                                {fieldState.error?.message}
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tos"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <div className="flex items-start gap-3 mt-4">
                              <FormControl className="mt-1">
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(state) => {
                                    const value = state.valueOf();
                                    if (typeof value === "boolean") {
                                      field.onChange(value);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="max-w-[304px]">
                                <p className="text-sm font-jakarta">
                                  By signing up or using Zian AI service, you
                                  agree to be bound by the{" "}
                                  <Anchor href="/terms">
                                    Terms of Service
                                  </Anchor>{" "}
                                  and{" "}
                                  <Anchor href="/privacy">
                                    Privacy Policy
                                  </Anchor>
                                </p>
                              </FormLabel>
                            </div>
                            {fieldState.error && (
                              <FormMessage>
                                {fieldState.error?.message}
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                    {!uiState?.state?.success && uiState?.state?.message && (
                      <AutoHideAlert
                        containerClassName="py-5"
                        title={"Heads Up!"}
                        message={uiState.state.message}
                      />
                    )}
                    <div className="flex justify-between mb-[30px] mt-5">
                      <div className="">
                        <p className="text-xs font-bold text-white font-jakarta md:text-sm">
                          Already have an account?
                        </p>
                        <a
                          href="/login"
                          className="text-xs font-bold underline font-jakarta md:text-sm text-primary"
                        >
                          Login here
                        </a>
                      </div>
                      <div>
                        <PrimaryBtn
                          type="submit"
                          disabled={form.formState.isSubmitting}
                          className="h-12 px-6 py-3 md:w-auto "
                        >
                          {form.formState.isSubmitting ? (
                            <Spinner />
                          ) : (
                            <span>Sign Up</span>
                          )}
                        </PrimaryBtn>
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </GrBorderBox>
      </div>
    </MainLayout>
  );
}


type OnBoardingForm = {
  onCompleted?: () => void;
}
function OnBoardingForm({ onCompleted }: OnBoardingForm) {
  const { uiState, setUiData } = useUiState<KeywordApiResponse>();

  const form = useForm<CustomizeSchema>({
    resolver: zodResolver(customizeSchema),
    mode: "onBlur",
    defaultValues: {
      filter_advertisement: false,
      filter_brand: false,
      filter_negativity: true,
      keywords: [],
    },
  });
  const { data: industryList } = useSwrFetcher<Array<TIndustry>>(
    apiConfig.endpoints.industryList,
    api.other.industryListFetcher
  );

  const [industryOthers, setIndustryOthers] = useState(false);
  const checkIndustryOthers = () => {
    const industryId = form.getValues("industry")?.toLowerCase();
    if (!industryId) return false;
    const industry = industryList?.find((ind) => ind.id === Number(industryId));
    if (!industry) return false;
    setIndustryOthers(industry.name.toLowerCase() === "other");
  };

  const handleOnBoardingFormSubmit = async (values: CustomizeSchema) => {
    const response = await api.user.updateKeyword(values, industryOthers);
    if (response.success && response.data) {
      onCompleted?.()
    }
    setUiData(response);
  };

  return (
    <Form {...form}>
      <form
        name="onboarding form"
        onSubmit={form.handleSubmit(handleOnBoardingFormSubmit)}
      >
        <div className="md:px-8 py-[30px] rounded-20 bg-gr-purple-light">
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
          <div className="mt-5 text-2xl font-normal text-center text-white font-nebula">
            Customize ZIAN
            <br />
            Ai for your business
          </div>
          <div className="p-3 lg:p-5 lg:pt-8 space-y-[10px]">
            <FormField
              control={form.control}
              name="website"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Your Website Link</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  {fieldState.error?.message && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Your Industry</FormLabel>
                  <FormControl>
                    <FormSelect
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("otherIndustry", "");
                        checkIndustryOthers();
                      }}
                      {...field}
                      placeholder="Select Industry"
                      className="w-full"
                      options={[
                        ...(industryList?.map((industry) => ({
                          label: industry.name,
                          value: industry.id.toString(),
                        })) || []),
                      ]}
                    />
                  </FormControl>
                  {fieldState.error?.message && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            {industryOthers && (
              <FormField
                control={form.control}
                name="otherIndustry"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    {fieldState.error && <FormMessage />}
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="keywords"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    Your target SEO search keywords (up to 5)
                  </FormLabel>
                  <FormControl>
                    <TagsInputEl
                      placeholder="Enter keyword and press enter"
                      max={5}
                      className="min-h-[130px]"
                      {...field}
                    />
                  </FormControl>
                  {fieldState.error?.message && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            {!uiState?.state?.success && uiState?.state?.message && (
              <AutoHideAlert
                containerClassName="py-5"
                title={"Heads Up!"}
                message={uiState.state.message}
              />
            )}
            <div className="flex justify-between">
              <div></div>
              <div>
                <PrimaryBtn
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="h-12 px-6 py-3 md:w-auto"
                >
                  {form.formState.isSubmitting ? (
                    <Spinner />
                  ) : (
                    <span>Submit & Complete Sign up</span>
                  )}
                </PrimaryBtn>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
