import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { ReactNode, useEffect, useState } from "react"
import { cn } from "../../lib/utils"



export type Option = {
    value: string;
    text: string;
    disabled?: boolean;
}



type Props = {
    label?: string;
    value?: Option;
    onValueChange?: (value: Option) => void;
    className?: string;
    optClassName?: string;
    optContainerClassName?: string;
    containerClassName?: string;
    options: Option[];
    labelNode?: ReactNode;
    showSearch?: boolean;
}



export default function SelectEl({
    label, options, className = "",
    containerClassName, optClassName,
    optContainerClassName,
    value, onValueChange,
    labelNode
}: Props) {
    const [selectedOpt, setSelectedOpt] = useState(value ?? options[0])
    const onSelectedOptChange = (opt: Option) => {
        setSelectedOpt(opt);
        onValueChange?.call(null, opt);
    }
    return (
        <Listbox value={selectedOpt} onChange={onSelectedOptChange}>
            <div className={cn("relative w-full", containerClassName)}>
                {
                    labelNode !== null ?
                        labelNode
                        :
                        (label && label !== "") &&
                        <Listbox.Label className={cn(
                            "text-base leading-7 font-semibold font-jakarta text-white"
                        )}>
                            {label}
                        </Listbox.Label>
                }
                <Listbox.Button
                    className={cn(
                        "text-white/70 text-start font-jakarta font-semibold text-sm leading-6 py-3 px-5",
                        "border border-white/10 bg-input rounded-10 w-full",
                        "inline-flex items-center justify-between gap-3",
                        "data-[headlessui-state=open]:bg-th-gray/10",
                        (label && label !== "") || (labelNode && labelNode !== null) && "mt-2",
                        className
                    )}>
                    {selectedOpt.text}
                    <FontAwesomeIcon icon={faChevronDown} />
                </Listbox.Button>
                {/* <div className="relative w-max"> */}
                <Listbox.Options className={cn(
                    "absolute mt-2 z-[100] top-full left-0 w-full bg-th-gray/10 backdrop-blur-xl rounded-10 max-h-[250px] overflow-y-auto outline-none",
                    "border-2 border-th-gray/20",
                    optContainerClassName
                )} >
                    {
                        options.map((opt) => (
                            <Listbox.Option
                                key={opt.value}
                                value={opt}
                                disabled={opt.disabled}
                                className={cn(
                                    "text-white text-start font-jakarta font-medium text-sm leading-6 py-4 px-5",
                                    "border-b last:border-none border-white/10 w-full cursor-pointer",
                                    "data-[headlessui-state=active]:bg-gr-purple data-[headlessui-state=disabled]:bg-gray-600/50",
                                    selectedOpt.value === opt.value ? "bg-gr-purple" : "bg-transparent [&:not(:data-[headlessui-state=disabled])]:hover:bg-gr-purple",
                                    optClassName
                                )}
                            >
                                {opt.text}
                            </Listbox.Option>
                        ))
                    }
                </Listbox.Options>
                {/* </div> */}
            </div>
        </Listbox>
    )
}






import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Listbox } from "@headlessui/react"

export function SelectElNew({
    label, options, className = "",
    labelNode, value, onValueChange,
    showSearch = false
}: Props) {
    const [open, setOpen] = React.useState(false)
    const [selectedOpt, setSelectOpt] = React.useState<string>(value?.value ?? options[0].value)

    useEffect(() => {
        onValueChange?.(options.find((opt) => opt.value === selectedOpt) ?? options[0])
    }, [onValueChange, options, selectedOpt])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <div className={cn(
                "w-full relative",
                className
            )}>
                {
                    labelNode !== null ?
                        labelNode
                        :
                        <label className={cn(
                            "text-base leading-7 font-semibold font-jakarta text-white"
                        )}>
                            {label}
                        </label>
                }
                <PopoverTrigger asChild>

                    <button onClick={() => setOpen(true)}
                        className={cn(
                            "text-white/70 text-start font-jakarta font-semibold text-sm leading-6 py-3 px-5",
                            "border border-white/10 bg-input rounded-10 w-full",
                            "inline-flex items-center justify-between gap-3",
                            "data-[headlessui-state=open]:bg-th-gray/10",
                            (label && label !== "") || (labelNode && labelNode !== null) && "mt-2",
                        )}
                    >
                        {
                            selectedOpt && selectedOpt !== ""
                                ? options.find((opt) => opt.value === selectedOpt)?.text
                                : "Select..."
                        }
                        <FontAwesomeIcon icon={(open ? faChevronUp : faChevronDown)} className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </button>
                </PopoverTrigger>
            </div>
            <PopoverContent className="w-full min-w-[150px] z-50 p-0 border-primary/30 text-white bg-gr-purple-dark backdrop-blur">
                <Command>
                    {
                        showSearch &&
                        <CommandInput placeholder="Search..." />
                    }
                    <CommandEmpty>No options found.</CommandEmpty>
                    <CommandGroup>
                        {
                            options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(newVal) => {
                                        setSelectOpt(newVal)
                                        setOpen(false)
                                    }}
                                    className={cn(
                                        "cursor-pointer w-full hover:bg-white/10",
                                        selectedOpt === option.value && "bg-white/10"
                                    )}
                                >
                                    {/* <FontAwesomeIcon icon={faCheck}
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedOpt === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    /> */}
                                    {option.text}
                                </CommandItem>
                            ))
                        }
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}