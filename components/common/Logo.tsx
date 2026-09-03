interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textClass = variant === "light" ? "text-white" : "text-deep-navy";

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary-blue text-[19px] font-black text-white">
        B
      </span>
      <span className={`text-[20px] font-extrabold tracking-tight ${textClass}`}>바로페이</span>
    </span>
  );
}
