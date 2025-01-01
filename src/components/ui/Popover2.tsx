import * as React from "react"
import * as BillingoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Billingover = BillingoverPrimitive.Root

const BillingoverTrigger = BillingoverPrimitive.Trigger


const BillingoverContent = React.forwardRef<
  React.ElementRef<typeof BillingoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof BillingoverPrimitive.Content>
>(({ className, children, align = "center", sideOffset = 4, ...props }, ref) => {
  const contentClassName = cn(
    "z-50 p-5 bg-purple-500 rounded-20 ml-3 w-[280px] md:w-[350px] text-Billingover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    className,
  );

  return (
    <BillingoverPrimitive.Portal>
      <BillingoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={contentClassName}
        {...props}
      >
        {children}
        <div className="bg-purple-500 rotate-45 h-6 w-6 absolute right-3 top--1 md:right-5" />


      </BillingoverPrimitive.Content>
    </BillingoverPrimitive.Portal>
  );
});

BillingoverContent.displayName = BillingoverPrimitive.Content.displayName;

export { Billingover, BillingoverTrigger, BillingoverContent };