import { RankingGroup } from './comprehensiveRanking';

// 엔터 / 게임 편차치 데이터
export const entertainmentRanking: RankingGroup[] = [
  {
    // score: 70 ~ 69,
    title: '세계를 움직이는 천상세계',
    tier: 'S+',
    companies: [
      { name: '넷플릭스일본', score: 70, rank: 1 },
      { name: '닌텐도', score: 69, rank: 2 },
      { name: '소니그룹', score: 69, rank: 3 },
      { name: '도호', score: 69, rank: 4 },
      { name: '일본마이크로소프트(Xbox부문)', score: 69, rank: 5 }
    ]
  },
  {
    // score: 68-66,
    title: '업계 톱기업군',
    tier: 'S',
    companies: [
      { name: '도에이', score: 68, rank: 6 },
      { name: '반다이남코', score: 68, rank: 7 },
      { name: 'KADOKAWA', score: 68, rank: 8 },
      { name: '사이버에이전트', score: 68, rank: 9 },
      { name: '워너브라더스일본', score: 68, rank: 10 },
      { name: '월트디즈니일본', score: 68, rank: 11 },
      { name: '오리엔탈랜드', score: 67, rank: 12 },
      { name: '산리오', score: 67, rank: 13 },
      { name: '다카라토미', score: 67, rank: 14 },
      { name: 'NBC유니버설일본', score: 67, rank: 15 },
      { name: '하쿠호도DY뮤직&픽처스', score: 67, rank: 16 },
      { name: '쇼치쿠', score: 66, rank: 17 },
      { name: '도에이애니메이션', score: 66, rank: 18 },
      { name: 'DeNA', score: 66, rank: 19 },
      { name: '소니픽처스엔터테인먼트', score: 66, rank: 20 },
      { name: '스퀘어에닉스', score: 66, rank: 21 },
      { name: '캡콤', score: 66, rank: 22 }
    ]
  },
  {
    // score: 65-64,
    title: '업계의 대형기업군',
    tier: 'A+',
    companies: [
      { name: '세가사미', score: 65, rank: 23 },
      { name: '코나미그룹', score: 65, rank: 24 },
      { name: '믹시', score: 65, rank: 25 },
      { name: '그리', score: 65, rank: 26 },
      { name: 'TV도쿄미디어넷', score: 65, rank: 27 },
      { name: '코에이테크모', score: 64, rank: 28 },
      { name: '게임프리크', score: 64, rank: 29 },
      { name: '건호', score: 64, rank: 30 },
      { name: '에이벡스', score: 64, rank: 31 },
      { name: '요시모토흥업', score: 64, rank: 32 },
      { name: '호리프로', score: 64, rank: 33 },
      { name: '아니플렉스', score: 64, rank: 34 },
      { name: '포니캐니언', score: 64, rank: 35 },
      { name: '유니버설뮤직', score: 64, rank: 36 }
    ]
  },
  {
    // score: 63-61,
    title: '업계의 중견상위기업군',
    tier: 'A',
    companies: [
      { name: '넥슨', score: 63, rank: 37 },
      { name: '코로프라', score: 63, rank: 38 },
      { name: '드리컴', score: 63, rank: 39 },
      { name: 'Cygames', score: 63, rank: 40 },
      { name: '킹레코드', score: 63, rank: 41 },
      { name: 'JVC켄우드빅터엔터테인먼트', score: 63, rank: 42 },
      { name: '일본팔콤', score: 62, rank: 43 },
      { name: '마블러스', score: 62, rank: 44 },
      { name: 'IG포트', score: 62, rank: 45 },
      { name: '카바', score: 62, rank: 46 },
      { name: 'ANYCOLOR', score: 62, rank: 47 },
      { name: '일본콜럼비아', score: 62, rank: 48 },
      { name: '라운드원', score: 62, rank: 49 },
      { name: '부시로드', score: 61, rank: 50 },
      { name: 'KLab', score: 61, rank: 51 },
      { name: 'GameWith', score: 61, rank: 52 },
      { name: '이온판타지', score: 61, rank: 53 },
      { name: '와타나베엔터테인먼트', score: 61, rank: 54 }
    ]
  },
  {
    // score: 60-58,
    title: '업계의 중견기업군',
    tier: 'A',
    companies: [
      { name: '에이치팀', score: 60, rank: 55 },
      { name: 'enish', score: 60, rank: 56 },
      { name: '디엘이', score: 60, rank: 57 },
      { name: '스파이크춘소프트', score: 60, rank: 58 },
      { name: '톰스엔터테인먼트', score: 60, rank: 59 },
      { name: '반다이남코필름워크스(구 선라이즈)', score: 60, rank: 60 },
      { name: '소통', score: 60, rank: 61 },
      { name: '닌텐도픽처스', score: 60, rank: 62 },
      { name: '일본이치소프트웨어', score: 59, rank: 63 },
      { name: '스튜디오지브리', score: 59, rank: 64 },
      { name: '교토애니메이션', score: 59, rank: 65 },
      { name: 'PA워크스', score: 59, rank: 66 },
      { name: '샤프트', score: 59, rank: 67 },
      { name: '다츠노코프로', score: 59, rank: 68 },
      { name: '데즈카프로덕션', score: 59, rank: 69 },
      { name: '신에이동화', score: 59, rank: 70 },
      { name: '프로덕션IG', score: 59, rank: 71 },
      { name: '피에로', score: 58, rank: 72 },
      { name: '마샤애니메이션플래닛', score: 58, rank: 73 },
      { name: '위트스튜디오', score: 58, rank: 74 },
      { name: 'Cygames픽처스', score: 58, rank: 75 },
      { name: '유포테이블', score: 58, rank: 76 },
      { name: '텔레콤애니메이션필름', score: 58, rank: 77 },
      { name: '오스카프로모션', score: 58, rank: 78 }
    ]
  },
  {
    // score: 57-55,
    title: '업계의 저명기업',
    tier: 'A',
    companies: [
      { name: '스튜디오딘', score: 57, rank: 79 },
      { name: '아사히프로덕션', score: 57, rank: 80 },
      { name: '일본애니메이션', score: 57, rank: 81 },
      { name: 'StudioGOONEYS', score: 57, rank: 82 },
      { name: '스튜디오YUKAI', score: 57, rank: 83 },
      { name: '바이브리애니메이션스튜디오', score: 57, rank: 84 },
      { name: '가이나', score: 56, rank: 85 },
      { name: '갸롯프', score: 56, rank: 86 },
      { name: '아니마&컴퍼니', score: 56, rank: 87 },
      { name: '요코하마애니메이션랩', score: 56, rank: 88 },
      { name: '클라우드하츠', score: 56, rank: 89 },
      { name: '스튜디오욘도시', score: 56, rank: 90 },
      { name: '갈대프로덕션', score: 56, rank: 91 },
      { name: '알보애니메이션', score: 55, rank: 92 },
      { name: '츠무기아키타애니메랩', score: 55, rank: 93 },
      { name: '스튜디오더브', score: 55, rank: 94 },
      { name: '이스트피쉬스튜디오', score: 55, rank: 95 },
      { name: '아제타픽처스', score: 55, rank: 96 },
      { name: '애니메이션스튜디오세븐', score: 55, rank: 97 }
    ]
  }
];