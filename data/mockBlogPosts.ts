import type { BlogPost } from "@/types/wordpress";

/**
 * Design-preview blog posts. Used only as a visual fallback when WordPress
 * has not published enough real posts yet — see components/home/LatestBlog.tsx
 * and app/blog/page.tsx for the switch-over logic. Never sent to WordPress.
 */

const GRADIENTS: [string, string][] = [
  ["#2878F0", "#0A2A52"],
  ["#0A2A52", "#071E3D"],
  ["#3B82F6", "#1E3A8A"],
  ["#2878F0", "#1E63CC"],
  ["#1E63CC", "#071E3D"],
  ["#0A2A52", "#2878F0"],
  ["#2878F0", "#071E3D"],
  ["#3B82F6", "#0A2A52"],
];

function buildDotsOverlay(): string {
  let dots = "";
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 7; col++) {
      const cx = 60 + col * 90;
      const cy = 50 + row * 90;
      dots += `<circle cx="${cx}" cy="${cy}" r="3" fill="rgba(255,255,255,0.18)" />`;
    }
  }
  return dots;
}

function buildLinesOverlay(): string {
  let lines = "";
  for (let i = -2; i < 10; i++) {
    const x = i * 80;
    lines += `<line x1="${x}" y1="360" x2="${x + 200}" y2="0" stroke="rgba(255,255,255,0.12)" stroke-width="18" />`;
  }
  return lines;
}

function buildRingsOverlay(): string {
  return `<circle cx="560" cy="80" r="90" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="14" />
    <circle cx="560" cy="80" r="140" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="10" />`;
}

function buildThumbnail(index: number): string {
  const [c1, c2] = GRADIENTS[index % GRADIENTS.length];
  const pattern = index % 3;
  const overlay =
    pattern === 0 ? buildDotsOverlay() : pattern === 1 ? buildLinesOverlay() : buildRingsOverlay();
  const label = String(index + 1).padStart(2, "0");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
    <defs>
      <linearGradient id="g${index}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c1}" />
        <stop offset="1" stop-color="${c2}" />
      </linearGradient>
      <clipPath id="clip${index}"><rect width="640" height="360" /></clipPath>
    </defs>
    <g clip-path="url(#clip${index})">
      <rect width="640" height="360" fill="url(#g${index})" />
      ${overlay}
      <text x="26" y="322" font-family="Pretendard, -apple-system, sans-serif" font-size="90" font-weight="800" fill="rgba(255,255,255,0.22)">${label}</text>
      <rect x="28" y="28" width="48" height="48" rx="14" fill="rgba(255,255,255,0.95)" />
      <text x="52" y="59" font-family="Pretendard, -apple-system, sans-serif" font-size="22" font-weight="800" fill="${c1}" text-anchor="middle">B</text>
    </g>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const ENTRIES: { title: string; excerpt: string }[] = [
  {
    title: "바로페이 이용방법 간단하게 알아보기",
    excerpt: "처음 이용하시는 분들을 위해 상담 신청부터 완료까지의 흐름을 간단하게 정리했습니다.",
  },
  {
    title: "소액결제 이용 전 확인사항",
    excerpt: "소액결제를 이용하기 전에 미리 확인해두면 좋은 기본적인 사항들을 안내합니다.",
  },
  {
    title: "정보이용료 기본 개념 정리",
    excerpt: "정보이용료가 무엇인지, 어떤 방식으로 청구되는지 쉽게 풀어서 설명합니다.",
  },
  {
    title: "휴대폰 결제 한도 확인방법",
    excerpt: "통신사 앱과 고객센터를 통해 현재 결제 한도를 확인하는 방법을 소개합니다.",
  },
  {
    title: "온라인 상담 이용방법",
    excerpt: "카카오톡과 전화를 통한 온라인 상담 신청 절차를 차례대로 안내해 드립니다.",
  },
  {
    title: "빠른 상담 전 알아두면 좋은 점",
    excerpt: "상담을 조금 더 빠르게 진행하기 위해 미리 알아두면 좋은 정보를 정리했습니다.",
  },
  {
    title: "결제 이용내역 확인하는 방법",
    excerpt: "통신사 앱과 요금 고지서에서 결제 이용내역을 확인하는 방법을 소개합니다.",
  },
  {
    title: "휴대폰 결제가 안될 때 확인사항",
    excerpt: "결제가 정상적으로 진행되지 않을 때 확인해보면 좋은 항목들을 정리했습니다.",
  },
  {
    title: "정보이용료 이용내역 확인",
    excerpt: "정보이용료 이용내역을 확인하는 다양한 방법을 간단하게 안내합니다.",
  },
  {
    title: "소액결제 한도 관련 기본 정보",
    excerpt: "소액결제 한도가 정해지는 기준과 변경 절차에 대해 알아봅니다.",
  },
  {
    title: "안전한 온라인 상담을 위한 안내",
    excerpt: "온라인 상담을 안전하게 이용하기 위해 확인해두면 좋은 사항을 안내합니다.",
  },
  {
    title: "바로페이 자주 묻는 질문 정리",
    excerpt: "고객들이 자주 궁금해하시는 내용을 모아 한 번에 정리했습니다.",
  },
  {
    title: "처음 이용하는 고객을 위한 가이드",
    excerpt: "바로페이를 처음 이용하시는 분들을 위한 기본 가이드를 준비했습니다.",
  },
  {
    title: "모바일 결제 기본 이용안내",
    excerpt: "모바일 결제의 기본적인 이용 방법과 절차를 쉽게 설명합니다.",
  },
  {
    title: "상담 신청 전 체크리스트",
    excerpt: "상담을 신청하기 전에 미리 확인해두면 좋은 체크리스트를 정리했습니다.",
  },
  {
    title: "바로페이 서비스 한눈에 보기",
    excerpt: "바로페이가 제공하는 상담 서비스를 한눈에 볼 수 있도록 정리했습니다.",
  },
];

const BASE_DATE = new Date("2026-09-02T09:00:00+09:00");

export const mockBlogPosts: BlogPost[] = ENTRIES.map((entry, index) => {
  const date = new Date(BASE_DATE);
  date.setDate(date.getDate() - index * 2);

  return {
    id: 900001 + index,
    slug: `mock-${index + 1}`,
    title: entry.title,
    excerpt: entry.excerpt,
    content: `<p>${entry.excerpt}</p><p>본 게시글은 디자인 확인을 위한 임시(mock) 콘텐츠이며, 실제 WordPress 발행글이 아닙니다.</p>`,
    date: date.toISOString(),
    featuredImage: buildThumbnail(index),
  };
});
