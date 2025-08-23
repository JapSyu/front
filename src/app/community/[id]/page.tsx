'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ThumbsUp, MessageCircle, Share2, Bookmark, BookmarkCheck, Eye, Clock, User, Tag, Heart, Send, MoreHorizontal, Flag } from 'lucide-react';
import Header from '@/components/Header';

// Types
interface Author {
  name: string;
  avatar?: string;
  level: string;
  company?: string;
  joinDate: string;
  postCount: number;
  reputation: number;
}

interface Comment {
  id: number;
  author: Author;
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
  isLiked?: boolean;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: Author;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  views: number;
  likes: number;
  comments: Comment[];
  isHot?: boolean;
  isNew?: boolean;
  isBookmarked?: boolean;
  isLiked?: boolean;
}

interface RelatedPost {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  views: number;
  comments: number;
}

// Mock Data
const mockPostDetail: Post = {
  id: 1,
  title: '소니 AI엔지니어 최종합격 후기 (신입)',
  content: `안녕하세요! 드디어 소니에 최종합격했습니다! 🎉

6개월간의 준비 과정과 면접 경험을 상세하게 공유해드릴게요. 특히 기술면접에서 물어본 질문들이 후배들에게 도움이 되실 것 같아서 정리해봤습니다.

## 📚 **준비 과정**

### 1. 서류 준비 (1개월)
- 이력서: 프로젝트 경험 중심으로 작성
- 자기소개서: 일본어와 영어 두 버전 준비
- 포트폴리오: GitHub 정리 + 개인 프로젝트 3개

### 2. 기술 스택 학습 (4개월)
- **Python**: 머신러닝 라이브러리 집중 학습
- **TensorFlow**: 실제 프로젝트 경험 쌓기
- **일본어**: JLPT N2 취득 (비즈니스 일본어 따로 공부)

### 3. 면접 준비 (1개월)
- 기술 질문 예상 문제 정리
- 일본어 면접 연습 (주 3회)
- 회사 조사 및 지원 동기 정리

## 🎯 **면접 과정**

### 1차: 서류 심사
- 지원자 약 200명 중 50명 통과
- 결과 발표까지 2주 소요

### 2차: 온라인 코딩테스트
- HackerRank 플랫폼 사용
- 알고리즘 문제 3문제 (90분)
- 난이도: 중하급 정도

### 3차: 기술 면접 (화상)
**면접관**: 한국인 시니어 개발자 1명 + 일본인 팀 리더 1명 (60분)

**주요 질문들**:
1. "자기소개를 일본어로 해주세요"
2. "Python과 TensorFlow를 선택한 이유는?"
3. "CNN과 RNN의 차이점과 각각의 적용 사례는?"
4. "과적합(Overfitting)을 방지하는 방법들을 설명해주세요"
5. "실제 프로젝트에서 마주한 가장 어려운 문제와 해결 방법은?"

**라이브 코딩**:
- 간단한 데이터 전처리 문제
- 시간: 20분 정도

### 4차: 최종 면접 (대면)
**면접관**: 부장급 2명 (일본어 + 영어 혼용, 45분)

**주요 질문들**:
1. "소니에서 하고 싶은 일은 무엇인가요?"
2. "5년 후 자신의 모습을 그려보세요"
3. "일본에서 일하면서 예상되는 어려움과 극복 방안은?"
4. "팀워크 경험에 대해 말씀해주세요"
5. "소니의 AI 기술 중 관심 있는 분야는?"

## 💡 **합격 팁**

### 기술적 준비
1. **포트폴리오가 가장 중요**: GitHub을 깔끔하게 정리하세요
2. **기본기 탄탄히**: 알고리즘, 자료구조는 기본
3. **트렌드 파악**: 최신 AI 기술 동향 숙지

### 어학 준비  
1. **JLPT N2는 필수**: N1이면 더 좋음
2. **비즈니스 일본어**: 존댓말, 회사 용어 학습
3. **기술 용어**: 일본어로 된 기술 용어들 암기

### 면접 태도
1. **적극성 어필**: 일본 문화에 대한 관심과 적응 의지
2. **구체적인 사례**: 추상적인 답변보다는 실제 경험 중심
3. **질문 준비**: 역질문 2-3개는 반드시 준비

## 🎊 **최종 결과**

- **연봉**: 신입 기준 650만엔 (협상 후 680만엔)
- **부서**: PlayStation AI Research팀
- **근무지**: 도쿄 본사
- **입사일**: 2024년 10월

## 🙏 **마무리**

정말 길고 힘든 과정이었지만, 꿈꿔왔던 소니에서 일할 수 있게 되어 너무 기쁩니다! 

혹시 궁금한 점이나 더 자세한 내용이 필요하시면 댓글로 남겨주세요. 최대한 도움드리겠습니다!

여러분도 꼭 원하는 곳에 취업하시길 응원합니다! 화이팅! 💪`,
  
  author: {
    name: 'AI개발자희망',
    level: '활동회원',
    company: '소니',
    joinDate: '2023-05-15',
    postCount: 23,
    reputation: 856
  },
  category: 'interview',
  tags: ['소니', 'AI엔지니어', '신입', '합격후기', 'TensorFlow', 'Python'],
  createdAt: '2024-08-23',
  views: 2847,
  likes: 156,
  comments: [
    {
      id: 1,
      author: {
        name: '취준생화이팅',
        level: '새싹회원',
        joinDate: '2024-07-10',
        postCount: 5,
        reputation: 45
      },
      content: '정말 상세한 후기 감사합니다! 혹시 코딩테스트 난이도가 어느 정도였나요? 백준으로 치면 실버? 골드?',
      createdAt: '2024-08-23',
      likes: 12,
      isLiked: false
    },
    {
      id: 2,
      author: {
        name: '백엔드마스터',
        level: '정회원',
        company: '라쿠텐',
        joinDate: '2022-03-20',
        postCount: 89,
        reputation: 1234
      },
      content: '축하드립니다! 680만엔이면 신입치고 정말 좋은 조건이네요. 소니 AI팀은 정말 들어가기 어려운 곳인데 대단하십니다 👏',
      createdAt: '2024-08-23',
      likes: 8,
      isLiked: true,
      replies: [
        {
          id: 21,
          author: {
            name: 'AI개발자희망',
            level: '활동회원',
            company: '소니',
            joinDate: '2023-05-15',
            postCount: 23,
            reputation: 856
          },
          content: '감사합니다! 정말 운이 좋았던 것 같아요. 백엔드마스터님도 라쿠텐에서 잘 지내고 계시는 것 같네요!',
          createdAt: '2024-08-23',
          likes: 3
        }
      ]
    },
    {
      id: 3,
      author: {
        name: '일본어고수',
        level: '활동회원',
        joinDate: '2023-11-08',
        postCount: 34,
        reputation: 567
      },
      content: '혹시 일본어 면접에서 어려웠던 부분이 있으셨나요? N2로도 충분했는지 궁금합니다!',
      createdAt: '2024-08-23',
      likes: 15,
      isLiked: false
    }
  ],
  isHot: true,
  isNew: true,
  isBookmarked: false,
  isLiked: false
};

const relatedPosts: RelatedPost[] = [
  { id: 2, title: '라쿠텐 백엔드 개발자 기술면접 질문 모음', author: '백엔드마스터', createdAt: '2024-08-22', views: 1923, comments: 15 },
  { id: 6, title: '신입 개발자도 갈 수 있는 일본 대기업 리스트', author: '취준생화이팅', createdAt: '2024-08-18', views: 2156, comments: 28 },
  { id: 9, title: 'AI 엔지니어 포트폴리오 작성 가이드', author: 'ML전문가', createdAt: '2024-08-20', views: 1456, comments: 19 },
  { id: 10, title: 'JLPT N2 vs 비즈니스 일본어 차이점', author: '일본어고수', createdAt: '2024-08-19', views: 987, comments: 12 }
];

export default function CommunityPostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showReplyInput, setShowReplyInput] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    // 실제로는 API 호출
    setPost(mockPostDetail);
    setIsBookmarked(mockPostDetail.isBookmarked || false);
    setIsLiked(mockPostDetail.isLiked || false);
  }, [params.id]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: API 호출
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (post) {
      setPost({
        ...post,
        likes: isLiked ? post.likes - 1 : post.likes + 1
      });
    }
    // TODO: API 호출
  };

  const handleCommentLike = (commentId: number) => {
    if (!post) return;
    
    const updateComments = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          };
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: updateComments(comment.replies)
          };
        }
        return comment;
      });
    };

    setPost({
      ...post,
      comments: updateComments(post.comments)
    });
  };

  const handleSubmitComment = () => {
    if (!newComment.trim() || !post) return;
    
    const newCommentObj: Comment = {
      id: Date.now(),
      author: {
        name: '현재사용자',
        level: '활동회원',
        joinDate: '2024-01-01',
        postCount: 15,
        reputation: 234
      },
      content: newComment,
      createdAt: new Date().toISOString().split('T')[0],
      likes: 0,
      isLiked: false
    };

    setPost({
      ...post,
      comments: [...post.comments, newCommentObj]
    });
    setNewComment('');
  };

  const handleSubmitReply = (parentCommentId: number) => {
    if (!replyContent.trim() || !post) return;
    
    const newReply: Comment = {
      id: Date.now(),
      author: {
        name: '현재사용자',
        level: '활동회원',
        joinDate: '2024-01-01',
        postCount: 15,
        reputation: 234
      },
      content: replyContent,
      createdAt: new Date().toISOString().split('T')[0],
      likes: 0,
      isLiked: false
    };

    const updateComments = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === parentCommentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        }
        return comment;
      });
    };

    setPost({
      ...post,
      comments: updateComments(post.comments)
    });
    setReplyContent('');
    setShowReplyInput(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  const getCategoryName = (categoryId: string) => {
    const categories: { [key: string]: string } = {
      'job-info': '채용정보',
      'interview': '면접후기',
      'salary': '연봉정보',
      'life': '일본생활',
      'study': '어학/자격증',
      'career': '커리어',
      'networking': '네트워킹',
      'qna': '질문답변'
    };
    return categories[categoryId] || categoryId;
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">글을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="pt-20">
        <div className="mx-auto max-w-4xl px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>커뮤니티로 돌아가기</span>
          </button>

          {/* Post Header */}
          <div className="bg-white rounded-2xl p-8 shadow-md mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                    {getCategoryName(post.category)}
                  </span>
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
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
              </div>
              <div className="flex gap-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full font-bold text-lg">
                  {post.author.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-gray-800">{post.author.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {post.author.level}
                    </span>
                    {post.author.company && (
                      <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        {post.author.company}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(post.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      가입일: {formatDate(post.author.joinDate)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-all text-sm ${
                    isBookmarked
                      ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">북마크</span>
                </button>
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-all text-sm ${
                    isLiked
                      ? 'bg-red-50 text-red-600 border border-red-200'
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes}</span>
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Post Content */}
          <div className="bg-white rounded-2xl p-8 shadow-md mb-6">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {post.content}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-2xl p-8 shadow-md mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-indigo-500" />
              댓글 ({post.comments.length})
            </h3>

            {/* New Comment */}
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 작성해보세요..."
                className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  댓글 작성
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                  {/* Comment */}
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-full font-bold">
                      {comment.author.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-gray-800">{comment.author.name}</span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {comment.author.level}
                        </span>
                        {comment.author.company && (
                          <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                            {comment.author.company}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                      </div>
                      <p className="text-gray-700 mb-3 leading-relaxed">{comment.content}</p>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleCommentLike(comment.id)}
                          className={`flex items-center gap-1 text-sm transition-colors ${
                            comment.isLiked 
                              ? 'text-red-500' 
                              : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                          <span>{comment.likes}</span>
                        </button>
                        <button
                          onClick={() => setShowReplyInput(showReplyInput === comment.id ? null : comment.id)}
                          className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                          답글
                        </button>
                        <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                          <Flag className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Reply Input */}
                      {showReplyInput === comment.id && (
                        <div className="mt-4 border border-gray-200 rounded-lg p-3">
                          <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="답글을 작성해보세요..."
                            className="w-full h-20 p-2 border border-gray-200 rounded resize-none outline-none focus:border-indigo-500"
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => setShowReplyInput(null)}
                              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              취소
                            </button>
                            <button
                              onClick={() => handleSubmitReply(comment.id)}
                              disabled={!replyContent.trim()}
                              className="px-4 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600 transition-colors disabled:opacity-50"
                            >
                              답글 작성
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start gap-3 pl-4 border-l-2 border-indigo-100">
                              <div className="flex items-center justify-center w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full font-bold text-sm">
                                {reply.author.name.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-gray-800 text-sm">{reply.author.name}</span>
                                  {reply.author.company && (
                                    <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                      {reply.author.company}
                                    </span>
                                  )}
                                  <span className="text-xs text-gray-500">{formatDate(reply.createdAt)}</span>
                                </div>
                                <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                                <button
                                  onClick={() => handleCommentLike(reply.id)}
                                  className={`flex items-center gap-1 text-xs transition-colors ${
                                    reply.isLiked 
                                      ? 'text-red-500' 
                                      : 'text-gray-400 hover:text-red-500'
                                  }`}
                                >
                                  <Heart className={`h-3 w-3 ${reply.isLiked ? 'fill-current' : ''}`} />
                                  <span>{reply.likes}</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-6">관련 글</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  onClick={() => router.push(`/community/${relatedPost.id}`)}
                  className="p-6 border border-gray-200 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer"
                >
                  <h4 className="font-medium text-gray-800 mb-3 line-clamp-2 hover:text-indigo-600 transition-colors leading-tight">
                    {relatedPost.title}
                  </h4>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="font-medium">{relatedPost.author}</span>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {relatedPost.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {relatedPost.comments}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-gray-400">
                      {formatDate(relatedPost.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}