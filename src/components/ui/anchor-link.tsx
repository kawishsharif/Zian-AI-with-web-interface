import { cn } from "@/lib/utils"



export type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

export default function Anchor({ className, children, ...props }: AnchorProps) {
    return (
        <a className={cn(
            "text-primary font-normal underline transition-all hover:no-underline",
            className,
        )} {...props}>
            {children}
        </a>
    )
}

export function AnchorNeon({ className, children, ...props }: AnchorProps) {
    return (
        <a className={cn(
            "primary-btn-neon outline-none justify-center",
            className
        )} {...props}>
            {children}
        </a>
    )
}
