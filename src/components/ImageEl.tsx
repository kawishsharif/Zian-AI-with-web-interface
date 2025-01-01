import { cn } from "@/lib/utils";
import LoadingSparkle from "./LoadingSparkle";



type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    showLoading?: boolean;
    containerClassName?: string;
}

export default function ImageEl({
    showLoading = false,
    containerClassName,
    ...props
}: Props) {
    return (
        <div className={cn(
            "w-full h-auto relative rounded-20 overflow-hidden",
            containerClassName
        )}>
            <img {...props} />
            {
                showLoading &&
                <div className="absolute top-0 left-0 w-full h-full  bg-[#2C163CB2] flex gap-4 flex-col items-center justify-center text-center">
                    <LoadingSparkle spark />
                    <p className="text-xs font-semibold text-white">
                        Regenerating image
                    </p>
                </div>
            }
        </div>
    )
}



