import * as React from "react"
import { cn } from "@/lib/utils"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type InputElProps = {
  className?: string;
  label?: string;
  labelNode?: React.ReactNode
  placeholder?: string;
  id?: string;
  endIcon?: IconDefinition;
  value?: string;
  onChange?: (value: string) => void,
  rows?: number;
  cols?: number;
}

function TextAreaEl({
  label, placeholder = "", labelNode = null,
  id = "", endIcon, value,
  onChange, className,
  rows = 5, cols = 10,
}: InputElProps) {

  return (
    <div className={cn(
      "w-full relative",
      className,
    )}>
      {
        labelNode !== null ?
          labelNode
          :
          <label htmlFor={id} className={cn(
            "text-base leading-7 font-semibold font-jakarta text-white"
          )}>
            {label}
          </label>
      }
      <textarea id={id} placeholder={placeholder}
        rows={rows}
        cols={cols}
        value={value}
        onChange={(e) => onChange?.call(null, e.target.value)}
        className={cn(
          "text-white h-full resize-none min-h-[200px] text-start font-jakarta font-light text-sm leading-6 py-3 px-5",
          "border border-white/10 appearance-none rounded-10 w-full bg-transparent mt-2",
          "focus:bg-th-gray/10 outline-none transition-all placeholder:text-white/70"
        )} />
      {
        endIcon && endIcon !== null &&
        <span className="h-16 absolute z-10 top-0 flex items-center justify-center right-4 text-white text-lg">
          <FontAwesomeIcon icon={endIcon} />
        </span>
      }
    </div>
  )
}


export { TextAreaEl }



