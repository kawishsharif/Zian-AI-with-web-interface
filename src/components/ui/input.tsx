import * as React from "react";
import { cn } from "@/lib/utils";
import { PrimaryBtnNeon } from "./buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  IconDefinition,
  faCalendar,
  faCircleXmark,
  faEye,
  faEyeSlash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";
import { SelectSingleEventHandler } from "react-day-picker";
import { Button } from "./button";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    return (
      <div className="relative w-full">
        <input
          type={
            type === "password" ? (passwordVisible ? "text" : "password") : type
          }
          className={cn(
            // "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "text-white text-start font-jakarta font-semibold text-sm leading-6 py-3 px-5",
            "border border-white/10 appearance-none rounded-10 w-full bg-transparent mt-2",
            "focus:bg-th-gray/10 outline-none transition-all placeholder:text-white/70",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <FontAwesomeIcon
            className="absolute right-6 top-[45%]"
            icon={passwordVisible ? faEyeSlash : faEye}
            onClick={() => setPasswordVisible(!passwordVisible)}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

type InputElProps = InputProps & {
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  labelNode?: React.ReactNode;
  placeholder?: string;
  id?: string;
  endIcon?: IconDefinition;
  onValueChange?: (value: string) => void;
};

function InputEl({
  label,
  placeholder = "",
  labelNode = null,
  id = "",
  endIcon,
  type = "text",
  value,
  onValueChange,
  className,
}: InputElProps) {
  return (
    <div className={cn("w-full relative", className)}>
      {labelNode !== null ? (
        labelNode
      ) : (
        <label
          htmlFor={id}
          className={cn("text-sm font-semibold font-jakarta text-white")}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        className={cn(
          "text-white text-start font-jakarta font-semibold text-sm leading-6 py-3 px-5",
          "border border-white/10 appearance-none rounded-10 w-full bg-transparent mt-2",
          "focus:bg-th-gray/10 outline-none transition-all placeholder:text-white/70"
        )}
      />
      {endIcon && endIcon !== null && (
        <span className="h-16 absolute z-10 top-0 flex items-center justify-center right-4 text-white text-lg">
          <FontAwesomeIcon icon={endIcon} />
        </span>
      )}
    </div>
  );
}

type InputElDateProps = {
  className?: string;
};

function InputElDate({ className }: InputElDateProps) {
  const [date, setDate] = React.useState(new Date());

  const onChange: SelectSingleEventHandler = (_, selectedDay) => {
    setDate(selectedDay);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn("outline-none bg-transparent w-full", className)}
        >
          <InputEl
            type="button"
            value={date.toDateString()}
            placeholder="Choose date"
            endIcon={faCalendar}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto z-50 p-0 border-primary/30 text-white bg-gr-purple-dark backdrop-blur"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
          // disabled={(d) =>
          //   d > new Date() || date < new Date("1900-01-01")
          // }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
type InputStyleProps = InputProps & {
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  labelNode?: React.ReactNode;
  placeholder?: string;
  id?: string;
  endIcon?: IconDefinition;
  onValueChange?: (value: string) => void;
};

function InputTone({
  label,
  placeholder = "",
  labelNode = null,
  id = "",
  endIcon,
  type = "text",
  value,
  onChange,
  className,
}: InputStyleProps) {
  return (
    <div className={cn("w-full h-[70px] bg-input rounded-10 ", className)}>
      {labelNode !== null ? (
        labelNode
      ) : (
        <label
          htmlFor={id}
          className={cn("text-sm font-semibold font-jakarta text-white")}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "text-white text-start font-jakarta font-semibold text-sm leading-6 py-3 px-5",
          "border border-white/40 appearance-none rounded-10 w-full bg-transparent h-[60px]",
          "focus:bg-th-gray/10 outline-none transition-all placeholder:text-white/50"
        )}
      />
      {endIcon && endIcon !== null && (
        <span className="h-16 absolute z-10 top-0 flex items-center justify-center right-4 text-white text-lg">
          <FontAwesomeIcon icon={endIcon} />
        </span>
      )}
    </div>
  );
}

type InputElWChipsProps = {
  label?: string;
  labelNode?: React.ReactNode;
  placeholder?: string;
  id?: string;
  max?: number;
  value?: Array<string>;
  onChange?: (value: string[]) => void;
  className?: string;
};

function InputElWChips({
  label,
  placeholder = "",
  labelNode = null,
  id = "",
}: InputElWChipsProps) {
  const [chips, setChips] = React.useState(["dad", "dada"]);
  const [inputVal, setInputVal] = React.useState("");

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      setChips([...chips, inputVal]);
      setInputVal("");
    }
  };

  const removeChip = (chip: string) => {
    setChips(chips.filter((ch) => ch !== chip));
  };

  return (
    <div className="w-full">
      {labelNode !== null ? (
        labelNode
      ) : (
        <label
          htmlFor={id}
          className={cn(
            "text-base leading-7 block w-full font-semibold font-jakarta text-white"
          )}
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "grid sm:grid-cols-2 lg:grid-cols-3 px-2 py-2 gap-2 min-h-[56px]",
          "border border-white/10 rounded-10 w-full bg-transparent mt-2",
          "focus-within:bg-th-gray/10"
        )}
      >
        {chips.map((chip) => (
          <PrimaryBtnNeon
            key={chip}
            className="text-[15px] font-medium w-full cursor-default"
          >
            <FontAwesomeIcon icon={faTwitter} />
            <span className="block max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
              {chip}
            </span>
            <span
              onClick={() => removeChip(chip)}
              className="block z-[1] ms-auto w-auto h-full aspect-square cursor-pointer text-base "
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </span>
          </PrimaryBtnNeon>
        ))}
        <input
          type="text"
          id={id}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          className={cn(
            "text-white h-10 text-start bg-transparent font-jakarta font-normal text-sm leading-6 w-full px-2",
            "outline-none transition-all placeholder:text-white/70"
          )}
        />
      </div>
    </div>
  );
}

const TagsInputEl = React.forwardRef<HTMLInputElement, InputElWChipsProps>(
  ({
    label,
    placeholder = "",
    labelNode = null,
    id = "tags-input",
    className,
    max,
    value,
    onChange,
  }) => {
    const [chips, setChips] = React.useState<string[]>(value || []);
    const [inputVal, setInputVal] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (
      e
    ) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (inputVal === "") return;
        if (max && chips.length >= max) return;
        setChips([...chips, inputVal]);
        setInputVal("");
        inputRef.current?.focus()
      }
    };
    const handleAddChip = (e: any) => {
      e.preventDefault();
      if (inputVal === "") return;
      if (max && chips.length >= max) return;
      setChips([...chips, inputVal]);
      setInputVal("");
      inputRef.current?.focus()
    };

    React.useEffect(() => {
      onChange?.(chips);
    }, [chips, onChange]);

    const removeChip = (chip: string) => {
      setChips(chips.filter((ch) => ch !== chip));
    };

    return (
      <div className="w-full">
        {labelNode !== null ? (
          labelNode
        ) : (
          <label
            htmlFor={id}
            className={cn(
              "text-base leading-7 block w-full font-semibold font-jakarta text-white"
            )}
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            "flex flex-wrap px-2 py-2 gap-2 min-h-[56px]",
            "border border-white/10 rounded-10 w-full bg-transparent mt-2",
            "focus-within:bg-th-gray/10",
            className
          )}
        >
          {chips?.map((chip) => (
            <PrimaryBtnNeon
              key={chip}
              className="text-[15px] font-medium w-auto cursor-default"
            >
              <span className="block max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                {chip}
              </span>
              <span
                onClick={() => removeChip(chip)}
                className="block z-[1] ms-auto w-auto h-full aspect-square cursor-pointer text-base "
              >
                <FontAwesomeIcon icon={faCircleXmark} />
              </span>
            </PrimaryBtnNeon>
          ))}
          {(!max || chips?.length < max) && (
            <div className="inline-flex items-center h-10 w-[200px]">
              <input
                type="text"
                id={id}
                ref={inputRef}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={placeholder}
                autoComplete="off"
                className={cn(
                  "text-white h-10 text-start bg-transparent font-jakarta font-normal flex-1 text-sm leading-6 max-w-full px-2",
                  "outline-none transition-all placeholder:text-white/70"
                )}
              />
              <Button
                variant="ghost"
                className="hover:bg-white/10 rounded-full w-auto h-8 aspect-square lg:hidden"
                onClick={handleAddChip}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

TagsInputEl.displayName = "TagsInputEl";

export { Input, InputEl, InputElWChips, InputElDate, TagsInputEl, InputTone };
