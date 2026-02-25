import { NextResponse } from "next/server";

// 간단한 개발자/포트폴리오 정보를 반환하는 API입니다.
// 이 엔드포인트만 호출하면 웹사이트에 접속하지 않고도
// 어떤 개발자이고, 어떤 프로젝트를 했는지 알 수 있습니다.

export async function GET() {
  // 실제로는 DB나 별도 JSON 파일에서 불러오도록 변경할 수 있습니다.
  const profile = {
    name: "닉네임 / 이름",
    role: "Full-stack / Frontend Developer",
    summary:
      "사용자 경험과 코드 품질을 함께 신경 쓰는 개발자입니다. 사이드 프로젝트와 학습 결과물을 꾸준히 만들고 기록합니다.",
    contact: {
      email: "your-email@example.com",
      github: "https://github.com/your-github",
      website: "https://your-portfolio.site",
    },
    skills: {
      languages: ["TypeScript", "JavaScript", "Python", "SQL"],
      frontend: ["React", "Next.js", "Tailwind CSS"],
      backend: ["Node.js", "Express", "NestJS"],
      etc: ["Git / GitHub", "REST API", "Clean Code"],
    },
    projects: [
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
    ],
  };

  return NextResponse.json(profile, {
    status: 200,
    // 다른 서비스(봇, 서버 등)에서 쉽게 사용할 수 있도록 CORS 헤더를 추가합니다.
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// CORS 프리플라이트(OPTIONS 요청)에 대한 응답도 함께 정의합니다.
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

