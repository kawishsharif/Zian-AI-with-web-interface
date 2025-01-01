import { Fragment, useState } from "react";
import { PrimaryBtn, SecondaryBtn } from "../ui/buttons";
import { Dialog, Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { Input, InputTone, TagsInputEl } from "../ui/input";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavigationItem } from "../sidebar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import GrBorderBox from "../ui/gr-border-box";
import { useSwrFetcher } from "@/lib/useSwrFetcher";
import { TIndustry } from "@/types/response.types";
import apiConfig from "@/config/api.config";
import api from "@/api";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { CustomizeSchema, customizeSchema } from "@/types/forms.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSelect } from "../ui/select";
import { Spinner } from "../ui/spinner";
import { useToast } from "../ui/use-toast";
import useAuthUserStore from "@/lib/zustand/authUserStore";
import { Customtip } from "../customtip";

export default function CustomizePopup() {
    const { authUser, setAuthUser } = useAuthUserStore();
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();
    const form = useForm<CustomizeSchema>({
        resolver: zodResolver(customizeSchema),
        mode: "onChange",
        defaultValues: {
            filter_brand: authUser?.filter.brand ?? true,
            filter_negativity: authUser?.filter?.negativity ?? true,
            filter_advertisement: authUser?.filter?.advertisement ?? false,
            industry: authUser?.keyword?.industry?.id?.toString(),
            otherIndustry: authUser?.keyword?.industry?.industry
                ?.toLowerCase()
                ?.includes("other")
                ? authUser?.keyword?.industry?.name
                : "",
            keywords: authUser?.keyword?.keyword?.split(",") ?? [],
            tone: authUser?.tone,
            blacklist: authUser?.blacklist?.split(",") ?? []
        },
    });
    const { data: industryList } = useSwrFetcher<Array<TIndustry>>(
        apiConfig.endpoints.industryList,
        api.other.industryListFetcher
    );

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const [industryOthers, setIndustryOthers] = useState(
        authUser?.keyword?.industry?.industry?.toLowerCase()?.includes("other") ??
        false
    );
    const checkIndustryOthers = () => {
        const industryId = form.getValues("industry")?.toLowerCase();
        if (!industryId) return false;
        const industry = industryList?.find((ind) => ind.id === Number(industryId));
        if (!industry) return false;
        setIndustryOthers(industry.name.toLowerCase() === "other");
    };
    const handleFormSubmit = async (values: CustomizeSchema) => {
        if (!authUser) return;
        const res = await api.user.updateKeyword(
            {
                ...values,
            },
            industryOthers
        );
        if (res.success && res.data) {
            const profile = await api.user.getProfile();
            setAuthUser(profile);
        }
        toast({
            title: res.success
                ? "Information updated successfully."
                : "An error occured while processing your request.",
            variant: res.success ? "default" : "destructive",
        });
    };

    return (
        <>
            <NavigationItem
                onClick={openModal}
                active={isOpen}
                className="my-0.5"
                text="Customize"
                icon={<FontAwesomeIcon icon={faPen} />}
            />

            <Transition appear show={isOpen} static as={Fragment}>
                <Dialog
                    as="div"
                    onClose={() => setIsOpen(true)}
                    static
                    className="relative z-50"
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur " />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className={cn(
                                        "w-full max-w-[805px] transform overflow-hidden rounded-20  bg-gr-purple-dark shadow-xl transition-all",
                                        "relative"
                                    )}
                                >
                                    <Form {...form}>
                                        <form
                                            method="POST"
                                            onSubmit={form.handleSubmit(handleFormSubmit)}
                                        >
                                            <div className="flex flex-row items-center justify-between w-full px-5 mt-5 ">
                                                <div></div>
                                                <button
                                                    type="button"
                                                    onClick={closeModal}
                                                    className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer"
                                                >
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </button>
                                            </div>
                                            <div className="max-h-[calc(100vh_-_200px)] overflow-y-auto flex flex-col space-y-32 pb-4 md:pb-[54px]">
                                                {/* content */}
                                                {/* px-7  */}
                                                <div className="pb-4 space-y-5   md:space-y-7">
                                                    <div className="font-jakarta text-white text-[32px] font-bold px-7 ">
                                                        Customize
                                                    </div>
                                                    <FormField
                                                        control={form.control}
                                                        name="industry"
                                                        render={({ field, fieldState }) => (
                                                            <FormItem className="px-7 ">
                                                                <FormLabel>Industry</FormLabel>
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
                                                                        options={industryList?.map((industry) => ({
                                                                            label: industry.name,
                                                                            value: industry.id.toString(),
                                                                        }))}
                                                                    />
                                                                </FormControl>
                                                                {fieldState.error?.message && (
                                                                    <FormMessage>
                                                                        {fieldState.error.message}
                                                                    </FormMessage>
                                                                )}
                                                            </FormItem>
                                                        )}
                                                    />
                                                    {industryOthers && (
                                                        <FormField
                                                            control={form.control}
                                                            name="otherIndustry"
                                                            render={({ field, fieldState }) => (
                                                                <FormItem className="px-7 ">
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
                                                            <FormItem className="px-7 ">
                                                                <FormLabel>Target SEO Keywords</FormLabel>
                                                                <FormControl>
                                                                    <TagsInputEl
                                                                        className="min-h-[106px]"
                                                                        placeholder="Add keyword"
                                                                        max={5}
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                {fieldState.error?.message && (
                                                                    <FormMessage>
                                                                        {fieldState.error.message}
                                                                    </FormMessage>
                                                                )}
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <div className="px-7">
                                                        <h2 className="text-sm md:text-base  font-bold font-jakarta text-white">
                                                            Blacklisted Topics
                                                        </h2>
                                                        <p className="text-sm text-white/80 font-jakarta font-normal">
                                                            Enter blacklisted keywords that if found in a
                                                            headline, will reject that entire article from
                                                            being published. For example: "School" as a
                                                            keyword will reject any topics that mention
                                                            "School" in any sentence structure. Careful you
                                                            don't make it too limited or you'll get nothing!
                                                        </p>
                                                        <FormField
                                                            control={form.control}
                                                            name="blacklist"
                                                            render={({ field, fieldState }) => (
                                                                <FormItem>
                                                                    <FormLabel></FormLabel>
                                                                    <FormControl>
                                                                        <TagsInputEl
                                                                            className="min-h-[106px]"
                                                                            placeholder="Add keyword"
                                                                            max={10000}
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    {fieldState.error?.message && (
                                                                        <FormMessage>
                                                                            {fieldState.error.message}
                                                                        </FormMessage>
                                                                    )}
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                    <FormField
                                                        control={form.control}
                                                        name="filter_negativity"
                                                        render={({ field, fieldState }) => (
                                                            <FormItem className="px-7 ">
                                                                <div className="flex items-center gap-4">
                                                                    <Switch
                                                                        id="customize-filter-negativity"
                                                                        ref={field.ref}
                                                                        name="customize-filter-negativity"
                                                                        onCheckedChange={field.onChange}
                                                                        checked={field.value}
                                                                    />
                                                                    <Label
                                                                        htmlFor="customize-filter-negativity"
                                                                        className="text-sm font-bold text-white font-jakarta"
                                                                    >
                                                                        Filter out negative or criminal topics or
                                                                        news -{" "}
                                                                        <span className="font-normal text-white/70">
                                                                            {field.value ? "Yes" : "No"}
                                                                        </span>
                                                                    </Label>
                                                                </div>
                                                                {fieldState.error?.message && (
                                                                    <FormMessage>
                                                                        {fieldState.error.message}
                                                                    </FormMessage>
                                                                )}
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="filter_advertisement"
                                                        render={({ field, fieldState }) => (
                                                            <FormItem className="px-7 ">
                                                                <div className="flex items-center gap-4">
                                                                    <Switch
                                                                        id="customize-filter-advertisement"
                                                                        ref={field.ref}
                                                                        name="customize-filter-advertisement"
                                                                        onCheckedChange={field.onChange}
                                                                        checked={field.value}
                                                                    />

                                                                    <Label
                                                                        htmlFor="customize-filter-advertisement"
                                                                        className="text-sm font-bold text-white font-jakarta"
                                                                    >
                                                                        Filter out promotions or sales from 3rd
                                                                        parties or other businesses -{" "}
                                                                        <span className="font-normal text-white/70">
                                                                            {field.value ? "Yes" : "No"}
                                                                        </span>
                                                                    </Label>
                                                                </div>
                                                                {fieldState.error?.message && (
                                                                    <FormMessage>
                                                                        {fieldState.error.message}
                                                                    </FormMessage>
                                                                )}
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="filter_brand"
                                                        render={({ field, fieldState }) => (
                                                            <FormItem className="px-7 ">
                                                                <div className="flex items-center gap-4">
                                                                    <Switch
                                                                        id="customize-filter-brand"
                                                                        ref={field.ref}
                                                                        name="customize-filter-brand"
                                                                        onCheckedChange={field.onChange}
                                                                        checked={field.value}
                                                                    />
                                                                    <Label
                                                                        htmlFor="customize-filter-brand"
                                                                        className="text-sm font-bold text-white font-jakarta"
                                                                    >
                                                                        Filter out all topics about 3rd parties,
                                                                        specific places or specific people (not
                                                                        often recommend)-
                                                                        <span className="font-normal text-white/70">
                                                                            {field.value ? "Yes" : "No"}
                                                                        </span>
                                                                    </Label>
                                                                </div>
                                                                {fieldState.error?.message && (
                                                                    <FormMessage>
                                                                        {fieldState.error.message}
                                                                    </FormMessage>
                                                                )}
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <div className="mt-[4px]">
                                                        <div className="px-7">
                                                            <hr className="border border-white/10" />
                                                            <h2 className="text-white font-jakarta text-sm md:text-base font-bold mt-7">
                                                                Tone / Style / Language:
                                                            </h2>
                                                            <p className="text-sm font-normal font-jakarta text-white/80 mt-[10px]">
                                                                Enter the style you would like your articles to be
                                                                written in. Do not enter if you wish to keep as
                                                                default: "news style and informative helpful",
                                                                which is safest.
                                                                <br />
                                                                <br className="md:block hidden" />
                                                                Your entry should fit into this blank for proper
                                                                instruction to Zian: "Write a ____ toned article."
                                                                Be careful if you edit this as poor instructions
                                                                will generate poor results, which is your
                                                                responsibility!
                                                            </p>
                                                        </div>
                                                        <div className="mt-5 md:h-[60px] flex flex-col py-[11px] md:py-0  md:flex-row  md:items-center   gap-[11px] bg-white/10 px-7">
                                                            <p className="text-sm text-white font-bold   ">
                                                                “Write a
                                                            </p>
                                                            <FormField
                                                                control={form.control}
                                                                name="tone"
                                                                render={({ field, fieldState }) => (
                                                                    <FormItem className="px-7 ">
                                                                        <div className="flex items-center gap-4">
                                                                            <InputTone
                                                                                className="h-full md:w-[418px] w-full"
                                                                                placeholder="Enter here"
                                                                                {...field}
                                                                            />
                                                                        </div>
                                                                        {fieldState.error?.message && (
                                                                            <FormMessage />
                                                                        )}
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <p className="text-sm text-white font-bold   ">
                                                                toned article.”
                                                            </p>
                                                        </div>
                                                        <div className="mt-[10px] px-7">
                                                            <p className="text-white/80 text-xs font-jakarta font-normal">
                                                                Example 1:
                                                                <span className="italic ">
                                                                    Write a... "casual style with happy vibrant"
                                                                    toned article.
                                                                </span>
                                                            </p>
                                                            <p className="text-white/80 text-xs font-jakarta font-normal">
                                                                Example 2:
                                                                <span className="italic ">
                                                                    Write a... "American English with quirky
                                                                    style & some jokes" toned article.
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="px-7">
                                                        <Customtip
                                                            title="Increase Article Volume"
                                                            className="h-12 mt-[62px]"
                                                            content={
                                                                <>
                                                                    To increase articles volume, please email{" "}
                                                                    <a
                                                                        href="mailto:hello@zian.ai"
                                                                        className="underline"
                                                                    >
                                                                        hello@zian.ai
                                                                    </a>
                                                                </>
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <GrBorderBox className="rounded-none">
                                                <div className="flex justify-end bg-gr-purple-dark space-x-[10px] py-2 md:py-5 px-7">
                                                    <SecondaryBtn
                                                        onClick={closeModal}
                                                        className="py-3 text-sm"
                                                    >
                                                        Cancel
                                                    </SecondaryBtn>
                                                    <PrimaryBtn
                                                        type="submit"
                                                        className="w-auto h-12 px-12 py-3 "
                                                    >
                                                        {form.formState.isSubmitting ? (
                                                            <Spinner />
                                                        ) : (
                                                            <span>Save</span>
                                                        )}
                                                    </PrimaryBtn>
                                                </div>
                                            </GrBorderBox>
                                        </form>
                                    </Form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
