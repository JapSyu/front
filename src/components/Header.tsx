'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      const goingDown = y > lastY.current;
      const delta = Math.abs(y - lastY.current);
      if (delta > 8) {
        const threshold = 72;
        setHidden(y > threshold ? goingDown : false);
        lastY.current = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const smooth = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      ref={headerRef}
      className={[
        'fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-all duration-300',
        scrolled ? 'bg-white/95 shadow-lg border-b border-gray-200/50' : 'bg-transparent shadow-none border-b border-transparent',
        hidden ? '-translate-y-full' : 'translate-y-0',
      ].join(' ')}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* 좌측: 로고 */}
        <Link
          href="/"
          className="text-xl font-extrabold bg-gradient-to-br from-indigo-500 to-purple-500 bg-clip-text text-transparent md:text-2xl"
          onClick={() => setOpen(false)}
        >
          JAP SYU
        </Link>

        {/* 우측: 데스크톱 네비 + 버튼 */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            <li><Link href="/company" className="font-medium text-gray-700 transition hover:text-indigo-600">기업 정보</Link></li>
            <li><Link href="/jobs" className="font-medium text-gray-700 transition hover:text-indigo-600">채용 정보</Link></li>
            <li><Link href="/hensachi" className="font-medium text-gray-700 transition hover:text-indigo-600">편차치 랭킹</Link></li>
            <li><Link href="/ai-tools" className="font-medium text-gray-700 transition hover:text-indigo-600">AI 도구</Link></li>
            <li><Link href="/community" className="font-medium text-gray-700 transition hover:text-indigo-600">커뮤니티</Link></li>
            <li><Link href="/guide" className="font-medium text-gray-700 transition hover:text-indigo-600">가이드</Link></li>
          </ul>
          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-full border-2 border-indigo-400 px-4 py-2 font-semibold text-indigo-500 transition hover:-translate-y-0.5 hover:bg-indigo-500 hover:text-white">
              로그인
            </Link>
            <Link href="/signup" className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 px-4 py-2 font-semibold text-white transition hover:-translate-y-0.5">
              회원가입
            </Link>
          </div>
        </div>

        {/* 모바일: 햄버거 + 얇은 로그인 버튼 */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/login" className="rounded-full border px-3 py-1 text-sm font-semibold text-indigo-600 border-indigo-300">
            로그인
          </Link>
          <button
            aria-label="메뉴 열기"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300"
          >
            <span className="sr-only">메뉴</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-gray-800" />
              <span className="block h-0.5 w-5 bg-gray-800" />
              <span className="block h-0.5 w-5 bg-gray-800" />
            </div>
          </button>
        </div>
      </nav>

      {/* 모바일 드롭다운 메뉴 */}
      <div
        id="mobile-menu"
        className={[
          'md:hidden overflow-hidden border-t border-gray-200 bg-white/95 backdrop-blur-md transition-all duration-300 ease-out',
          open ? 'max-h-[360px] py-3 opacity-100' : 'max-h-0 py-0 opacity-0',
        ].join(' ')}
      >
        <div className="mx-auto max-w-6xl px-4">
          <ul className="flex flex-col gap-1">
            <li><Link href="/company" onClick={() => setOpen(false)} className="block rounded-md px-2 py-2 text-gray-800 hover:bg-gray-100">기업 정보</Link></li>
            <li><Link href="/jobs" onClick={() => setOpen(false)} className="block rounded-md px-2 py-2 text-gray-800 hover:bg-gray-100">채용 정보</Link></li>
            <li><Link href="/hensachi" onClick={() => setOpen(false)} className="block rounded-md px-2 py-2 text-gray-800 hover:bg-gray-100">편차치 랭킹</Link></li>
            <li><Link href="/ai-tools" onClick={() => setOpen(false)} className="block rounded-md px-2 py-2 text-gray-800 hover:bg-gray-100">AI 도구</Link></li>
            <li><Link href="/community" onClick={() => setOpen(false)} className="block rounded-md px-2 py-2 text-gray-800 hover:bg-gray-100">커뮤니티</Link></li>
            <li><Link href="/guide" onClick={() => setOpen(false)} className="block rounded-md px-2 py-2 text-gray-800 hover:bg-gray-100">가이드</Link></li>
          </ul>
          <div className="mt-3 flex gap-2">
            <Link href="/signup" onClick={() => setOpen(false)} className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-center font-semibold text-white">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}