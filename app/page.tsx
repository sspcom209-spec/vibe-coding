"use client";

import { FormEvent, useEffect, useState } from "react";
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

type GuestbookEntry = {
  id: number;
  name: string;
  message: string;
  createdAt: string;
};

type Recommendation = {
  id: number;
  text: string;
  category: "vibe-coding" | "success-encyclopedia";
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

  // API 실습 섹션 상태
  const [activeApiTab, setActiveApiTab] = useState<"guestbook" | "likes" | "random">("guestbook");

  // 방명록 상태
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>([]);
  const [guestbookName, setGuestbookName] = useState("");
  const [guestbookMessage, setGuestbookMessage] = useState("");
  const [guestbookLoading, setGuestbookLoading] = useState(false);
  const [guestbookSubmitting, setGuestbookSubmitting] = useState(false);
  const [guestbookError, setGuestbookError] = useState<string | null>(null);
  const [guestbookDeletingId, setGuestbookDeletingId] = useState<number | null>(null);

  // 좋아요 상태
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [likeLoading, setLikeLoading] = useState(false);
  const [likeSubmitting, setLikeSubmitting] = useState(false);
  const [likeError, setLikeError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);

  // 추천 문구 상태
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [recommendationLoading, setRecommendationLoading] = useState(false);
  const [recommendationError, setRecommendationError] = useState<string | null>(null);

  const openProjectDialog = (project: Project) => {
    setSelectedProject(project);
    setIsProjectDialogOpen(true);
  };

  const closeProjectDialog = () => {
    setIsProjectDialogOpen(false);
    setSelectedProject(null);
  };

  // 방명록 초기 데이터 로드
  useEffect(() => {
    const fetchGuestbook = async () => {
      try {
        setGuestbookLoading(true);
        setGuestbookError(null);
        const res = await fetch("/api/guestbook");
        if (!res.ok) {
          throw new Error("방명록을 불러오지 못했습니다.");
        }
        const data = await res.json();
        setGuestbookEntries(data.entries ?? []);
      } catch (error) {
        console.error(error);
        setGuestbookError("방명록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setGuestbookLoading(false);
      }
    };

    fetchGuestbook();
  }, []);

  // 좋아요 초기 값 로드
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        setLikeLoading(true);
        setLikeError(null);
        const res = await fetch("/api/likes?key=portfolio");
        if (!res.ok) {
          throw new Error("좋아요 정보를 불러오지 못했습니다.");
        }
        const data = await res.json();
        setLikeCount(typeof data.count === "number" ? data.count : 0);
      } catch (error) {
        console.error(error);
        setLikeError("좋아요 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLikeLoading(false);
      }
    };

    fetchLikes();
  }, []);

  const handleGuestbookSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!guestbookName.trim() || !guestbookMessage.trim()) {
      setGuestbookError("이름과 메시지를 모두 입력해 주세요.");
      return;
    }

    try {
      setGuestbookSubmitting(true);
      setGuestbookError(null);

      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: guestbookName.trim(),
          message: guestbookMessage.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "방명록 작성에 실패했습니다.");
      }

      if (data.entry) {
        // 새 글을 가장 위에 추가
        setGuestbookEntries((prev) => [data.entry, ...prev]);
      }

      setGuestbookName("");
      setGuestbookMessage("");
    } catch (error: any) {
      console.error(error);
      setGuestbookError(error?.message ?? "방명록 작성 중 오류가 발생했습니다.");
    } finally {
      setGuestbookSubmitting(false);
    }
  };

  const handleGuestbookDelete = async (id: number) => {
    try {
      setGuestbookDeletingId(id);
      setGuestbookError(null);

      const res = await fetch(`/api/guestbook?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "방명록 삭제에 실패했습니다.");
      }

      setGuestbookEntries((prev) => prev.filter((entry) => entry.id !== id));
    } catch (error: any) {
      console.error(error);
      setGuestbookError(error?.message ?? "방명록 삭제 중 오류가 발생했습니다.");
    } finally {
      setGuestbookDeletingId(null);
    }
  };

  const handleLikeClick = async () => {
    try {
      setLikeSubmitting(true);
      setLikeError(null);

      const action = liked ? "unlike" : "like";

      const res = await fetch("/api/likes?key=portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "좋아요 처리에 실패했습니다.");
      }

      if (typeof data.count === "number") {
        setLikeCount(data.count);
      }

      setLiked(!liked);
    } catch (error: any) {
      console.error(error);
      setLikeError(error?.message ?? "좋아요 처리 중 오류가 발생했습니다.");
    } finally {
      setLikeSubmitting(false);
    }
  };

  const handleRecommendationClick = async () => {
    try {
      setRecommendationLoading(true);
      setRecommendationError(null);

      const res = await fetch("/api/recommendations");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "추천 문구를 불러오지 못했습니다.");
      }

      if (data?.recommendation) {
        setRecommendation(data.recommendation as Recommendation);
      }
    } catch (error: any) {
      console.error(error);
      setRecommendationError(
        error?.message ?? "추천 문구를 불러오는 중 오류가 발생했습니다.",
      );
    } finally {
      setRecommendationLoading(false);
    }
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

        {/* API 실습 섹션 */}
        <section className="section bg-zinc-50/60">
          <h2 className="section-title">API 실습</h2>
          <p className="mb-4 text-sm text-zinc-600">
            간단한 API를 직접 호출해 보면서 백엔드 연동을 연습해볼 수 있는 공간입니다.
          </p>
          <Card className="border-zinc-200">
            <CardHeader className="pb-3">
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={activeApiTab === "guestbook" ? "default" : "outline"}
                  onClick={() => setActiveApiTab("guestbook")}
                >
                  방명록 API
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={activeApiTab === "likes" ? "default" : "outline"}
                  onClick={() => setActiveApiTab("likes")}
                >
                  좋아요 API
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={activeApiTab === "random" ? "default" : "outline"}
                  onClick={() => setActiveApiTab("random")}
                >
                  랜덤 추천 API
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeApiTab === "guestbook" && (
                <>
                  <p className="text-sm text-zinc-600">
                    이름과 한 줄 메시지를 남기면, 아래 목록에 바로 추가되는 방명록 API입니다.
                  </p>
                  <form
                    className="space-y-3"
                    onSubmit={handleGuestbookSubmit}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input
                        type="text"
                        placeholder="이름"
                        value={guestbookName}
                        onChange={(event) => setGuestbookName(event.target.value)}
                        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
                      />
                      <input
                        type="text"
                        placeholder="남기고 싶은 한 줄 메시지"
                        value={guestbookMessage}
                        onChange={(event) => setGuestbookMessage(event.target.value)}
                        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <Button
                        type="submit"
                        size="sm"
                        disabled={guestbookSubmitting}
                      >
                        {guestbookSubmitting ? "등록 중..." : "방명록 남기기"}
                      </Button>
                      {guestbookLoading && (
                        <span className="text-xs text-zinc-500">
                          방명록 불러오는 중...
                        </span>
                      )}
                    </div>
                  </form>
                  {guestbookError && (
                    <p className="text-xs text-red-500">{guestbookError}</p>
                  )}
                  <div className="mt-2 space-y-2">
                    {guestbookEntries.length === 0 ? (
                      <p className="text-sm text-zinc-500">
                        아직 남겨진 방명록이 없습니다. 가장 먼저 한 줄을 남겨보세요!
                      </p>
                    ) : (
                      guestbookEntries.map((entry) => (
                        <div
                          key={entry.id}
                          className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm"
                        >
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <div className="flex flex-col">
                              <span className="font-medium text-zinc-900">
                                {entry.name}
                              </span>
                              <span className="text-[11px] text-zinc-400">
                                {new Date(entry.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 text-[11px] text-zinc-500 hover:text-red-600"
                              disabled={guestbookDeletingId === entry.id}
                              onClick={() => handleGuestbookDelete(entry.id)}
                            >
                              {guestbookDeletingId === entry.id ? "삭제 중..." : "삭제"}
                            </Button>
                          </div>
                          <p className="text-zinc-700">{entry.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}

              {activeApiTab === "likes" && (
                <div className="space-y-3">
                  <p className="text-sm text-zinc-600">
                    이 포트폴리오(바이브 코딩 프로젝트)가 마음에 들면 좋아요를 눌러 주세요. 한 번 더 누르면 취소됩니다.
                  </p>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleLikeClick}
                      disabled={likeSubmitting}
                      variant={liked ? "default" : "outline"}
                      className={
                        liked
                          ? "border-pink-500 bg-pink-500 text-white hover:bg-pink-600"
                          : "border-pink-400 text-pink-600 hover:bg-pink-50"
                      }
                    >
                      {likeSubmitting
                        ? "좋아요 처리 중..."
                        : liked
                        ? "좋아요 취소"
                        : "좋아요 누르기"}
                    </Button>
                    <span className="text-sm text-zinc-700">
                      현재 좋아요:{" "}
                      <span className="font-semibold">
                        {likeCount === null ? (likeLoading ? "..." : 37) : likeCount}
                      </span>
                    </span>
                  </div>
                  {likeError && (
                    <p className="text-xs text-red-500">{likeError}</p>
                  )}
                </div>
              )}

              {activeApiTab === "random" && (
                <div className="space-y-3">
                  <p className="text-sm text-zinc-600">
                    바이브 코딩을 처음 시작하는 사람과, 성공지식백과를 공부하는 사람을 위한 오늘의 한 줄 추천 문구입니다.
                  </p>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleRecommendationClick}
                      disabled={recommendationLoading}
                    >
                      {recommendationLoading
                        ? "불러오는 중..."
                        : "오늘의 추천 문구 받기"}
                    </Button>
                    {recommendation && (
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700">
                        {recommendation.category === "vibe-coding"
                          ? "Vibe Coding"
                          : "성공지식백과"}
                      </span>
                    )}
                  </div>
                  {recommendationError && (
                    <p className="text-xs text-red-500">
                      {recommendationError}
                    </p>
                  )}
                  {recommendation && (
                    <div className="mt-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800">
                      {recommendation.text}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
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
