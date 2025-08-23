'use client';

import React, { useState } from 'react';
import { Search, Plus, MessageCircle, ThumbsUp, Clock, User, Tag, TrendingUp, Award, Users, Eye } from 'lucide-react';
import Header from '@/components/Header';

// Types
interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    level: string;
    company?: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  views: number;
  likes: number;
  comments: number;
  isHot?: boolean;
  isNew?: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  postCount: number;
  icon: string;
}

// Mock Data
const categories: Category[] = [
  {
    id: 'job-info',
    name: '채용정보',
    description: '채용공고, 면접 일정, 회사 소식',
    postCount: 324,
    icon: '💼'
  },
  {
    id: 'interview',
    name: '면접후기',
    description: '면접 경험담, 질문 모음, 팁 공유',
    postCount: 186,
    icon: '🎯'
  },
  {
    id: 'salary',
    name: '연봉정보',
    description: '급여 협상, 연봉 공개, 복리후생',
    postCount: 92,
    icon: '💰'
  },
  {
    id: 'life',
    name: '일본생활',
    description: '주거, 비자, 문화 적응, 생활팁',
    postCount: 158,
    icon: '🏠'
  },
  {
    id: 'study',
    name: '어학/자격증',
    description: 'JLPT, 기술자격증, 학습 자료',
    postCount: 267,
    icon: '📚'
  },
  {
    id: 'career',
    name: '커리어',
    description: '이직, 승진, 커리어 설계',
    postCount: 143,
    icon: '🚀'
  },
  {
    id: 'networking',
    name: '네트워킹',
    description: '모임, 세미나, 인맥 형성',
    postCount: 89,
    icon: '🤝'
  },
  {
    id: 'qna',
    name: '질문답변',
    description: '궁금한 점, 조언 구하기',
    postCount: 412,
    icon: '❓'
  }
];

const mockPosts: Post[] = [
  {
    id: 1,
    title: '소니 AI엔지니어 최종합격 후기 (신입)',
    content: '드디어 소니에 최종합격했습니다! 6개월간의 준비 과정과 면접 경험을 공유해드릴게요. 특히 기술면접에서 물어본 질문들이 도움이 되실 것 같아요...',
    author: {
      name: 'AI개발자희망',
      level: '활동회원',
      company: '소니'
    },
    category: 'interview',
    tags: ['소니', 'AI엔지니어', '신입', '합격후기'],
    createdAt: '2024-08-23',
    views: 2847,
    likes: 156,
    comments: 23,
    isHot: true,
    isNew: true
  },
  {
    id: 2,
    title: '라쿠텐 백엔드 개발자 기술면접 질문 모음',
    content: '라쿠텐 백엔드 개발자 면접에서 실제로 나온 질문들을 정리해봤습니다. Java, Spring, 시스템 설계 관련 질문들이 많이 나왔어요.',
    author: {
      name: '백엔드마스터',
      level: '정회원',
      company: '라쿠텐'
    },
    category: 'interview',
    tags: ['라쿠텐', '백엔드', 'Java', 'Spring'],
    createdAt: '2024-08-22',
    views: 1923,
    likes: 87,
    comments: 15,
    isHot: true
  },
  {
    id: 3,
    title: '일본 IT기업 연봉 협상 팁 (실제 경험담)',
    content: '3번의 이직을 통해 연봉을 2배로 올린 경험을 공유합니다. 일본에서 연봉 협상하는 방법과 주의사항들...',
    author: {
      name: '연봉협상왕',
      level: '정회원',
      company: '메르카리'
    },
    category: 'salary',
    tags: ['연봉협상', '이직', 'IT기업'],
    createdAt: '2024-08-21',
    views: 3456,
    likes: 198,
    comments: 34,
    isHot: true
  },
  {
    id: 4,
    title: 'JLPT N1 합격 후 실제 업무에서 느낀 일본어 실력',
    content: 'N1은 합격했지만 실무에서는 여전히 어려운 상황이 많아요. 비즈니스 일본어와 시험 일본어의 차이점과 실무 적응 팁을 공유합니다.',
    author: {
      name: '일본어고수',
      level: '활동회원'
    },
    category: 'study',
    tags: ['JLPT', 'N1', '비즈니스일본어'],
    createdAt: '2024-08-20',
    views: 1234,
    likes: 67,
    comments: 19
  },
  {
    id: 5,
    title: '도쿄 1인 생활 월 생활비 공개 (IT기업 3년차)',
    content: '도쿄에서 3년째 살면서 정리한 월별 생활비 내역입니다. 집세, 식비, 교통비 등 실제 금액을 공개해요.',
    author: {
      name: '도쿄생활3년',
      level: '정회원',
      company: '소프트뱅크'
    },
    category: 'life',
    tags: ['도쿄', '생활비', '1인생활'],
    createdAt: '2024-08-19',
    views: 892,
    likes: 45,
    comments: 12
  },
  {
    id: 6,
    title: '신입 개발자도 갈 수 있는 일본 대기업 리스트',
    content: '신입도 지원 가능한 일본 대기업들을 정리했습니다. 각 회사별 지원 자격과 채용 시기도 함께 정리해봤어요.',
    author: {
      name: '취준생화이팅',
      level: '새싹회원'
    },
    category: 'job-info',
    tags: ['신입', '대기업', '채용정보'],
    createdAt: '2024-08-18',
    views: 2156,
    likes: 134,
    comments: 28
  },
  {
    id: 7,
    title: '일본 개발자 커뮤니티 모임 후기',
    content: '시부야에서 열린 한국인 개발자 모임에 다녀왔어요. 네트워킹하기 정말 좋은 자리였습니다!',
    author: {
      name: '네트워킹러버',
      level: '활동회원',
      company: 'DeNA'
    },
    category: 'networking',
    tags: ['모임', '네트워킹', '개발자'],
    createdAt: '2024-08-17',
    views: 567,
    likes: 32,
    comments: 8
  },
  {
    id: 8,
    title: '메르카리에서 라쿠텐으로 이직한 이유',
    content: '2년간 다닌 메르카리를 떠나 라쿠텐으로 이직하게 된 이유와 과정을 솔직하게 공유합니다.',
    author: {
      name: '이직성공',
      level: '정회원',
      company: '라쿠텐'
    },
    category: 'career',
    tags: ['이직', '메르카리', '라쿠텐'],
    createdAt: '2024-08-16',
    views: 1789,
    likes: 98,
    comments: 21,
    isNew: true
  }
];

const hotTopics = [
  '소니 채용',
  '라쿠텐 면접',
  'JLPT N2',
  '도쿄 생활비',
  '연봉 협상'
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const filteredPosts = mockPosts.filter(post => {
    const matchesCategory = activeTab === 'all' || post.category === activeTab;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.likes + b.comments) - (a.likes + b.comments);
      case 'views':
        return b.views - a.views;
      case 'latest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '어제';
    if (diffDays < 7) return `${diffDays}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="pt-20">
        {/* Header Section */}
        <div className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  일본 취업 커뮤니티
                </h1>
                <p className="mt-1 text-gray-600">
                  경험과 정보를 공유하며 함께 성장하는 공간
                </p>
              </div>
              <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <Plus className="h-5 w-5" />
                글쓰기
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600">1,234</div>
                <div className="text-sm text-gray-600">활성 멤버</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600">2,847</div>
                <div className="text-sm text-gray-600">전체 글</div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">456</div>
                <div className="text-sm text-gray-600">합격 후기</div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">89</div>
                <div className="text-sm text-gray-600">오늘 글</div>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="글 제목, 태그로 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
              >
                <option value="latest">최신순</option>
                <option value="popular">인기순</option>
                <option value="views">조회순</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-80 space-y-6 hidden lg:block">
              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">카테고리</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                      activeTab === 'all'
                        ? 'bg-indigo-50 text-indigo-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>전체</span>
                      <span className="text-xs text-gray-500">
                        {mockPosts.length}
                      </span>
                    </div>
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.id)}
                      className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                        activeTab === category.id
                          ? 'bg-indigo-50 text-indigo-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {category.postCount}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hot Topics */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-red-500" />
                  인기 키워드
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hotTopics.map((topic, index) => (
                    <button
                      key={index}
                      className="rounded-full bg-red-50 text-red-600 px-3 py-1 text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      #{topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Top Contributors */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  이주의 기여자
                </h3>
                <div className="space-y-3">
                  {['AI개발자희망', '백엔드마스터', '연봉협상왕'].map((contributor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{contributor}</div>
                        <div className="text-xs text-gray-500">활동점수 {(3-index) * 150}P</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Category Filter */}
              <div className="bg-white rounded-2xl p-4 shadow-md mb-6 lg:hidden">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
                >
                  <option value="all">전체</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {sortedPosts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-md">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    검색 결과가 없습니다
                  </h3>
                  <p className="text-gray-600">
                    다른 키워드로 검색해보세요
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-100 hover:border-indigo-200"
                    >
                      {/* Post Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full font-bold">
                            {post.author.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-800">{post.author.name}</span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {post.author.level}
                              </span>
                              {post.author.company && (
                                <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                                  {post.author.company}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatDate(post.createdAt)}</span>
                              <span>•</span>
                              <span>{getCategoryName(post.category)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {post.isHot && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              HOT
                            </span>
                          )}
                          {post.isNew && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-indigo-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-2">
                          {post.content}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Post Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors">
                          더보기 →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {sortedPosts.length > 0 && (
                <div className="mt-12 text-center">
                  <button className="rounded-lg border border-gray-300 px-8 py-3 font-medium text-gray-700 transition-all hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5">
                    더 많은 글 보기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}