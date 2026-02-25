import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  // shadcn/ui 패턴처럼 자식 요소(a, Link 등)에 스타일을 그대로 위임하고 싶을 때 사용하는 옵션입니다.
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 focus-visible:ring-zinc-900",
  outline:
    "border border-zinc-300 text-zinc-900 hover:bg-zinc-950 hover:text-zinc-50 focus-visible:ring-zinc-400",
  ghost:
    "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-zinc-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-8 px-3 text-xs",
  lg: "h-11 px-6 text-sm",
};

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60",
      variantClasses[variant],
      sizeClasses[size],
      className,
    );

    // asChild가 true이고, 자식이 유효한 React 엘리먼트라면
    // 해당 자식에게 버튼 스타일과 나머지 props를 위임합니다.
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;

      return React.cloneElement(child, {
        ref,
        className: cn(classes, child.props.className),
        ...(props as any),
      });
    }

    // 기본적으로는 실제 button 엘리먼트를 렌더링합니다.
    return (
      <button ref={ref as any} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";


