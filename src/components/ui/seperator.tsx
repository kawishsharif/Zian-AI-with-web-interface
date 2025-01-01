import { cn } from "../../lib/utils";

type Props = {
    className?: string
}


export function GrSeperator({ className = "" }: Props) {
    return (
        <span className={cn(
            "block w-full h-0.5",
            className
        )}
            style={{ background: "linear-gradient(90deg, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 103.04%)" }}
        >
        </span>
    );
}


export function Seperator({ className = "" }: Props) {
    return (
        <span className={cn(
            "block w-full h-0.5 bg-white/10",
            className
        )}
        >
        </span>
    );
}



export function VerticalSeperator({ className = "" }: Props) {
    return (
        <span className={cn(
            "block h-6 w-0.5 bg-white/30",
            className
        )}
        >
        </span>
    );
}
