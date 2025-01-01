




import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PrimaryBtn } from "./ui/buttons";

type Props = {
  title: string;
  content: React.ReactNode;
  className: string;
};

export function Customtip({ title, content, className }: Props) {
  const [open, setOpen] = useState(false);

  const toggleTooltip = () => {
    setOpen(!open);
  };

  return (
    <Popover>
    <PopoverTrigger>
      <PrimaryBtn
        className={`${className} custom-tooltip-trigger`}
        onClick={toggleTooltip}
      >
        {title}
      </PrimaryBtn>
    </PopoverTrigger>
    <PopoverContent
      className={`custom-tooltip-content ${open ? "open" : ""}`}
      align="start"
      side="top"
    >
      {content}
    </PopoverContent>
  </Popover>
  );
}





