import { Fragment, useState } from "react"
import { PrimaryBtn, SecondaryBtn } from "../ui/buttons"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavigationItem } from "../sidebar"
import GrBorderBox from "../ui/gr-border-box"
import { useToast } from "../ui/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateProfileSchema, updateProfileSchema } from "@/types/forms.types"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import useAuthUserStore from "@/lib/zustand/authUserStore"
import api from "@/api"
import { Spinner } from "../ui/spinner"







export default function EditProfilePopup() {
    const [isOpen, setIsOpen] = useState(false);
    const { authUser, setAuthUser } = useAuthUserStore()
    const { toast } = useToast()
    const form = useForm<UpdateProfileSchema>({
        resolver: zodResolver(updateProfileSchema),
        mode: "all",
        defaultValues: {
            email: authUser?.email,
            phone: authUser?.phone,
            name: authUser?.name,
            website: authUser?.website
        }
    })


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    const handleFormSubmit = async (values: UpdateProfileSchema) => {
        if (!authUser) return;
        const res = await api.user.updateProfile(values, authUser)
        if (res.success && res.data) {
            const profile = await api.user.getProfile()
            setAuthUser(profile);
        }
        toast({
            title: res.success ? "Profile updated successfully." : res.message !== "" ? res.message : "An error occured while processing your request.",
            variant: res.success ? "default" : "destructive"
        })
    }

    return (
        <>
            <NavigationItem
                onClick={openModal} active={isOpen}
                className="my-0.5" text="Edit Profile"
                icon={<FontAwesomeIcon icon={faUser} />} />
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
                                    "w-full max-w-[805px] transform overflow-hidden rounded-20 bg-gr-purple-dark shadow-xl transition-all",
                                    "relative"
                                )}>
                                    <div className="w-full flex flex-row  items-center justify-between px-5 mt-5">
                                        <div></div>
                                        <button type="button" onClick={closeModal}
                                            className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>
                                    <div className="pb-4 max-h-[calc(100vh_-_200px)] overflow-y-auto flex flex-col space-y-6">
                                        {/* content */}
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                                                <div className="mx-7 md:space-y-7 space-y-3">
                                                    <div className="font-jakarta text-white text-[32px] font-bold">
                                                        Edit Profile
                                                    </div>
                                                    <div className="space-y-4  md:text-sm font-normal font-jakarta text-xs">
                                                        <FormField
                                                            control={form.control}
                                                            name="name"
                                                            render={({ field, fieldState }) => (
                                                                <FormItem>
                                                                    <FormLabel>Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input type="text" autoComplete="name" {...field} />
                                                                    </FormControl>
                                                                    {
                                                                        fieldState.error &&
                                                                        <FormMessage>
                                                                            {fieldState.error?.message}
                                                                        </FormMessage>
                                                                    }
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
                                                                        <Input type="email" autoComplete="email" {...field} />
                                                                    </FormControl>
                                                                    {
                                                                        fieldState.error &&
                                                                        <FormMessage>
                                                                            {fieldState.error?.message}
                                                                        </FormMessage>
                                                                    }
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
                                                                        <Input type="number" autoComplete="tel" {...field} />
                                                                    </FormControl>
                                                                    {
                                                                        fieldState.error &&
                                                                        <FormMessage>
                                                                            {fieldState.error?.message}
                                                                        </FormMessage>
                                                                    }
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="website"
                                                            render={({ field, fieldState }) => (
                                                                <FormItem>
                                                                    <FormLabel>Website</FormLabel>
                                                                    <FormControl>
                                                                        <Input autoComplete="website" {...field} />
                                                                    </FormControl>
                                                                    {
                                                                        fieldState.error &&
                                                                        <FormMessage>
                                                                            {fieldState.error?.message}
                                                                        </FormMessage>
                                                                    }
                                                                </FormItem>
                                                            )}
                                                        />
                                                        {/* <ChangePasswordPopup
                                                            trigger={({ open }) => (
                                                                <SecondaryBtn onClick={open} className="border-white/10 py-4 md:text-sm">
                                                                    Update Password
                                                                </SecondaryBtn>
                                                            )}
                                                        /> */}
                                                    </div>
                                                </div>
                                                <GrBorderBox className="p-px md:p-[2px] mt-10 w-full rounded-none ">
                                                    <div className="flex  md:px-[30px] px-7 bg-gr-purple-dark pt-4 justify-end ">
                                                        <div className="flex items-center space-x-[10px]">
                                                            <SecondaryBtn onClick={closeModal} disabled={form.formState.isSubmitting} className="border-white/10 py-4 px-6 md:px-10 md:text-sm">
                                                                Cancel
                                                            </SecondaryBtn>
                                                            <PrimaryBtn type="submit" disabled={form.formState.isSubmitting} className=" h-full w-auto py-3 md:px-12 px-6">
                                                                {
                                                                    form.formState.isSubmitting ?
                                                                        <Spinner />
                                                                        :
                                                                        <span>Save</span>
                                                                }
                                                            </PrimaryBtn>
                                                        </div>
                                                    </div>
                                                </GrBorderBox>
                                            </form>
                                        </Form>
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


