'use client';

import Stat from '@/components/Stat';
import FeatureCard from '@/components/FeatureCard';
import CategoryTags from '@/components/CategoryTags';
import Header from '@/components/Header';

export default function HomePage() {
  const onSearch = () => {
    const input = document.getElementById('search') as HTMLInputElement | null;
    const term = input?.value.trim();
    if (term) alert(`"${term}" 검색 기능이 곧 추가됩니다!`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-600">
      <Header />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center px-6 text-center">
        {/* grain overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><defs><pattern id=%22g%22 width=%22100%22 height=%22100%22 patternUnits=%22userSpaceOnUse%22><circle cx=%2250%22 cy=%2250%22 r=%221%22 fill=%22%23ffffff%22 opacity=%220.1%22/></pattern></defs><rect width=%22100%22 height=%22100%22 fill=%22url(%23g)%22/></svg>')",
          }}
        />
        <div className="relative z-10 mx-auto mt-24 max-w-3xl">
          <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
            일본{' '}
            <span className="bg-gradient-to-br from-rose-400 to-amber-400 bg-clip-text text-transparent">
              대기업
            </span>{' '}
            취업의
            <br />
            새로운 시작
          </h1>
          <p className="mt-6 text-lg text-white/90 md:text-xl">
            토요타, 소니, 라쿠텐까지. AI 기반 맞춤 정보로 꿈의 직장을 찾아보세요.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 w-full max-w-xl rounded-full bg-white/95 p-2 shadow-2xl backdrop-blur-md">
            <div className="flex gap-2">
              <input
                id="search"
                placeholder="관심있는 기업이나 직무를 검색해보세요"
                className="flex-1 rounded-full bg-white/80 px-5 py-3 text-gray-800 outline-none"
              />
              <button
                onClick={onSearch}
                className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(99,102,241,0.4)]"
              >
                검색하기
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-col items-center justify-center gap-6 text-white md:flex-row md:gap-12">
            <Stat number="500+" label="대기업 정보" />
            <Stat number="1,200+" label="실시간 채용공고" />
            <Stat number="95%" label="합격률 향상" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="ai-tools" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="bg-gradient-to-br from-indigo-500 to-purple-500 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
            왜 NipponJobs인가?
          </h2>
          <p className="mt-3 text-gray-600">기존 사이트와는 차원이 다른 스마트한 취업 준비</p>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon="🤖" title="AI 자기소개서 첨삭" desc="일본 기업 문화에 맞는 ES 작성법을 AI가 실시간으로 피드백해드립니다." />
            <FeatureCard icon="📊" title="기업 분석 리포트" desc="연봉, 워라밸, 승진 구조까지. 오픈워크 데이터 기반 상세 분석을 제공합니다." />
            <FeatureCard icon="🎯" title="맞춤 기업 추천" desc="관심사와 역량을 분석해 숨겨진 우량 기업까지 추천해드립니다." />
            <FeatureCard icon="📚" title="비즈니스 일본어 학습" desc="채용공고에서 추출한 실무 단어로 자연스럽게 일본어 실력을 향상시키세요." />
            <FeatureCard icon="🗓️" title="채용 일정 관리" desc="흩어진 채용 일정을 한 곳에서 관리하고 놓치지 않도록 알림을 받으세요." />
            <FeatureCard icon="👥" title="합격 후기 커뮤니티" desc="선배들의 생생한 면접 후기와 팁을 확인하고 정보를 공유하세요." />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="companies" className="bg-gradient-to-br from-indigo-50 to-sky-100 px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="bg-gradient-to-br from-indigo-500 to-purple-500 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
            인기 직무 카테고리
          </h2>
          <p className="mt-3 text-gray-600">어떤 분야에 관심이 있으신가요?</p>
        </div>

        <CategoryTags
          tags={[
            'IT・개발',
            'AI・데이터',
            '게임',
            '디자인',
            '기획・전략',
            '마케팅・광고',
            '영업',
            '무역・물류',
            '금융',
            '컨설팅',
            '제조・기술',
            '의료・바이오',
          ]}
          onClick={(c) => alert(`${c} 카테고리 페이지로 이동합니다!`)}
        />
      </section>

      {/* Anchor targets (스크롤 데모용) */}
      <div id="community" className="sr-only" />
      <div id="guide" className="sr-only" />
    </main>
  );
}