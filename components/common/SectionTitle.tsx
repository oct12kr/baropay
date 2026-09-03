interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      <span
        className={`text-sm font-bold tracking-wide ${
          light ? "text-primary-blue" : "text-primary-blue"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`text-[28px] font-extrabold leading-tight md:text-[38px] lg:text-[44px] ${
          light ? "text-white" : "text-text"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`max-w-2xl text-base leading-relaxed md:text-lg ${
            light ? "text-white/70" : "text-gray-text"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
