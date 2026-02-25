import { NextResponse } from "next/server";

// 아주 간단한 인메모리 좋아요 상태입니다.
// key 별로 좋아요 개수를 저장합니다.
type LikeState = Record<string, number>;

const likes: LikeState = {
  // 초기 더미 좋아요 수
  portfolio: 37,
};

function getKeyFromRequest(request: Request): string {
  const { searchParams } = new URL(request.url);
  return searchParams.get("key") || "portfolio";
}

export async function GET(request: Request) {
  const key = getKeyFromRequest(request);
  const count = likes[key] ?? 0;

  return NextResponse.json(
    {
      key,
      count,
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    },
  );
}

// 좋아요 토글 (like / unlike)
export async function POST(request: Request) {
  const key = getKeyFromRequest(request);

  let current = likes[key] ?? 0;

  try {
    const body = await request.json().catch(() => null as any);
    const action = body?.action as "like" | "unlike" | undefined;

    if (action === "unlike") {
      current = Math.max(0, current - 1);
    } else {
      // 기본은 like 로 동작
      current = current + 1;
    }
  } catch {
    // body 파싱 실패 시에도 기본 like 처리
    current = current + 1;
  }

  likes[key] = current;

  return NextResponse.json(
    {
      key,
      count: current,
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

