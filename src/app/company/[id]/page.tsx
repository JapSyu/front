'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Users, Star, TrendingUp, Building2, Globe, Heart, Briefcase, Calendar, Eye, Award, ChevronRight, BarChart3, PieChart, TrendingDown } from 'lucide-react';
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
  // 상세 정보 추가
  detailedDescription?: string;
  ceoMessage?: string;
  companyValues?: string[];
  workCulture?: string;
  salaryBreakdown?: {
    junior: string;
    mid: string;
    senior: string;
    executive: string;
  };
  benefitsDetail?: string[];
  workEnvironment?: {
    remoteWork: string;
    flexTime: string;
    vacationDays: string;
    overtime: string;
  };
  careerProgram?: string[];
  officeInfo?: {
    address: string;
    access: string;
    facilities: string[];
  };
  recentNews?: {
    title: string;
    date: string;
    summary: string;
  }[];
}

interface JobPosting {
  id: number;
  position: string;
  department: string;
  type: string;
  salary: string;
  deadline: string;
  experience: string;
  tags: string[];
}

// Mock Company Data
const mockCompanyData: { [key: string]: Company } = {
  '1': {
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
    },
    detailedDescription: `소니는 전 세계적으로 엔터테인먼트, 전자제품, 금융서비스 분야에서 독창적인 기술과 콘텐츠를 통해 사람들에게 감동을 선사하는 기업입니다.

PlayStation 게임 사업을 중심으로 영화, 음악, 이미징 솔루션까지 다양한 사업 영역에서 혁신을 추구하며, 특히 AI와 로보틱스 분야에서의 기술 개발에 주력하고 있습니다.

직원들의 창의성과 다양성을 존중하며, 글로벌 환경에서 성장할 수 있는 기회를 제공합니다.`,
    
    ceoMessage: "소니는 'Fill the world with emotion, through the power of creativity and technology'라는 목적 하에 전 세계 사람들에게 감동을 선사하고자 합니다. 우리와 함께 미래를 만들어갈 창의적인 인재를 찾습니다.",
    
    companyValues: ['창의성', '다양성', '진실성', '지속가능성', '고객 중심'],
    
    workCulture: '소니는 자유로운 분위기 속에서 개인의 창의성을 최대한 발휘할 수 있는 환경을 제공합니다. 플랫폼팀과 글로벌팀 간의 활발한 협업을 통해 혁신적인 아이디어를 실현할 수 있습니다.',
    
    salaryBreakdown: {
      junior: '450~600만엔',
      mid: '650~850만엔',
      senior: '900~1,200만엔',
      executive: '1,300만엔~'
    },
    
    benefitsDetail: [
      '건강보험, 후생연금, 고용보험 완비',
      '퇴직금제도 및 기업연금',
      '주식매수선택권 제공',
      '연간 상여금 (평균 4~6개월분)',
      '교통비 전액 지급',
      '사내 카페테리아 및 헬스장',
      '자기계발비 지원 (연 10만엔)',
      '출산·육아 휴직제도',
      '장기근속 표창제도',
      '사내 동호회 활동 지원'
    ],
    
    workEnvironment: {
      remoteWork: '주 2회 재택근무 가능',
      flexTime: '플렉스타임제 (코어타임 10:00~15:00)',
      vacationDays: '연차 20일 + 특별휴가 10일',
      overtime: '월 평균 25시간 (업계 평균 이하)'
    },
    
    careerProgram: [
      '글로벌 연수 프로그램',
      '사내 MBA 과정 지원',
      '기술 컨퍼런스 참가 지원',
      '멘토링 프로그램',
      '리더십 개발 과정',
      '어학 교육 프로그램'
    ],
    
    officeInfo: {
      address: '도쿄도 미나토구 코난 1-7-1',
      access: 'JR 시나가와역 도보 5분, 지하철 오사키역 도보 10분',
      facilities: ['사내 카페', '헬스장', '휴게실', '게임룸', '루프탑 가든', '회의실 20개']
    },
    
    recentNews: [
      {
        title: 'PlayStation 5 Pro 글로벌 출시',
        date: '2024-08-15',
        summary: '차세대 게임 콘솔 PlayStation 5 Pro가 전 세계 동시 출시되며 게임 업계에 새로운 혁신을 선도'
      },
      {
        title: 'AI 기반 음악 제작 플랫폼 발표',
        date: '2024-07-28',
        summary: '인공지능을 활용한 음악 제작 및 배급 플랫폼을 발표하여 크리에이터 경제 생태계 확장'
      },
      {
        title: '탄소중립 2030 목표 발표',
        date: '2024-07-10',
        summary: '2030년까지 탄소중립 달성을 목표로 하는 환경경영 전략 발표 및 ESG 경영 강화'
      }
    ]
  },
  '2': {
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
    },
    detailedDescription: `소프트뱅크는 일본 최대의 종합 ICT 기업으로, 이동통신 서비스부터 AI, 로보틱스, 투자까지 다양한 분야에서 혁신을 이끌고 있습니다.

손정의 회장의 비전 하에 정보혁명을 통해 인류에게 행복을 제공한다는 경영이념으로, 미래 기술에 대한 과감한 투자와 혁신을 추구합니다.

데이터 드리븐한 의사결정 문화와 빠른 실행력을 바탕으로 직원들이 성장할 수 있는 도전적인 환경을 제공합니다.`,
    
    ceoMessage: "정보혁명으로 인류에게 행복을 제공한다는 우리의 경영이념 하에, 끊임없는 도전과 혁신을 통해 미래를 만들어갈 인재를 찾고 있습니다.",
    
    companyValues: ['도전', '혁신', '성장', '다양성', '고객만족'],
    
    workCulture: '빠른 의사결정과 실행력을 중시하는 문화입니다. 나가급급하지만 유연한 사고와 혁신적 아이디어가 존중받는 환경에서 개인의 성장과 회사의 발전을 동시에 추구합니다.',
    
    salaryBreakdown: {
      junior: '420~580만엔',
      mid: '600~800만엔',
      senior: '850~1,100만엔',
      executive: '1,200만엔~'
    },
    
    benefitsDetail: [
      '성과급 제도 (연봉의 20~50%)',
      '스톡옵션 제공',
      '유연근무제 (코어타임 10:00~15:00)',
      '재택근무 주 3회 가능',
      '교육비 지원 (연 20만엔)',
      '건강검진 및 의료비 지원',
      '사내 카페테리아',
      '출산·육아 지원제도',
      '장기근속 포상',
      '사내 동호회 지원'
    ],
    
    workEnvironment: {
      remoteWork: '주 3회 재택근무 + 필요시 추가',
      flexTime: '플렉스타임제 (코어타임 10:00~15:00)',
      vacationDays: '연차 20일 + 개인 휴가 5일',
      overtime: '월 평균 35시간 (성과 중심 근무)'
    },
    
    careerProgram: [
      'SoftBank University',
      '해외 파견 프로그램',
      'MBA 지원 프로그램',
      '기술 세미나 정기 개최',
      '멘토링 시스템',
      '리더십 교육 과정'
    ],
    
    officeInfo: {
      address: '도쿄도 미나토구 도쿄 미드타운 타워',
      access: '지하철 롯폰기역 직결, JR 시나가와역 버스 15분',
      facilities: ['Sky Lounge', '피트니스 센터', '카페', '컨퍼런스룸', '창의공간', '휴게실']
    },
    
    recentNews: [
      {
        title: 'Vision Fund 3 설립 발표',
        date: '2024-08-20',
        summary: '3조원 규모의 Vision Fund 3을 설립하여 AI 및 신기술 투자 확대'
      },
      {
        title: '5G 네트워크 커버리지 95% 달성',
        date: '2024-08-01',
        summary: '일본 전국 5G 네트워크 커버리지 95% 달성으로 초연결 사회 구현 가속화'
      }
    ]
  }
};

// Mock Job Postings for Company
const mockJobPostings: { [key: string]: JobPosting[] } = {
  '1': [
    { id: 1, position: 'AI 엔지니어', department: 'R&D센터', type: '정규직', salary: '600~900만엔', deadline: '2024-09-15', experience: '신입~3년', tags: ['AI', 'Python', 'TensorFlow'] },
    { id: 7, position: '게임 개발자', department: 'PlayStation Studios', type: '정규직', salary: '580~850만엔', deadline: '2024-09-20', experience: '경력 2년 이상', tags: ['Unity', 'C#', 'Game Design'] },
    { id: 8, position: 'UX 디자이너', department: '디자인센터', type: '정규직', salary: '520~780만엔', deadline: '2024-09-25', experience: '경력 1~5년', tags: ['Figma', 'Prototyping', 'User Research'] }
  ],
  '2': [
    { id: 2, position: '데이터 사이언티스트', department: '데이터분석부', type: '정규직', salary: '550~800만엔', deadline: '2024-09-20', experience: '경력 2년 이상', tags: ['Python', 'SQL', '머신러닝'] },
    { id: 9, position: '클라우드 엔지니어', department: 'IT인프라부', type: '정규직', salary: '600~900만엔', deadline: '2024-09-18', experience: '경력 3년 이상', tags: ['AWS', 'Kubernetes', 'DevOps'] }
  ]
};

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const companyId = params.id as string;
    
    const companyData = mockCompanyData[companyId];
    const companyJobs = mockJobPostings[companyId] || [];
    
    if (companyData) {
      setCompany(companyData);
      setJobPostings(companyJobs);
      setIsFollowing(companyData.isFollowing);
    }
  }, [params.id]);

  const handleFollow = () => {
    if (!company) return;
    setIsFollowing(!isFollowing);
    // TODO: API 호출
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-4xl mb-4">❌</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">기업 정보를 찾을 수 없습니다</h2>
            <p className="text-gray-600 mb-4">요청하신 기업이 존재하지 않거나 삭제되었습니다.</p>
            <button
              onClick={() => router.push('/companies')}
              className="rounded-lg bg-indigo-500 px-6 py-2 text-white hover:bg-indigo-600 transition-colors"
            >
              기업 목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="pt-20">
        {/* Back Button & Hero */}
        <div className="bg-white border-b">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-6"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>기업 목록으로 돌아가기</span>
            </button>

            {/* Company Hero */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-start gap-8">
                <div className="text-8xl">{company.logo}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h1 className="text-4xl font-bold text-gray-900">{company.name}</h1>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-orange-500">
                        <Star className="h-5 w-5 fill-current" />
                        <span className="text-lg font-bold">{company.rating}</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
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
                  
                  <div className="flex items-center gap-6 text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      <span>{company.industry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span>{company.headquarters}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>설립 {company.founded}</span>
                    </div>
                  </div>

                  <p className="text-lg text-gray-700 mb-6 leading-relaxed max-w-2xl">
                    {company.description}
                  </p>

                  {/* Key Stats Grid */}
                  <div className="grid grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>워라밸</span>
                      </div>
                      <p className="text-2xl font-bold text-indigo-600">{company.workLifeBalance}/5</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-2">
                        <Award className="h-4 w-4" />
                        <span>성장성</span>
                      </div>
                      <p className="text-2xl font-bold text-indigo-600">{company.careerGrowth}/5</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-2">
                        <Heart className="h-4 w-4" />
                        <span>복리후생</span>
                      </div>
                      <p className="text-2xl font-bold text-indigo-600">{company.benefits}/5</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-2">
                        <Briefcase className="h-4 w-4" />
                        <span>채용중</span>
                      </div>
                      <p className="text-2xl font-bold text-indigo-600">{company.activeJobs}개</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleFollow}
                  className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
                    isFollowing
                      ? 'bg-red-50 border border-red-200 text-red-600 hover:bg-red-100'
                      : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFollowing ? 'fill-current' : ''}`} />
                  <span>{isFollowing ? '팔로잉' : '팔로우'}</span>
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 hover:border-gray-400 transition-colors">
                  <Globe className="h-5 w-5" />
                  <span>웹사이트</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 space-y-8">
              {/* Tab Navigation */}
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'overview', label: '기업개요' },
                  { key: 'culture', label: '기업문화' },
                  { key: 'salary', label: '연봉정보' },
                  { key: 'benefits', label: '복리후생' },
                  { key: 'office', label: '근무환경' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                      activeTab === tab.key
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">기업 소개</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                        {company.detailedDescription}
                      </p>
                      
                      {company.ceoMessage && (
                        <div className="bg-indigo-50 p-6 rounded-lg">
                          <h4 className="font-bold text-indigo-800 mb-2">💬 CEO 메시지</h4>
                          <p className="text-indigo-700 italic">"{company.ceoMessage}"</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">핵심 가치</h3>
                      <div className="flex flex-wrap gap-3">
                        {company.companyValues?.map((value, index) => (
                          <span key={index} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full font-medium">
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">기업 통계</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-600 mb-1">직원 수</p>
                          <p className="text-xl font-bold text-gray-900">{company.keyStats.totalEmployees}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-600 mb-1">평균 근속</p>
                          <p className="text-xl font-bold text-gray-900">{company.keyStats.avgTenure}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-600 mb-1">여성 비율</p>
                          <p className="text-xl font-bold text-gray-900">{company.keyStats.femaleRatio}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-600 mb-1">평균 나이</p>
                          <p className="text-xl font-bold text-gray-900">{company.keyStats.avgAge}</p>
                        </div>
                      </div>
                    </div>

                    {company.recentNews && (
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">최근 소식</h3>
                        <div className="space-y-4">
                          {company.recentNews.map((news, index) => (
                            <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-gray-900">{news.title}</h4>
                                <span className="text-sm text-gray-500">{news.date}</span>
                              </div>
                              <p className="text-gray-700 text-sm">{news.summary}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'culture' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">기업 문화</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {company.workCulture}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">성장 지원 프로그램</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {company.careerProgram?.map((program, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Award className="h-5 w-5 text-indigo-500" />
                            <span className="text-gray-700 font-medium">{program}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'salary' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">직급별 연봉 정보</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-bold text-gray-800 mb-2">주니어 (1-3년)</h4>
                          <p className="text-2xl font-bold text-indigo-600">{company.salaryBreakdown?.junior}</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-bold text-gray-800 mb-2">미드레벨 (4-7년)</h4>
                          <p className="text-2xl font-bold text-indigo-600">{company.salaryBreakdown?.mid}</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-bold text-gray-800 mb-2">시니어 (8년+)</h4>
                          <p className="text-2xl font-bold text-indigo-600">{company.salaryBreakdown?.senior}</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-bold text-gray-800 mb-2">임원급</h4>
                          <p className="text-2xl font-bold text-indigo-600">{company.salaryBreakdown?.executive}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-bold text-blue-800 mb-2">💡 연봉 정보</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• 상기 금액은 기본급 기준이며, 성과급 및 스톡옵션 별도</li>
                          <li>• 경력 및 역량에 따라 협상 가능</li>
                          <li>• 연 2회 승진 기회 (4월, 10월)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">복리후생 혜택</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {company.benefitsDetail?.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                            <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'office' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">근무 환경</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-indigo-600 mb-3">
                            <Building2 className="h-5 w-5" />
                            <h4 className="font-bold">근무 조건</h4>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="font-medium text-gray-800">재택근무</p>
                              <p className="text-gray-600">{company.workEnvironment?.remoteWork}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">근무시간</p>
                              <p className="text-gray-600">{company.workEnvironment?.flexTime}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">휴가</p>
                              <p className="text-gray-600">{company.workEnvironment?.vacationDays}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">야근</p>
                              <p className="text-gray-600">{company.workEnvironment?.overtime}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-indigo-600 mb-3">
                            <MapPin className="h-5 w-5" />
                            <h4 className="font-bold">오피스 정보</h4>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="font-medium text-gray-800">주소</p>
                              <p className="text-gray-600">{company.officeInfo?.address}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">교통</p>
                              <p className="text-gray-600">{company.officeInfo?.access}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-bold text-gray-800 mb-3">사내 시설</h4>
                        <div className="flex flex-wrap gap-2">
                          {company.officeInfo?.facilities.map((facility, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-80 space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
                <h3 className="text-lg font-bold text-gray-800 mb-4">기업 정보</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">업종</span>
                    <span className="font-medium text-gray-800">{company.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">규모</span>
                    <span className="font-medium text-gray-800">{company.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">직원 수</span>
                    <span className="font-medium text-gray-800">{company.employees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">설립</span>
                    <span className="font-medium text-gray-800">{company.founded}</span>
                  </div>
                  {company.revenue && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">매출</span>
                      <span className="font-medium text-gray-800">{company.revenue}</span>
                    </div>
                  )}
                  {company.stockPrice && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">주가</span>
                      <span className="font-medium text-green-600">{company.stockPrice}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <p className="text-2xl font-bold text-indigo-600 mb-1">{company.averageSalary}</p>
                  <p className="text-sm text-gray-600">평균 연봉</p>
                </div>
              </div>

              {/* Current Job Postings */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">현재 채용공고</h3>
                  <span className="text-sm text-indigo-600 font-medium">{jobPostings.length}개</span>
                </div>
                <div className="space-y-4">
                  {jobPostings.length > 0 ? (
                    jobPostings.map((job) => {
                      const daysLeft = getDaysUntilDeadline(job.deadline);
                      return (
                        <div 
                          key={job.id} 
                          onClick={() => router.push(`/jobs/${job.id}`)}
                          className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors cursor-pointer"
                        >
                          <div className="mb-2">
                            <h4 className="font-bold text-gray-800">{job.position}</h4>
                            <p className="text-sm text-gray-600">{job.department}</p>
                          </div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-indigo-600 font-medium">{job.salary}</span>
                            <span className={`${daysLeft <= 7 ? 'text-red-500' : 'text-gray-500'}`}>
                              {daysLeft > 0 ? `${daysLeft}일 남음` : '마감'}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {job.tags.map((tag, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-sm">현재 진행 중인 채용이 없습니다.</p>
                  )}
                </div>
                
                {jobPostings.length > 0 && (
                  <button 
                    onClick={() => router.push(`/jobs?company=${company.name}`)}
                    className="w-full mt-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 py-2 text-white font-medium hover:-translate-y-0.5 transition-all"
                  >
                    모든 채용공고 보기
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}