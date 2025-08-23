'use client';

import React, { useState } from 'react';
import { Search, MapPin, Users, Star, TrendingUp, Building2, Globe, Heart, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

// Types
interface Company {
  id: number;
  name: string;
  logo: string;
  industry: string;
  size: string;
  location: string;
  headquarters: string;
  founded: string;
  employees: string;
  rating: number;
  standardScore: number;
  description: string;
  averageSalary: string;
  workLifeBalance: number;
  careerGrowth: number;
  benefits: number;
  activeJobs: number;
  isFollowing: boolean;
  tags: string[];
  stockPrice?: string;
  revenue?: string;
  website: string;
  keyStats: {
    totalEmployees: string;
    avgTenure: string;
    femaleRatio: string;
    avgAge: string;
  };
}

// Mock Data
const mockCompanies: Company[] = [
  {
    id: 1,
    name: '소니 (Sony)',
    logo: '🎮',
    industry: 'IT・게임・엔터테인먼트',
    size: '대기업',
    location: '도쿄',
    headquarters: '도쿄 미나토구',
    founded: '1946년',
    employees: '약 108,900명',
    rating: 4.2,
    standardScore: 75,
    description: '전 세계적으로 PlayStation, 영화, 음악 등 엔터테인먼트 콘텐츠를 제공하는 글로벌 기업',
    averageSalary: '연봉 650~950만엔',
    workLifeBalance: 4.1,
    careerGrowth: 4.3,
    benefits: 4.5,
    activeJobs: 28,
    isFollowing: false,
    tags: ['글로벌', '엔터테인먼트', '혁신기술', '복리후생우수'],
    stockPrice: '¥12,450',
    revenue: '¥13.5조 (2023)',
    website: 'https://sony.com',
    keyStats: {
      totalEmployees: '108,900명',
      avgTenure: '12.3년',
      femaleRatio: '28%',
      avgAge: '42세'
    }
  },
  {
    id: 2,
    name: '소프트뱅크 (SoftBank)',
    logo: '📱',
    industry: 'IT・통신・투자',
    size: '대기업',
    location: '도쿄',
    headquarters: '도쿄 미나토구',
    founded: '1981년',
    employees: '약 47,000명',
    rating: 4.1,
    standardScore: 64,
    description: '일본을 대표하는 종합 ICT 기업으로 통신, AI, 투자 분야에서 글로벌 리더십 발휘',
    averageSalary: '연봉 580~850만엔',
    workLifeBalance: 3.8,
    careerGrowth: 4.2,
    benefits: 4.1,
    activeJobs: 35,
    isFollowing: true,
    tags: ['통신', 'AI', '투자', '혁신'],
    stockPrice: '¥1,890',
    revenue: '¥6.8조 (2023)',
    website: 'https://softbank.jp',
    keyStats: {
      totalEmployees: '47,000명',
      avgTenure: '8.7년',
      femaleRatio: '32%',
      avgAge: '39세'
    }
  },
  {
    id: 3,
    name: '라쿠텐 (Rakuten)',
    logo: '🛒',
    industry: 'IT・이커머스・핀테크',
    size: '대기업',
    location: '도쿄',
    headquarters: '도쿄 세타가야구',
    founded: '1997년',
    employees: '약 28,000명',
    rating: 4.0,
    standardScore: 64,
    description: '일본 최대 이커머스 플랫폼을 운영하며 70개 이상의 인터넷 서비스 제공',
    averageSalary: '연봉 520~780만엔',
    workLifeBalance: 3.9,
    careerGrowth: 4.0,
    benefits: 3.8,
    activeJobs: 42,
    isFollowing: false,
    tags: ['이커머스', '핀테크', '글로벌', '다양성'],
    stockPrice: '¥865',
    revenue: '¥1.9조 (2023)',
    website: 'https://rakuten.com',
    keyStats: {
      totalEmployees: '28,000명',
      avgTenure: '6.2년',
      femaleRatio: '35%',
      avgAge: '36세'
    }
  },
  {
    id: 4,
    name: '메르카리 (Mercari)',
    logo: '💸',
    industry: 'IT・플랫폼・C2C',
    size: '메가벤처',
    location: '도쿄',
    headquarters: '도쿄 미나토구',
    founded: '2013년',
    employees: '약 2,100명',
    rating: 4.3,
    standardScore: 70,
    description: '일본 최대 개인간 거래 플랫폼으로 순환경제 생태계 구축을 선도하는 기업',
    averageSalary: '연봉 550~800만엔',
    workLifeBalance: 4.2,
    careerGrowth: 4.4,
    benefits: 4.0,
    activeJobs: 18,
    isFollowing: true,
    tags: ['스타트업', '순환경제', '혁신', '글로벌'],
    stockPrice: '¥2,340',
    revenue: '¥1,284억 (2023)',
    website: 'https://about.mercari.com',
    keyStats: {
      totalEmployees: '2,100명',
      avgTenure: '3.8년',
      femaleRatio: '41%',
      avgAge: '32세'
    }
  },
  {
    id: 5,
    name: '도요타 (Toyota)',
    logo: '🚗',
    industry: '제조업・자동차・모빌리티',
    size: '대기업',
    location: '아이치현',
    headquarters: '아이치현 도요타시',
    founded: '1937년',
    employees: '약 375,000명',
    rating: 4.4,
    standardScore: 72,
    description: '세계 최대 자동차 제조사로 친환경 모빌리티와 자율주행 기술 개발을 선도',
    averageSalary: '연봉 680~1,200만엔',
    workLifeBalance: 4.0,
    careerGrowth: 4.1,
    benefits: 4.6,
    activeJobs: 52,
    isFollowing: false,
    tags: ['제조업', '친환경', '자율주행', '글로벌'],
    stockPrice: '¥2,890',
    revenue: '¥37.2조 (2023)',
    website: 'https://toyota.com',
    keyStats: {
      totalEmployees: '375,000명',
      avgTenure: '16.8년',
      femaleRatio: '18%',
      avgAge: '40세'
    }
  },
  {
    id: 6,
    name: '후지쯔 (Fujitsu)',
    logo: '💻',
    industry: 'IT・클라우드・DX',
    size: '대기업',
    location: '도쿄',
    headquarters: '도쿄 미나토구',
    founded: '1935년',
    employees: '약 126,000명',
    rating: 3.9,
    standardScore: 58,
    description: '일본을 대표하는 종합 IT 서비스 기업으로 디지털 트랜스포메이션 솔루션 제공',
    averageSalary: '연봉 590~850만엔',
    workLifeBalance: 3.7,
    careerGrowth: 3.8,
    benefits: 4.2,
    activeJobs: 31,
    isFollowing: false,
    tags: ['IT서비스', 'DX', '클라우드', '안정성'],
    stockPrice: '¥14,200',
    revenue: '¥3.7조 (2023)',
    website: 'https://fujitsu.com',
    keyStats: {
      totalEmployees: '126,000명',
      avgTenure: '14.5년',
      femaleRatio: '22%',
      avgAge: '43세'
    }
  }
];

// Filter Options
const industries = ['전체', 'IT・게임', 'IT・통신', 'IT・이커머스', '제조업・자동차', '금융', '컨설팅'];
const locations = ['전체', '도쿄', '오사카', '아이치현', '가나가와현', '후쿠오카'];
const companySizes = ['전체', '대기업', '메가벤처', '중견기업', '스타트업'];
const salaryRanges = ['전체', '~500만엔', '500~700만엔', '700~900만엔', '900만엔~'];

// CompanyCard Component
function CompanyCard({ company, onFollow }: { company: Company; onFollow: (companyId: number, following: boolean) => void }) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(company.isFollowing);
  
  const handleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFollowing(!isFollowing);
    onFollow(company.id, !isFollowing);
  };

  const handleCardClick = () => {
    router.push(`/companies/${company.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200"
    >
      {/* Company Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="text-5xl">{company.logo}</div>
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <h3 className="text-xl font-bold text-gray-800">{company.name}</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-orange-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium">{company.rating}</span>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  company.standardScore >= 70 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                    : company.standardScore >= 60
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' 
                    : 'bg-gradient-to-r from-slate-400 to-gray-500 text-white'
                }`}>
                  편차 {company.standardScore}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">{company.industry}</p>
            <p className="text-sm text-gray-500">{company.size} • {company.location}</p>
          </div>
        </div>
        
        <button
          onClick={handleFollow}
          className={`rounded-full p-2 transition-all hover:scale-110 ${
            isFollowing 
              ? 'bg-red-50 text-red-500 hover:bg-red-100' 
              : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
          }`}
        >
          <Heart className={`h-5 w-5 ${isFollowing ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Company Description */}
      <p className="mb-4 text-sm text-gray-700 line-clamp-2">{company.description}</p>

      {/* Stats Grid */}
      <div className="mb-4 grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-3">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-gray-600 mb-1">
            <TrendingUp className="h-3 w-3" />
            <span>워라밸</span>
          </div>
          <p className="font-bold text-sm text-indigo-600">{company.workLifeBalance}/5</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-gray-600 mb-1">
            <Users className="h-3 w-3" />
            <span>성장</span>
          </div>
          <p className="font-bold text-sm text-indigo-600">{company.careerGrowth}/5</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-gray-600 mb-1">
            <Building2 className="h-3 w-3" />
            <span>복리후생</span>
          </div>
          <p className="font-bold text-sm text-indigo-600">{company.benefits}/5</p>
        </div>
      </div>

      {/* Salary & Jobs */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-gray-900">{company.averageSalary}</p>
          <p className="text-sm text-gray-600">평균 연봉</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-indigo-600">{company.activeJobs}개</p>
          <p className="text-sm text-gray-600">채용 중</p>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        {company.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="rounded-full bg-indigo-50 text-indigo-600 px-3 py-1 text-xs font-medium transition-colors group-hover:bg-indigo-100"
          >
            {tag}
          </span>
        ))}
        {company.tags.length > 3 && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
            +{company.tags.length - 3}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 py-2 px-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
          채용공고 보기
        </button>
        <button className="rounded-lg border border-gray-300 p-2 text-gray-600 transition-all hover:border-indigo-300 hover:text-indigo-600">
          <Globe className="h-4 w-4" />
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
            className={`rounded-full px-3 py-1 text-sm transition-all ${
              selected === option
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
export default function CompaniesListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('전체');
  const [selectedLocation, setSelectedLocation] = useState('전체');
  const [selectedCompanySize, setSelectedCompanySize] = useState('전체');
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('전체');
  const [companies, setCompanies] = useState(mockCompanies);
  const [sortBy, setSortBy] = useState('rating');

  // Filter companies based on selected criteria
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesIndustry = selectedIndustry === '전체' || company.industry.includes(selectedIndustry);
    const matchesLocation = selectedLocation === '전체' || company.location === selectedLocation;
    const matchesCompanySize = selectedCompanySize === '전체' || company.size === selectedCompanySize;
    
    // Salary range matching logic
    const matchesSalaryRange = selectedSalaryRange === '전체' || (() => {
      const salaryText = company.averageSalary;
      const salaryNumbers = salaryText.match(/\d+/g)?.map(Number);
      if (!salaryNumbers) return false;
      
      const minSalary = salaryNumbers[0];
      switch (selectedSalaryRange) {
        case '~500만엔': return minSalary < 500;
        case '500~700만엔': return minSalary >= 500 && minSalary < 700;
        case '700~900만엔': return minSalary >= 700 && minSalary < 900;
        case '900만엔~': return minSalary >= 900;
        default: return true;
      }
    })();

    return matchesSearch && matchesIndustry && matchesLocation && matchesCompanySize && matchesSalaryRange;
  });

  // Sort companies
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'standardScore':
        return b.standardScore - a.standardScore;
      case 'activeJobs':
        return b.activeJobs - a.activeJobs;
      case 'employees':
        const getEmployeeCount = (str: string) => {
          const match = str.match(/약?\s*([0-9,]+)명/);
          return match ? parseInt(match[1].replace(/,/g, '')) : 0;
        };
        return getEmployeeCount(b.employees) - getEmployeeCount(a.employees);
      default:
        return 0;
    }
  });

  const handleFollow = (companyId: number, following: boolean) => {
    setCompanies(companies.map(company => 
      company.id === companyId ? { ...company, isFollowing: following } : company
    ));
  };

  const resetFilters = () => {
    setSelectedIndustry('전체');
    setSelectedLocation('전체');
    setSelectedCompanySize('전체');
    setSelectedSalaryRange('전체');
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
                기업정보
              </h1>
              <p className="mt-1 text-gray-600">
                일본 주요 기업들의 상세 정보를 확인하고 비교해보세요
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-600">{sortedCompanies.length}</p>
              <p className="text-sm text-gray-600">개 기업</p>
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
                    placeholder="기업명, 업종, 특징 검색"
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
                  <option value="rating">평점순</option>
                  <option value="standardScore">편차치순</option>
                  <option value="activeJobs">채용공고순</option>
                  <option value="employees">회사규모순</option>
                </select>
              </div>

              <div className="space-y-6">
                <FilterSection
                  title="업종"
                  options={industries}
                  selected={selectedIndustry}
                  onSelect={setSelectedIndustry}
                />
                
                <FilterSection
                  title="지역"
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
                  title="연봉대"
                  options={salaryRanges}
                  selected={selectedSalaryRange}
                  onSelect={setSelectedSalaryRange}
                />
              </div>
            </div>
          </div>

          {/* Main Content - Company List */}
          <div className="flex-1">
            {/* Mobile Search */}
            <div className="mb-6 lg:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="기업명, 업종, 특징 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            </div>

            {sortedCompanies.length === 0 ? (
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
                {sortedCompanies.map((company) => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                    onFollow={handleFollow}
                  />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {sortedCompanies.length > 0 && (
              <div className="mt-12 text-center">
                <button className="rounded-lg border border-gray-300 px-8 py-3 font-medium text-gray-700 transition-all hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5">
                  더 많은 기업정보 보기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}