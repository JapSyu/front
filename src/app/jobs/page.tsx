// 채용 리스트 페이지
'use client';

import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Star, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import Header from '@/components/Header';

// Types
interface Job {
    id: number;
    company: string;
    logo: string;
    position: string;
    department: string;
    type: string;
    location: string;
    salary: string;
    deadline: string;
    experience: string;
    tags: string[];
    description: string;
    rating: number; // 오픈 워크 평점
    standardScore: number;
    bookmarked: boolean;
    isNew: boolean;
    companySize: string;
    industry: string;
}

// Mock Data
const mockJobs: Job[] = [
    {
        id: 1,
        company: '소니 (Sony)',
        logo: '🎮',
        position: 'AI 엔지니어',
        department: 'R&D센터',
        type: '정규직',
        location: '도쿄',
        salary: '연봉 600~900만엔',
        deadline: '2024-09-15',
        experience: '신입~3년',
        tags: ['AI', 'Python', 'TensorFlow', '일본어 N2'],
        description: 'PlayStation의 차세대 AI 기술 개발을 담당할 엔지니어를 모집합니다.',
        rating: 4.2,
        standardScore: 75,
        bookmarked: false,
        isNew: true,
        companySize: '대기업',
        industry: 'IT・게임'
    },
    {
        id: 2,
        company: '소프트뱅크 (SoftBank)',
        logo: '📱',
        position: '데이터 사이언티스트',
        department: '데이터분석부',
        type: '정규직',
        location: '도쿄',
        salary: '연봉 550~800만엔',
        deadline: '2024-09-20',
        experience: '경력 2년 이상',
        tags: ['Python', 'SQL', '머신러닝', 'AWS'],
        description: '통신 빅데이터를 활용한 비즈니스 인사이트 도출 및 예측 모델 개발',
        rating: 4.1,
        standardScore: 64,
        bookmarked: true,
        isNew: false,
        companySize: '대기업',
        industry: 'IT・통신'
    },
    {
        id: 3,
        company: '라쿠텐 (Rakuten)',
        logo: '🛒',
        position: '백엔드 개발자',
        department: 'EC플랫폼개발부',
        type: '정규직',
        location: '도쿄',
        salary: '연봉 500~750만엔',
        deadline: '2024-09-25',
        experience: '신입~5년',
        tags: ['Java', 'Spring', 'Kubernetes', 'Docker'],
        description: '일본 최대 이커머스 플랫폼의 백엔드 시스템 개발 및 운영',
        rating: 4.0,
        standardScore: 64,
        bookmarked: false,
        isNew: true,
        companySize: '대기업',
        industry: 'IT・이커머스'
    },
    {
        id: 4,
        company: '메르카리 (Mercari)',
        logo: '💸',
        position: '프론트엔드 개발자',
        department: '플랫폼개발팀',
        type: '정규직',
        location: '도쿄',
        salary: '연봉 480~700만엔',
        deadline: '2024-09-30',
        experience: '경력 1년 이상',
        tags: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
        description: '중고거래 앱의 사용자 경험 향상을 위한 프론트엔드 개발',
        rating: 4.3,
        standardScore: 70,
        bookmarked: false,
        isNew: false,
        companySize: '메가벤처',
        industry: 'IT・서비스'
    },
    {
        id: 5,
        company: '도요타 (Toyota)',
        logo: '🚗',
        position: '자율주행 소프트웨어 엔지니어',
        department: '모빌리티 개발본부',
        type: '정규직',
        location: '아이치현',
        salary: '연봉 650~950만엔',
        deadline: '2024-10-05',
        experience: '경력 3년 이상',
        tags: ['C++', 'ROS', '자율주행', 'Computer Vision'],
        description: '차세대 자율주행 시스템 개발 및 실차 테스트 담당',
        rating: 4.4,
        standardScore: 72,
        bookmarked: true,
        isNew: true,
        companySize: '대기업',
        industry: '제조업・자동차'
    },
    {
        id: 6,
        company: '후지쯔 (Fujitsu)',
        logo: '💻',
        position: '클라우드 아키텍트',
        department: 'DX솔루션부',
        type: '정규직',
        location: '도쿄',
        salary: '연봉 580~820만엔',
        deadline: '2024-10-10',
        experience: '경력 4년 이상',
        tags: ['AWS', 'Azure', 'Terraform', 'DevOps'],
        description: '엔터프라이즈 클라우드 솔루션 설계 및 구축',
        rating: 3.9,
        standardScore: 69,
        bookmarked: false,
        isNew: false,
        companySize: '대기업',
        industry: 'IT・서비스'
    }
];

// Filter Options
const categories = ['전체', 'IT・개발', 'AI・데이터', '게임', '제조업', '금융', '컨설팅'];
const locations = ['전체', '도쿄', '오사카', '아이치현', '가나가와현', '후쿠오카'];
const companySizes = ['전체', '대기업', '메가벤처', '오오테'];
const experiences = ['전체', '신입', '경력 1년', '경력 3년', '경력 5년+'];

// JobCard Component
function JobCard({ job, onBookmark }: { job: Job; onBookmark: (jobId: number, bookmarked: boolean) => void }) {
    const [isBookmarked, setIsBookmarked] = useState(job.bookmarked);

    const handleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsBookmarked(!isBookmarked);
        onBookmark(job.id, !isBookmarked);
    };

    const getDaysUntilDeadline = (deadline: string) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysLeft = getDaysUntilDeadline(job.deadline);

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200">
            {/* New Badge */}
            {job.isNew && (
                <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-rose-400 to-orange-400 px-3 py-1 text-xs font-bold text-white">
                    NEW
                </div>
            )}

            {/* Bookmark Button */}
            <button
                onClick={handleBookmark}
                className="absolute right-4 top-12 rounded-full bg-white p-2 shadow-md transition-all hover:scale-110 hover:shadow-lg"
            >
                {isBookmarked ? (
                    <BookmarkCheck className="h-5 w-5 text-indigo-500" />
                ) : (
                    <Bookmark className="h-5 w-5 text-gray-400" />
                )}
            </button>

            {/* Company Header */}
            <div className="mb-4 flex items-start gap-4">
                <div className="text-4xl">{job.logo}</div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-800">{job.company}</h3>
                        {/* Rating */}
                        <div className="flex items-center gap-1 text-sm text-orange-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span>{job.rating}</span>
                        </div>
                        {/* Standard Score */}
                        {/* To Do: 마우스 올리면 상세 정보 표시 ex) IT 편차: 65, 종합 편차: 70  (이 정보는 Corp-ratings(링크) 사이트 기준입니다.) */}
                        <div className="flex items-center gap-1">
                            <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${job.standardScore >= 70
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                                    : job.standardScore >= 60
                                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                                        : 'bg-gradient-to-r from-slate-400 to-gray-500 text-white'
                                }`}>
                                편차 {job.standardScore}
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600">{job.companySize} • {job.industry}</p>
                </div>
            </div>

            {/* Job Info */}
            <div className="mb-4">
                <h4 className="mb-2 text-xl font-bold text-gray-900">{job.position}</h4>
                <p className="mb-3 text-sm text-gray-600 line-clamp-2">{job.description}</p>

                <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span className={daysLeft <= 7 ? 'text-red-500 font-medium' : ''}>
                            {daysLeft > 0 ? `${daysLeft}일 남음` : '마감'}
                        </span>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-lg font-bold text-indigo-600">{job.salary}</p>
                </div>
            </div>

            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
                {job.tags.slice(0, 4).map((tag, index) => (
                    <span
                        key={index}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600"
                    >
                        {tag}
                    </span>
                ))}
                {job.tags.length > 4 && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                        +{job.tags.length - 4}
                    </span>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                {/*상세 페이지로 이동 */}
                <button className="flex-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 py-2 px-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    상세 보기
                </button>
                {/* 기업 채용 공고 페이지로 이동 */}
                <button className="flex-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 py-2 px-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    지원하기
                </button>
                <button className="rounded-lg border border-gray-300 p-2 text-gray-600 transition-all hover:border-indigo-300 hover:text-indigo-600">
                    <ExternalLink className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

// FilterSection Component
function FilterSection({ title, options, selected, onSelect }: {
    title: string;
    options: string[];
    selected: string;
    onSelect: (option: string) => void;
}) {
    return (
        <div className="space-y-2">
            <h4 className="font-medium text-gray-800">{title}</h4>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => onSelect(option)}
                        className={`rounded-full px-3 py-1 text-sm transition-all ${selected === option
                                ? 'bg-indigo-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

// Main Component
export default function JobListPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [selectedLocation, setSelectedLocation] = useState('전체');
    const [selectedCompanySize, setSelectedCompanySize] = useState('전체');
    const [selectedExperience, setSelectedExperience] = useState('전체');
    const [jobs, setJobs] = useState(mockJobs);
    const [sortBy, setSortBy] = useState('latest');

    // Filter jobs based on selected criteria
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === '전체' || job.industry.includes(selectedCategory);
        const matchesLocation = selectedLocation === '전체' || job.location === selectedLocation;
        const matchesCompanySize = selectedCompanySize === '전체' || job.companySize === selectedCompanySize;
        const matchesExperience = selectedExperience === '전체' || job.experience.includes(selectedExperience);

        return matchesSearch && matchesCategory && matchesLocation && matchesCompanySize && matchesExperience;
    });

    // Sort jobs
    const sortedJobs = [...filteredJobs].sort((a, b) => {
        switch (sortBy) {
            case 'latest':
                return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
            case 'salary':
                const getSalaryNum = (salary: string) => {
                    const match = salary.match(/\d+/);
                    return match ? parseInt(match[0]) : 0;
                };
                return getSalaryNum(b.salary) - getSalaryNum(a.salary);
            case 'rating':
                return b.rating - a.rating;
            case 'deadline':
                return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
            default:
                return 0;
        }
    });

    const handleBookmark = (jobId: number, bookmarked: boolean) => {
        setJobs(jobs.map(job =>
            job.id === jobId ? { ...job, bookmarked } : job
        ));
    };

    const resetFilters = () => {
        setSelectedCategory('전체');
        setSelectedLocation('전체');
        setSelectedCompanySize('전체');
        setSelectedExperience('전체');
        setSearchTerm('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Header />

            {/* Header Section */}
            <div className="bg-white shadow-sm pt-20">
                <div className="mx-auto max-w-7xl px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                채용정보
                            </h1>
                            <p className="mt-1 text-gray-600">
                                일본 대기업의 최신 채용공고를 확인하세요
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-indigo-600">{sortedJobs.length}</p>
                            <p className="text-sm text-gray-600">개의 채용공고</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="flex gap-8">
                    {/* Sidebar - Filters */}
                    <div className="w-80 space-y-6 hidden lg:block">
                        <div className="rounded-2xl bg-white p-6 shadow-md sticky top-24">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-800">필터</h3>
                                <button
                                    onClick={resetFilters}
                                    className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                                >
                                    초기화
                                </button>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="기업명, 직무, 기술스택 검색"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    />
                                </div>
                            </div>

                            {/* Sort */}
                            <div className="mb-6">
                                <h4 className="mb-2 font-medium text-gray-800">정렬</h4>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm outline-none focus:border-indigo-500"
                                >
                                    <option value="latest">최신순</option>
                                    <option value="deadline">마감임박순</option>
                                    <option value="salary">연봉높은순</option>
                                    <option value="rating">평점높은순</option>
                                </select>
                            </div>

                            <div className="space-y-6">
                                <FilterSection
                                    title="직무 카테고리"
                                    options={categories}
                                    selected={selectedCategory}
                                    onSelect={setSelectedCategory}
                                />

                                <FilterSection
                                    title="근무지역"
                                    options={locations}
                                    selected={selectedLocation}
                                    onSelect={setSelectedLocation}
                                />

                                <FilterSection
                                    title="회사규모"
                                    options={companySizes}
                                    selected={selectedCompanySize}
                                    onSelect={setSelectedCompanySize}
                                />

                                <FilterSection
                                    title="경력"
                                    options={experiences}
                                    selected={selectedExperience}
                                    onSelect={setSelectedExperience}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Job List */}
                    <div className="flex-1">
                        {/* Mobile Search */}
                        <div className="mb-6 lg:hidden">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="기업명, 직무, 기술스택 검색"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>
                        </div>

                        {sortedJobs.length === 0 ? (
                            <div className="rounded-2xl bg-white p-12 text-center shadow-md">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    검색 결과가 없습니다
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    다른 검색어나 필터를 시도해보세요
                                </p>
                                <button
                                    onClick={resetFilters}
                                    className="rounded-lg bg-indigo-500 px-6 py-2 text-white transition-colors hover:bg-indigo-600"
                                >
                                    필터 초기화
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-6 lg:grid-cols-2">
                                {sortedJobs.map((job) => (
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                        onBookmark={handleBookmark}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Load More Button */}
                        {sortedJobs.length > 0 && (
                            <div className="mt-12 text-center">
                                <button className="rounded-lg border border-gray-300 px-8 py-3 font-medium text-gray-700 transition-all hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5">
                                    더 많은 채용정보 보기
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}