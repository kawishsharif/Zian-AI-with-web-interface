import { ReactNode } from "react";
import { cn } from "../../lib/utils";


type Props = {
    className?: string;
    children?: ReactNode;
    type?: "sm" | "lg"
}

export default function GrBorderBox({ className, children, type = "lg" }: Props) {
    return (
        <div className={cn(
            "p-[1px] rounded-20",
            `box-conic-bg-${type}`,
            className
        )}>
            {children}
        </div>
    );
}