 "use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
};

// 포트폴리오에 표시할 더미 프로젝트 데이터
const projects: Project[] = [
  {
    id: 1,
    title: "Next.js 블로그 예제",
    description: "간단한 기술 블로그. 글 목록과 상세 페이지를 가진 정적 사이트.",
    techStack: ["Next.js", "TypeScript", "MDX"],
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    githubUrl: "https://github.com/your-github/nextjs-blog-example",
    liveUrl: "https://your-portfolio-blog-demo.site",
  },
  {
    id: 2,
    title: "사이드 프로젝트 대시보드",
    description: "진행 중인 프로젝트들의 진행 상황을 모아서 보는 미니 대시보드.",
    techStack: ["React", "Recharts", "Tailwind CSS"],
    image:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    githubUrl: "https://github.com/your-github/side-project-dashboard",
    liveUrl: "https://your-dashboard-demo.site",
  },
  {
    id: 3,
    title: "REST API 백엔드",
    description: "간단한 인증과 CRUD 기능을 가진 REST API 서버.",
    techStack: ["Node.js", "Express", "PostgreSQL"],
    image:
      "https://images.pexels.com/photos/11035371/pexels-photo-11035371.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    githubUrl: "https://github.com/your-github/rest-api-example",
    liveUrl: "https://your-api-docs-demo.site",
  },
];

const skills = {
  languages: ["TypeScript", "JavaScript", "Python", "SQL"],
  frontend: ["React", "Next.js", "Tailwind CSS"],
  backend: ["Node.js", "Express", "NestJS"],
  etc: ["Git / GitHub", "REST API", "Clean Code"],
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);

  const openProjectDialog = (project: Project) => {
    setSelectedProject(project);
    setIsProjectDialogOpen(true);
  };

  const closeProjectDialog = () => {
    setIsProjectDialogOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 상단 고정 네비게이션 */}
      <header className="sticky top-0 z-10 border-b border-zinc-200/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-zinc-50 shadow-sm">
              VC
            </div>
            <span className="text-sm font-medium text-zinc-700">
              바이브 코딩 포트폴리오
            </span>
          </div>
          <nav className="hidden gap-6 text-sm text-zinc-600 sm:flex">
            <a href="#about" className="hover:text-zinc-900">
              소개
            </a>
            <a href="#projects" className="hover:text-zinc-900">
              프로젝트
            </a>
            <a href="#skills" className="hover:text-zinc-900">
              기술 스택
            </a>
            <a href="#contact" className="hover:text-zinc-900">
              연락처
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero 섹션 */}
        <section className="section pt-16 pb-12 sm:pt-24 sm:pb-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] md:items-center">
            <div>
              <p className="section-subtitle">DEVELOPER PORTFOLIO</p>
              <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                바이브 코딩 첫{" "}
                <span className="underline decoration-zinc-400 decoration-2 underline-offset-4">
                  Next.js 포트폴리오
                </span>
              </h1>
              <p className="mb-6 text-base sm:text-lg leading-relaxed text-zinc-600">
                사이드 프로젝트와 학습 결과물을 간단하게 모아둔 포트폴리오입니다.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg">
                  <a href="#projects">프로젝트 보러가기</a>
                </Button>
                <Button variant="outline" size="lg">
                  <a href="#contact">함께 협업해요</a>
                </Button>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <Card className="relative w-full max-w-xs overflow-hidden border-none bg-zinc-950/5">
                <div className="relative h-40 w-full">
                  <Image
                    src="https://images.pexels.com/photos/2706379/pexels-photo-2706379.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80"
                    alt="노트북과 코드가 보이는 작업 공간"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 240px, 100vw"
                  />
                </div>
                <CardHeader className="gap-1 pb-2">
                  <CardTitle className="text-base">
                    닉네임 / 이름
                  </CardTitle>
                  <CardDescription className="text-xs">
                    프론트엔드 & 백엔드 개발을 함께 다루는 개발자입니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-1">
                  <div className="flex flex-wrap gap-2">
                    <Badge>#Next.js</Badge>
                    <Badge>#TypeScript</Badge>
                    <Badge>#Clean Code</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 비주얼 스냅샷 섹션 */}
        <section className="section pt-6 pb-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="relative h-32 overflow-hidden rounded-xl sm:h-40">
              <Image
                src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80"
                alt="코드 에디터 화면"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <div className="relative h-32 overflow-hidden rounded-xl sm:h-40">
              <Image
                src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80"
                alt="노트북과 노트가 있는 책상"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <div className="relative h-32 overflow-hidden rounded-xl sm:h-40">
              <Image
                src="https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80"
                alt="협업하는 개발자들"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          </div>
        </section>

        {/* 소개 섹션 */}
        <section id="about" className="section bg-zinc-50/60">
          <h2 className="section-title">소개</h2>
          <p className="max-w-2xl text-zinc-700 leading-relaxed">
            사용자 경험과 코드 품질을 함께 신경 쓰는 개발자를 목표로 하고
            있습니다. 작은 실험부터 제품 수준의 프로젝트까지, 꾸준히 만들어 보고
            배운 내용을 기록합니다.
          </p>
        </section>

        {/* 프로젝트 섹션 */}
        <section id="projects" className="section">
          <h2 className="section-title">프로젝트</h2>
          <p className="mb-6 text-sm text-zinc-600">
            실제로 진행한 프로젝트들을 천천히 추가해 나갈 예정입니다.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="flex h-full flex-col justify-between overflow-hidden transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-32 w-full">
                  <Image
                    src={project.image}
                    alt={`${project.title} 미리보기`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 300px, 100vw"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        className="border-transparent bg-zinc-100 text-[11px]"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    type="button"
                    onClick={() => openProjectDialog(project)}
                  >
                    자세히 보기
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* 기술 스택 섹션 */}
        <section id="skills" className="section bg-zinc-50/60">
          <h2 className="section-title">기술 스택</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-800">언어</h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((item) => (
                  <Badge
                    key={item}
                    className="border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-800 shadow-sm"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-800">프론트엔드</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((item) => (
                  <Badge
                    key={item}
                    className="border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-800 shadow-sm"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-800">백엔드</h3>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map((item) => (
                  <Badge
                    key={item}
                    className="border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-800 shadow-sm"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-800">기타</h3>
              <div className="flex flex-wrap gap-2">
                {skills.etc.map((item) => (
                  <Badge
                    key={item}
                    className="border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-800 shadow-sm"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 연락처 섹션 */}
        <section id="contact" className="section">
          <h2 className="section-title">연락처</h2>
          <p className="mb-4 text-sm text-zinc-600">
            아래 예시를 본인 정보에 맞게 바꿔서 사용해 주세요.
          </p>
          <div className="space-y-2 text-sm text-zinc-700">
            <p>
              <span className="font-medium text-zinc-900">이메일</span>:{" "}
              your-email@example.com
            </p>
            <p>
              <span className="font-medium text-zinc-900">GitHub</span>:{" "}
              <a
                href="https://github.com/your-github"
                className="underline underline-offset-4 hover:text-zinc-950"
              >
                https://github.com/your-github
              </a>
            </p>
            <p>
              <span className="font-medium text-zinc-900">기타</span>: 블로그, 링크드인,
              노션 등 자유롭게 추가
            </p>
          </div>
        </section>
      </main>

      {/* 프로젝트 상세 팝업 */}
      {isProjectDialogOpen && selectedProject && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4"
          onClick={closeProjectDialog}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-background shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-40 w-full overflow-hidden rounded-t-2xl">
              <Image
                src={selectedProject.image}
                alt={`${selectedProject.title} 미리보기`}
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>
            <div className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900">
                    {selectedProject.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600">
                    {selectedProject.description}
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 text-xs text-zinc-500 hover:bg-zinc-100"
                  onClick={closeProjectDialog}
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {selectedProject.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    className="border-zinc-200 bg-white px-2.5 py-1 text-[11px]"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              {(selectedProject.githubUrl || selectedProject.liveUrl) && (
                <div className="flex flex-wrap gap-3 pt-1 text-sm">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-zinc-800 underline underline-offset-4 hover:text-zinc-950"
                    >
                      GitHub 바로가기
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-zinc-800 underline underline-offset-4 hover:text-zinc-950"
                    >
                      포트폴리오 링크
                    </a>
                  )}
                </div>
              )}

              <div className="flex justify-end pt-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={closeProjectDialog}
                >
                  닫기
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-zinc-200/70 bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-xs text-zinc-500 sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} Vibe Coding. All rights reserved.</span>
          <span className="hidden sm:inline">
            Built with Next.js & Tailwind CSS
          </span>
        </div>
      </footer>
    </div>
  );
}
