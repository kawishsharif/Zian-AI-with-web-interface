import React, { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthUserStore from "@/lib/zustand/authUserStore";
import { useToast } from "./use-toast";


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    children: ReactNode;
    filled?: boolean;
    active?: boolean;
    onClick?: () => void
}


export function CopyAPIKeyButton() {
    const { authUser } = useAuthUserStore()
    const { toast } = useToast();

    const copyAPIKey = async () => {
        if (!authUser?.authorization) return;
        await navigator.clipboard.writeText(authUser?.authorization);
        toast({
            title: "API key copied to clipboard.",
            variant: "default",
            duration: 2500
        })
    }

    return (
        <button
            type="button"
            onClick={copyAPIKey}
            className="absolute text-sm font-semibold -translate-y-1/2 font-jakarta top-1/2 right-5"
        >
            <FontAwesomeIcon className="pr-2" icon={faCopy} /> Copy
        </button>
    )
}
export function SecondaryBtn({ className, children, filled = true, onClick }: ButtonProps) {
    return (
        <button type="button" onClick={onClick} className={cn(
            "border border-white/5 transition-all duration-300 hover:bg-white/20 rounded-lg py-[8px] px-4 outline-none",
            filled && "bg-white/[0.06]",
            "inline-flex items-center gap-2 text-white text-xs font-semibold justify-center",
            className
        )}>
            {children}
        </button>
    )
}




export const PrimaryBtn = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, onClick, ...props }, ref) => {
    return (
        <button type="button" onClick={onClick} className={cn(
            "primary-btn bg-primary shadow-primary-btn hover:shadow-primary-btn-lg outline-none",
            "transition-all duration-300 rounded-lg py-[8px] px-4",
            "inline-flex items-center gap-2 text-white text-sm font-semibold justify-center",
            "disabled:opacity-70 focus-visible:!outline-none",
            className
        )} {...props} ref={ref}>
            {children}
        </button>
    )
})




export function PrimaryBtnNeon({ className, children, onClick }: ButtonProps) {
    return (
        <button type="button" onClick={onClick} className={cn(
            "primary-btn-neon outline-none justify-center",
            className
        )}>
            {children}
        </button>
    )
}


export function PrimaryWithNeon({ className, children, onClick, active }: ButtonProps) {
    return (
        <button type="button" onClick={onClick} className={cn(
            "primary-btn-neon outline-none transition-all duration-300",
            active ? "bg-primary" : "hover:bg-primary/60",
            className
        )}>
            {children}
        </button>
    )
}

