import { NextResponse } from "next/server";

// 아주 간단한 인메모리 방명록 저장소입니다.
// 실제 서비스에서는 DB로 교체하면 됩니다.
type GuestbookEntry = {
  id: number;
  name: string;
  message: string;
  createdAt: string;
};

let entries: GuestbookEntry[] = [];
let nextId = 1;

export async function GET() {
  // 최신 글이 앞으로 오도록 정렬해서 반환합니다.
  const sorted = [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return NextResponse.json(
    {
      count: sorted.length,
      entries: sorted,
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !message) {
      return NextResponse.json(
        { error: "이름과 메시지는 모두 필수입니다." },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        },
      );
    }

    const entry: GuestbookEntry = {
      id: nextId++,
      name,
      message,
      createdAt: new Date().toISOString(),
    };

    entries.push(entry);

    return NextResponse.json(
      { entry },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "요청을 처리하는 중 오류가 발생했습니다." },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json(
        { error: "삭제할 방명록 id가 필요합니다. (?id=숫자)" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        },
      );
    }

    const id = Number(idParam);
    if (Number.isNaN(id)) {
      return NextResponse.json(
        { error: "id는 숫자여야 합니다." },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        },
      );
    }

    const index = entries.findIndex((entry) => entry.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "해당 id의 방명록을 찾을 수 없습니다." },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        },
      );
    }

    const [deleted] = entries.splice(index, 1);

    return NextResponse.json(
      { deleted },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "삭제 처리 중 오류가 발생했습니다." },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

