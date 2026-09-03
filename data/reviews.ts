export interface ReviewItem {
  name: string;
  rating: number;
  content: string;
  date: string;
}

export const reviews: ReviewItem[] = [
  {
    name: "김OO 님",
    rating: 5,
    content: "급하게 상담이 필요했는데 빠르게 안내받았습니다.",
    date: "2026.08.21",
  },
  {
    name: "이OO 님",
    rating: 5,
    content: "처음 이용했는데 설명이 이해하기 쉬웠습니다.",
    date: "2026.08.15",
  },
  {
    name: "박OO 님",
    rating: 5,
    content: "상담 답변이 빨라서 편했습니다.",
    date: "2026.08.09",
  },
  {
    name: "정OO 님",
    rating: 5,
    content: "문의부터 상담까지 빠르게 진행됐습니다.",
    date: "2026.07.30",
  },
];
