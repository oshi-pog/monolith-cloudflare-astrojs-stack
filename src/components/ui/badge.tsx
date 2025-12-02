import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-80",
                secondary:
                    "border-transparent bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:opacity-80",
                destructive:
                    "border-transparent bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:opacity-80",
                outline: "text-[hsl(var(--foreground))] border-[hsl(var(--border))]",
                pill: "border-transparent bg-[hsl(var(--secondary))]/50 backdrop-blur-sm text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/70 gap-2 pr-3 pl-1 py-1",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
    dot?: boolean;
    dotColor?: string;
}

function Badge({ className, variant, dot, dotColor = "bg-green-500", children, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props}>
            {dot && (
                <span className="relative flex h-2 w-2">
                    <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", dotColor)}></span>
                    <span className={cn("relative inline-flex rounded-full h-2 w-2", dotColor)}></span>
                </span>
            )}
            {children}
        </div>
    )
}

export { Badge, badgeVariants }
