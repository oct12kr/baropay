import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { services } from "@/data/services";

const accentClasses = {
  blue: "bg-light-blue text-primary-blue",
  violet: "bg-violet-50 text-violet-600",
  mint: "bg-emerald-50 text-emerald-600",
} as const;

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <Container className="flex flex-col items-center gap-14">
        <SectionTitle
          eyebrow="바로페이 서비스"
          title="다양한 방법으로 필요한 서비스를 상담하세요"
        />

        <div className="grid w-full gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col gap-5 rounded-[22px] border border-card-border bg-card p-[30px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(7,30,61,0.18)]"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                  accentClasses[service.accent]
                }`}
              >
                <service.icon className="h-7 w-7" strokeWidth={2} />
              </span>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-text">{service.title}</h3>
                <p className="text-[15px] leading-relaxed text-gray-text">
                  {service.description}
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary-blue ring-1 ring-inset ring-primary-blue/20">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-blue" />
                {service.badge}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
