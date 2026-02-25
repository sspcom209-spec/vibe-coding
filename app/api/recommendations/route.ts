import { NextResponse } from "next/server";

type Recommendation = {
  id: number;
  text: string;
  category: "vibe-coding" | "success-encyclopedia";
};

// 바이브 코딩과 성공지식백과 관련 추천 문구들
const RECOMMENDATIONS: Recommendation[] = [
  {
    id: 1,
    category: "vibe-coding",
    text: "바이브 코딩의 첫 코드는 완벽할 필요가 없습니다. 중요한 건 오늘도 키보드를 두드렸다는 사실입니다.",
  },
  {
    id: 2,
    category: "vibe-coding",
    text: "새로운 버그는 당신이 한 걸음 더 나아갔다는 증거입니다. 겁내지 말고 디버깅을 즐겨보세요.",
  },
  {
    id: 3,
    category: "vibe-coding",
    text: "코드를 잘 짜는 것보다 중요한 건, 내 생각을 코드로 끝까지 표현해 보는 경험입니다.",
  },
  {
    id: 4,
    category: "success-encyclopedia",
    text: "성공지식백과는 정답을 찾는 곳이 아니라, 스스로 답을 만들 수 있도록 도와주는 질문들의 모음입니다.",
  },
  {
    id: 5,
    category: "success-encyclopedia",
    text: "오늘 한 줄 정리: ‘작게 시작하되, 끝까지 완성하자.’ 이것이 성공지식백과가 말하는 실전 공부법입니다.",
  },
  {
    id: 6,
    category: "vibe-coding",
    text: "튜토리얼을 벗어나 나만의 작은 프로젝트를 만드는 순간, 진짜 성장 곡선이 시작됩니다.",
  },
  {
    id: 7,
    category: "success-encyclopedia",
    text: "지식을 쌓는 것보다 중요한 건, 그 지식으로 무엇을 만들어 보았는가입니다.",
  },
  {
    id: 8,
    category: "vibe-coding",
    text: "에러 로그는 당신을 혼내는 게 아니라, 다음 단계로 안내하는 친절한 네비게이션입니다.",
  },
];

function getRandomRecommendation(category?: string): Recommendation {
  const pool =
    category && (category === "vibe-coding" || category === "success-encyclopedia")
      ? RECOMMENDATIONS.filter((item) => item.category === category)
      : RECOMMENDATIONS;

  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx]!;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;

  const recommendation = getRandomRecommendation(category ?? undefined);

  return NextResponse.json(
    {
      recommendation,
      total: RECOMMENDATIONS.length,
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    },
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

