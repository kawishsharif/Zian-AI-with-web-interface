import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border border-slate-200 px-4 py-3 text-sm [&:has(svg)]:pl-11 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-slate-950",
  {
    variants: {
      variant: {
        default: "bg-white text-slate-950",
        destructive:
          "border-red-500/50 text-red-500 [&>svg]:text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type AlertProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
)
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"




type AutoHideAlertProps = AlertProps & {
  title?: string;
  message?: string;
  containerClassName?: string;
}

const AutoHideAlert = ({ title, message, containerClassName, ...props }: AutoHideAlertProps) => {
  const [visible] = React.useState(message && message !== "");
  // const [timeout, settimeout] = React.useState<NodeJS.Timeout | null>(null);
  // React.useEffect(() => {
  //   if (timeout !== null) {
  //     clearTimeout(timeout)
  //   }
  //   settimeout(
  //     setTimeout(() => {
  //       setVisible(false)
  //     }, 4000)
  //   )
  // }, [timeout, visible])
  return (
    visible &&
    <div className={containerClassName}>
      <Alert variant="destructive" {...props}>
        {
          title &&
          <AlertTitle>{title}</AlertTitle>
        }
        <AlertDescription>
          {message}
        </AlertDescription>
      </Alert >
    </div>
  )
}


export { Alert, AlertTitle, AlertDescription, AutoHideAlert }
