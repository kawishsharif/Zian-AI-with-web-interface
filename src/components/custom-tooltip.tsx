

import React, { useState } from "react";
import { Billingover, BillingoverContent, BillingoverTrigger } from "./ui/Popover2";
import { PrimaryBtn } from "./ui/buttons";

type Props = {
  title: string;
  content: React.ReactNode;
  className: string;
};

export default function CustomTooltip({ title, content, className }: Props) {
  const [open, setOpen] = useState(false);

  const toggleTooltip = () => {
    setOpen(!open);
  };

  return (
    <Billingover>
      <BillingoverTrigger className="w-full md:w-auto    ">
        <PrimaryBtn
          className={`${className} custom-tooltip-trigger md:px-[30px]  py-3  `}
          onClick={toggleTooltip}
        >
          {title}
        </PrimaryBtn>
      </BillingoverTrigger>
      <BillingoverContent
        className={`custom-tooltip-content ${open ? "open" : ""}`}
        align="end"
        side="top"
      >
        {content}
      </BillingoverContent>
    </Billingover>
  );
}


