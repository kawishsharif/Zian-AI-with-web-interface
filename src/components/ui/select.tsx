import * as React from "react"
import { CheckIcon } from "@radix-ui/react-icons"
import * as SelectPrimitive from "@radix-ui/react-select"

import { cn } from "@/lib/utils"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spinner } from "./spinner"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "h-[56px] text-white/70 text-start font-jakarta font-semibold text-sm leading-6 py-3 px-5",
        "border border-white/10 bg-transparent rounded-10 w-full",
        "flex items-center justify-between",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-xl bg-th-gray/5 border border-white/10 backdrop-blur-3xl text-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        // "max-h-80 overflow-y-auto",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-lg py-3 pl-2 pr-8 text-base font-normal transition-all focus:bg-white/10 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-slate-100", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName





// export type SelectOption = {
//   label: string;
//   value: string;
//   disabled?: boolean;
// }

// type FormSelectProps = SelectPrimitive.SelectProps & {
//   placeholder?: string;
//   className?: string;
//   options?: Array<SelectOption>;
// }

// const FormSelect = React.forwardRef<
//   React.ElementRef<typeof SelectPrimitive.Content>,
//   FormSelectProps
// >(({ placeholder, className, options, ...selectProps }, ref) => {
//   return (
//     <Select {...selectProps}>
//       <SelectTrigger className={cn(className)}>
//         <SelectValue placeholder={placeholder} />
//       </SelectTrigger>
//       <SelectContent className="p-0">
//         {
//           !options ?
//             <div className="w-full h-16 py-4 flex items-center justify-center">
//               <Spinner />
//             </div>
//             :
//             <div className="mt-2 max-h-60 overflow-y-auto">
//               {
//                 options?.map((option) => (
//                   <SelectItem
//                     key={option.value}
//                     disabled={option.disabled}
//                     value={option.value}>
//                     {option.label}
//                   </SelectItem>
//                 ))
//               }
//             </div>
//         }
//       </SelectContent>
//     </Select>
//   )
// })

// FormSelect.displayName = "FormSelect"



export default function useComponentVisible(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] = React.useState(initialIsVisible);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}


export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
}

type FormSelectProps = SelectPrimitive.SelectProps & {
  placeholder?: string;
  className?: string;
  options?: Array<SelectOption>;
}

const FormSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  FormSelectProps
>(({ placeholder, className, options, onValueChange, value }) => {
  const [selectedOpt, setSelectedOpt] = React.useState(options?.find((opt) => opt.value === value))
  const { isComponentVisible, ref } = useComponentVisible(false)
  const [open, setOpen] = React.useState(isComponentVisible ?? false);
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    setSelectedOpt(options?.find((opt) => opt.value === value))
  }, [value, options])



  React.useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target === triggerRef.current) return;
      setOpen((prevValue) => ((prevValue === true) ? false : prevValue));
    })
  }, [])


  const onSelectedOptChange = (opt: SelectOption) => {
    setSelectedOpt(opt);
    onValueChange?.(opt.value)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button ref={triggerRef} id="select-trigger" type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "h-[56px] text-white/70 text-start font-jakarta font-semibold text-sm leading-6 py-3 px-5",
          "border border-white/10 bg-transparent rounded-10 w-full",
          "flex items-center justify-between",
          className
        )}
      >
        <span>{(selectedOpt ? selectedOpt.label : (options ? placeholder : ""))}</span>
        <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4 opacity-50" />
      </button>
      {
        open &&
        <div ref={ref} className="p-0 w-full absolute top-full bg-gr-purple-dark rounded-md shadow-md z-50 ">
          {
            options && options.length > 0 ?
              <div className="mt-2 max-h-60 overflow-y-auto w-full">
                {
                  options?.map((option) => (
                    <div
                      onClick={() => onSelectedOptChange(option)}
                      key={option.value} className={cn(
                        "relative flex w-full cursor-pointer select-none items-center rounded-lg py-3 pl-2 pr-8 text-base font-normal hover:bg-white/20 transition-all focus:bg-white/10 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                        selectedOpt?.value === option.value && "bg-white/20",
                        className
                      )}>
                      {option.label}
                    </div>
                  ))
                }
              </div>
              :
              <div className="w-full h-20 py-4 flex items-center justify-center">
                <Spinner />
              </div>
          }
        </div>
      }
    </div>
  )
})

FormSelect.displayName = "FormSelect"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  FormSelect
}