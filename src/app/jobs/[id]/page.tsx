'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Calendar, Users, Star, Bookmark, BookmarkCheck, Share2, Building2, Clock, Briefcase, GraduationCap, Zap, Heart } from 'lucide-react';
import Header from '@/components/Header';

// Types (기존과 동일)
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
  rating: number;
  standardScore: number;
  bookmarked: boolean;
  isNew: boolean;
  companySize: string;
  industry: string;
  // 상세 정보 추가
  detailedDescription?: string;
  requirements?: string[];
  preferredRequirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  workingHours?: string;
  probationPeriod?: string;
  applicationProcess?: string[];
  companyDescription?: string;
  teamSize?: string;
  remoteWork?: string;
}

// Mock Data (ID별 다른 데이터)
const mockJobsData: { [key: string]: Job } = {
  '1': {
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
    tags: ['AI', 'Python', 'TensorFlow', '일본어 N2', 'PyTorch', 'Computer Vision', 'NLP'],
    description: 'PlayStation의 차세대 AI 기술 개발을 담당할 엔지니어를 모집합니다.',
    rating: 4.2,
    standardScore: 75,
    bookmarked: false,
    isNew: true,
    companySize: '대기업',
    industry: 'IT・게임',
    detailedDescription: `소니 인터랙티브 엔터테인먼트(SIE)의 R&D센터에서 PlayStation 플랫폼의 차세대 AI 기술을 개발할 엔지니어를 모집합니다. 

게임 AI, 콘텐츠 생성 AI, 사용자 경험 개선을 위한 머신러닝 알고리즘 개발 등 다양한 프로젝트에 참여하며, 전 세계 게이머들에게 새로운 경험을 선사할 혁신적인 기술을 만들어갈 수 있습니다.`,
    requirements: [
      '컴퓨터 사이언스 또는 관련 분야 학사 이상',
      'Python 개발 경험 2년 이상',
      'TensorFlow 또는 PyTorch 프레임워크 경험',
      '머신러닝/딥러닝 기초 지식',
      '일본어 JLPT N2 이상 또는 비즈니스 레벨 영어'
    ],
    preferredRequirements: [
      'Computer Vision 또는 NLP 프로젝트 경험',
      'GPU 프로그래밍 (CUDA) 경험',
      '게임 개발 또는 엔터테인먼트 업계 경험',
      '논문 발표 또는 오픈소스 기여 경험',
      'AWS, GCP 등 클라우드 플랫폼 경험'
    ],
    responsibilities: [
      'PlayStation 플랫폼 AI 기능 설계 및 개발',
      '게임 내 AI 시스템 최적화 및 성능 개선',
      '사용자 데이터 분석을 통한 개인화 알고리즘 개발',
      '신기술 조사 및 프로토타입 개발',
      '국내외 개발팀과의 협업 및 기술 공유'
    ],
    benefits: [
      '연봉 협상 가능 (경력 및 역량에 따라)',
      '주식매수선택권 (스톡옵션) 제공',
      '연간 상여금 (평균 4~6개월분)',
      '건강보험, 후생연금, 고용보험 완비',
      '교통비 전액 지급 (월 5만엔 한도)',
      '점심식사 지원 (월 1만엔)',
      '자기계발비 지원 (연 10만엔)',
      '유연근무제 및 재택근무 가능',
      '연차 20일 + 특별휴가',
      '사내 헬스장 및 휴게시설 이용 가능'
    ],
    workingHours: '9:00~18:00 (실노동 8시간, 점심시간 1시간)',
    probationPeriod: '3개월',
    teamSize: '12명 (PM 1명, 시니어 엔지니어 4명, 주니어 엔지니어 7명)',
    remoteWork: '주 2회 재택근무 가능',
    applicationProcess: [
      '서류 심사 (1주일)',
      '1차 기술 면접 (화상면접 가능)',
      '2차 실무 면접 + 코딩테스트',
      '임원 면접',
      '최종 합격 통보'
    ],
    companyDescription: `소니는 1946년 창립 이래 혁신적인 기술과 콘텐츠로 전 세계 사람들에게 감동을 선사해왔습니다. PlayStation, 영화, 음악, 이미징 등 다양한 분야에서 글로벌 리더십을 발휘하고 있으며, 특히 엔터테인먼트와 기술의 융합을 통해 새로운 가치를 창출하고 있습니다.`
  },
  '2': {
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
    tags: ['Python', 'SQL', '머신러닝', 'AWS', 'Spark', 'Tableau'],
    description: '통신 빅데이터를 활용한 비즈니스 인사이트 도출 및 예측 모델 개발',
    rating: 4.1,
    standardScore: 64,
    bookmarked: true,
    isNew: false,
    companySize: '대기업',
    industry: 'IT・통신',
    detailedDescription: `소프트뱅크 데이터분석부에서 통신 서비스의 방대한 데이터를 활용하여 비즈니스 가치를 창출할 데이터 사이언티스트를 모집합니다.

고객 행동 분석, 네트워크 최적화, 매출 예측 등 다양한 프로젝트를 통해 회사의 의사결정을 지원하고, AI 기반 서비스 개발에 참여하게 됩니다.`,
    requirements: [
      '통계학, 컴퓨터공학 또는 관련 분야 학사 이상',
      'Python, SQL 사용 경험 2년 이상',
      '머신러닝 알고리즘 이해 및 적용 경험',
      '데이터 분석 프로젝트 경험',
      '일본어 비즈니스 레벨 또는 JLPT N1'
    ],
    preferredRequirements: [
      '통신업계 또는 대용량 데이터 분석 경험',
      'Spark, Hadoop 등 빅데이터 기술 경험',
      'AWS, GCP 클라우드 환경에서의 개발 경험',
      'Tableau, PowerBI 등 BI 도구 활용 경험',
      '석사 이상 또는 관련 자격증 보유'
    ],
    responsibilities: [
      '통신 데이터 분석 및 인사이트 도출',
      '고객 행동 예측 모델 개발 및 운영',
      '비즈니스 KPI 모니터링 대시보드 구축',
      '데이터 기반 A/B 테스트 설계 및 분석',
      '경영진 대상 데이터 분석 결과 보고'
    ],
    benefits: [
      '성과급 포함 연봉 협상 가능',
      '주식매수선택권 제공',
      '유연근무제 (코어타임 10:00-15:00)',
      '재택근무 주 3회 가능',
      '교육비 지원 (연 20만엔)',
      '건강검진 및 의료비 지원',
      '사내 카페테리아 및 헬스장 이용',
      '장기근속 포상제도',
      '출산·육아 휴직 제도',
      '사내 동호회 활동 지원'
    ],
    workingHours: '9:30~18:30 (실노동 8시간)',
    probationPeriod: '6개월',
    teamSize: '15명 (팀장 1명, 시니어 DS 5명, DS 9명)',
    remoteWork: '주 3회 재택근무 가능 (코어타임 출근)',
    applicationProcess: [
      '서류 심사 및 포트폴리오 검토 (2주일)',
      '1차 기술 면접 (데이터 분석 과제)',
      '2차 실무 면접 (프레젠테이션)',
      '3차 임원 면접',
      '최종 합격 및 조건 협의'
    ],
    companyDescription: `소프트뱅크는 일본을 대표하는 종합 ICT 기업으로, 이동통신, 브로드밴드, AI 등 다양한 분야에서 혁신을 이끌고 있습니다. 데이터 중심의 의사결정 문화를 바탕으로 차세대 디지털 서비스를 만들어가고 있습니다.`
  },
  '3': {
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
    tags: ['Java', 'Spring', 'Kubernetes', 'Docker', 'MySQL', 'Redis'],
    description: '일본 최대 이커머스 플랫폼의 백엔드 시스템 개발 및 운영',
    rating: 4.0,
    standardScore: 64,
    bookmarked: false,
    isNew: true,
    companySize: '대기업',
    industry: 'IT・이커머스',
    detailedDescription: `라쿠텐 이커머스 플랫폼의 핵심 백엔드 시스템을 개발하고 운영하는 엔지니어를 모집합니다.

월간 수억 건의 트랜잭션을 처리하는 대규모 서비스 개발 경험을 쌓을 수 있으며, 최신 마이크로서비스 아키텍처와 클라우드 기술을 활용한 개발 환경에서 성장할 수 있습니다.`,
    requirements: [
      '컴퓨터공학 또는 관련 분야 전공',
      'Java, Spring Framework 개발 경험',
      'RESTful API 설계 및 개발 경험',
      '데이터베이스 설계 및 쿼리 최적화 경험',
      '일본어 일상회화 수준 (JLPT N3 이상)'
    ],
    preferredRequirements: [
      '대용량 트래픽 처리 경험',
      'Docker, Kubernetes 등 컨테이너 기술 경험',
      'AWS 클라우드 서비스 사용 경험',
      '이커머스 또는 결제 시스템 개발 경험',
      'Agile/Scrum 개발 방법론 경험'
    ],
    responsibilities: [
      '이커머스 플랫폼 백엔드 API 개발',
      '대용량 트래픽 대응 시스템 설계 및 개발',
      '데이터베이스 최적화 및 성능 튜닝',
      '마이크로서비스 아키텍처 구축 및 운영',
      '코드 리뷰 및 품질 관리'
    ],
    benefits: [
      '입사 시 MacBook Pro 지급',
      '개발도서 및 온라인 강의 무제한 지원',
      '컨퍼런스 참가비 지원',
      '사내 기술 세미나 정기 개최',
      '점심식사 무료 제공',
      '간식 및 음료 무료',
      '연차 25일 + 개인 휴가 5일',
      '건강검진 및 예방접종 지원',
      '기술 자격증 취득 시 보상금',
      '사내 어학 교육 프로그램'
    ],
    workingHours: '10:00~19:00 (플렉스타임)',
    probationPeriod: '3개월',
    teamSize: '8명 (테크리드 1명, 시니어 개발자 3명, 개발자 4명)',
    remoteWork: '주 2회 재택근무 + 필요시 추가 재택 가능',
    applicationProcess: [
      '서류 심사',
      '1차 기술 면접 (라이브 코딩)',
      '2차 시스템 설계 면접',
      '3차 문화적합성 면접',
      '최종 합격'
    ],
    companyDescription: `라쿠텐은 일본 최대의 인터넷 서비스 기업으로, 이커머스를 중심으로 핀테크, 모바일, 디지털 콘텐츠 등 70개 이상의 서비스를 운영하고 있습니다. 글로벌 시장에서도 활발히 사업을 전개하고 있어 다양한 기술적 도전이 가능합니다.`
  }
};

// Similar Jobs Mock Data (ID별 다른 추천)
const getSimilarJobs = (currentId: number) => {
  const allSimilar = [
    { id: 4, company: '메르카리 (Mercari)', logo: '💸', position: '프론트엔드 개발자', salary: '연봉 480~700만엔', tags: ['React', 'TypeScript', 'Next.js'] },
    { id: 5, company: '도요타 (Toyota)', logo: '🚗', position: '자율주행 SW 엔지니어', salary: '연봉 650~950만엔', tags: ['C++', 'ROS', '자율주행'] },
    { id: 6, company: '후지쯔 (Fujitsu)', logo: '💻', position: '클라우드 아키텍트', salary: '연봉 580~820만엔', tags: ['AWS', 'Azure', 'DevOps'] },
    { id: 7, company: '닌텐도 (Nintendo)', logo: '🎮', position: 'ML 엔지니어', salary: '연봉 580~850만엔', tags: ['Python', 'ML', 'Game AI'] }
  ];
  
  return allSimilar.filter(job => job.id !== currentId).slice(0, 2);
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [similarJobs, setSimilarJobs] = useState<any[]>([]);

  useEffect(() => {
    const jobId = params.id as string;
    
    // ID에 따른 데이터 가져오기
    const jobData = mockJobsData[jobId];
    
    if (jobData) {
      setJob(jobData);
      setIsBookmarked(jobData.bookmarked);
      setSimilarJobs(getSimilarJobs(jobData.id));
    } else {
      // ID에 해당하는 데이터가 없으면 404 처리
      setJob(null);
    }
  }, [params.id]);

  const handleBookmark = () => {
    if (!job) return;
    setIsBookmarked(!isBookmarked);
    // TODO: API 호출로 북마크 상태 업데이트
  };

  const handleApply = () => {
    // TODO: 지원하기 기능 구현
    alert('지원하기 기능이 곧 추가됩니다!');
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-4xl mb-4">❌</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">채용공고를 찾을 수 없습니다</h2>
            <p className="text-gray-600 mb-4">요청하신 채용공고가 존재하지 않거나 삭제되었습니다.</p>
            <button
              onClick={() => router.push('/jobs')}
              className="rounded-lg bg-indigo-500 px-6 py-2 text-white hover:bg-indigo-600 transition-colors"
            >
              채용공고 목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  const daysLeft = getDaysUntilDeadline(job.deadline);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="pt-20">
        {/* Back Button & Header */}
        <div className="bg-white border-b">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>채용공고 목록으로 돌아가기</span>
            </button>

            {/* Job Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6">
                <div className="text-6xl">{job.logo}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{job.position}</h1>
                    {job.isNew && (
                      <span className="bg-gradient-to-r from-rose-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold">
                        NEW
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl text-gray-700 mb-3">{job.company} • {job.department}</h2>
                  
                  <div className="flex items-center gap-6 text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span className={daysLeft <= 7 ? 'text-red-500 font-medium' : ''}>
                        {daysLeft > 0 ? `${daysLeft}일 남음` : '마감'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-current text-orange-500" />
                      <span className="font-medium">{job.rating}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                      job.standardScore >= 70 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                        : job.standardScore >= 60
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' 
                        : 'bg-gradient-to-r from-slate-400 to-gray-500 text-white'
                    }`}>
                      편차 {job.standardScore}
                    </div>
                    <span className="text-2xl font-bold text-indigo-600">{job.salary}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleBookmark}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-all hover:border-indigo-300 hover:text-indigo-600"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="h-5 w-5 text-indigo-500" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                  <span>북마크</span>
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-all hover:border-gray-400">
                  <Share2 className="h-5 w-5" />
                  <span>공유</span>
                </button>
                <button
                  onClick={handleApply}
                  className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  지원하기
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-indigo-50 text-indigo-600 px-3 py-1 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
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
                  { key: 'overview', label: '채용공고' },
                  { key: 'requirements', label: '지원자격' },
                  { key: 'benefits', label: '근무조건' },
                  { key: 'process', label: '채용절차' }
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
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">포지션 개요</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {job.detailedDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">주요 업무</h3>
                      <ul className="space-y-3">
                        {job.responsibilities?.map((responsibility, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Zap className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">회사 소개</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {job.companyDescription}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">필수 자격요건</h3>
                      <ul className="space-y-3">
                        {job.requirements?.map((requirement, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="h-2 w-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">우대사항</h3>
                      <ul className="space-y-3">
                        {job.preferredRequirements?.map((preferred, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{preferred}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-indigo-600 mb-3">
                          <Clock className="h-5 w-5" />
                          <h4 className="font-bold">근무 시간</h4>
                        </div>
                        <p className="text-gray-700">{job.workingHours}</p>
                        <p className="text-gray-700">시용기간: {job.probationPeriod}</p>
                        <p className="text-gray-700">{job.remoteWork}</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-indigo-600 mb-3">
                          <Users className="h-5 w-5" />
                          <h4 className="font-bold">팀 구성</h4>
                        </div>
                        <p className="text-gray-700">{job.teamSize}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-indigo-600 mb-4">
                        <Heart className="h-5 w-5" />
                        <h4 className="text-xl font-bold">복리후생</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {job.benefits?.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'process' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">채용 절차</h3>
                    <div className="space-y-4">
                      {job.applicationProcess?.map((step, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <span className="text-gray-700 font-medium">{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
                      <h4 className="font-bold text-indigo-800 mb-2">💡 지원 팁</h4>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• 포트폴리오나 GitHub 링크를 함께 제출하면 좋습니다</li>
                        <li>• 일본어 면접 준비를 위해 기술 용어를 미리 학습해두세요</li>
                        <li>• 소니의 게임이나 제품에 대한 관심을 어필하세요</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-80 space-y-6">
              {/* Quick Apply */}
              <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-indigo-600 mb-2">{job.salary}</p>
                  <p className="text-sm text-gray-600">
                    마감까지 <span className="font-bold text-red-500">{daysLeft}일</span>
                  </p>
                </div>
                <button
                  onClick={handleApply}
                  className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg mb-3"
                >
                  지원하기
                </button>
                <button
                  onClick={handleBookmark}
                  className="w-full rounded-lg border border-gray-300 py-3 font-medium text-gray-700 transition-all hover:border-indigo-300 hover:text-indigo-600"
                >
                  {isBookmarked ? '북마크 해제' : '북마크 저장'}
                </button>
              </div>

              {/* Similar Jobs */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">유사한 채용공고</h3>
                <div className="space-y-4">
                  {similarJobs.map((similarJob) => (
                    <div key={similarJob.id} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{similarJob.logo}</span>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-sm">{similarJob.company}</h4>
                          <p className="text-gray-600 text-sm">{similarJob.position}</p>
                          <p className="text-indigo-600 font-medium text-sm">{similarJob.salary}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {similarJob.tags.map((tag: string, idx: number) => (
                              <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}