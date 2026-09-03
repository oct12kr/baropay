import { Star, User } from "lucide-react";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { reviews } from "@/data/reviews";

export default function Reviews() {
  return (
    <section id="reviews" className="bg-white py-20 md:py-28">
      <Container className="flex flex-col items-center gap-14">
        <SectionTitle eyebrow="이용후기" title="실제 고객님들의 후기" />

        <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <div
              key={review.name + review.date}
              className="flex flex-col gap-4 rounded-[20px] border border-card-border bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-light-blue text-primary-blue">
                  <User className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-sm font-bold text-text">{review.name}</p>
                  <div className="mt-0.5 flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-kakao text-kakao" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="flex-1 text-[14px] leading-relaxed text-text/80">
                {review.content}
              </p>

              <p className="text-xs text-gray-text">{review.date}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
