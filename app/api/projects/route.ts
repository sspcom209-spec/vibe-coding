import { NextResponse } from "next/server";

// 전체 프로젝트 리스트를 반환하는 API입니다.
// /api/profile 에 들어있는 projects 부분만 분리해서
// 단독으로 사용할 수 있도록 만든 엔드포인트입니다.

const projects = [
  {
    id: 1,
    title: "Next.js 블로그 예제",
    shortDescription:
      "간단한 기술 블로그. 글 목록과 상세 페이지를 가진 정적 사이트.",
    techStack: ["Next.js", "TypeScript", "MDX"],
    githubUrl: "https://github.com/your-github/nextjs-blog-example",
    liveUrl: "https://your-portfolio-blog-demo.site",
  },
  {
    id: 2,
    title: "사이드 프로젝트 대시보드",
    shortDescription:
      "사이드 프로젝트들의 진행 상황을 모아서 보는 미니 대시보드.",
    techStack: ["React", "Recharts", "Tailwind CSS"],
    githubUrl: "https://github.com/your-github/side-project-dashboard",
    liveUrl: "https://your-dashboard-demo.site",
  },
  {
    id: 3,
    title: "REST API 백엔드",
    shortDescription: "간단한 인증과 CRUD 기능을 가진 REST API 서버.",
    techStack: ["Node.js", "Express", "PostgreSQL"],
    githubUrl: "https://github.com/your-github/rest-api-example",
    liveUrl: "https://your-api-docs-demo.site",
  },
];

export async function GET() {
  return NextResponse.json(
    {
      count: projects.length,
      projects,
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

