'use client';

import React, { useState } from 'react';
import { Search, Trophy, TrendingUp, Building2, Zap, Crown } from 'lucide-react';
import Header from '@/components/Header';
import {
    comprehensiveRanking,
    itRanking,
    ventureRanking,
    type RankingGroup
} from '@/data';

export default function HensachiRankingPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'comprehensive' | 'it' | 'venture'>('comprehensive');

    const getCurrentRanking = () => {
        switch (activeTab) {
            case 'it':
                return itRanking;
            case 'venture':
                return ventureRanking;
            default:
                return comprehensiveRanking;
        }
    };

    const getTabLabel = () => {
        switch (activeTab) {
            case 'it':
                return 'IT업계 편차치';
            case 'venture':
                return '벤처기업 편차치';
            default:
                return '종합 편차치';
        }
    };

    const filteredRanking = getCurrentRanking().map(group => ({
        ...group,
        companies: group.companies.filter(company =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(group => group.companies.length > 0);

    const getTierColor = (tier?: string) => {
        switch (tier) {
            case 'S+':
                return 'from-yellow-400 to-amber-500';
            case 'S':
                return 'from-purple-500 to-indigo-600';
            case 'A+':
                return 'from-blue-500 to-cyan-500';
            case 'A':
                return 'from-emerald-500 to-teal-500';
            default:
                return 'from-gray-400 to-gray-500';
        }
    };

    const getTierIcon = (tier?: string) => {
        switch (tier) {
            case 'S+':
                return <Crown className="h-5 w-5 text-yellow-600" />;
            case 'S':
                return <Trophy className="h-5 w-5 text-purple-600" />;
            case 'A+':
                return <TrendingUp className="h-5 w-5 text-blue-600" />;
            case 'A':
                return <Building2 className="h-5 w-5 text-emerald-600" />;
            default:
                return <Zap className="h-5 w-5 text-gray-600" />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Header />

            <div className="pt-20">
                {/* Header Section */}
                <div className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                일본 기업 편차치 랭킹
                            </h1>
                            <p className="text-gray-600">
                                일본 취업 시장에서의 기업 선호도와 입사 난이도를 한눈에 확인하세요
                            </p>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex justify-center mb-6">
                            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setActiveTab('comprehensive')}
                                    className={`px-6 py-2 rounded-md font-medium transition-all ${activeTab === 'comprehensive'
                                            ? 'bg-white text-indigo-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    종합
                                </button>
                                <button
                                    onClick={() => setActiveTab('it')}
                                    className={`px-6 py-2 rounded-md font-medium transition-all ${activeTab === 'it'
                                            ? 'bg-white text-indigo-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    IT업계
                                </button>
                                <button
                                    onClick={() => setActiveTab('venture')}
                                    className={`px-6 py-2 rounded-md font-medium transition-all ${activeTab === 'venture'
                                            ? 'bg-white text-indigo-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    벤처
                                </button>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="max-w-md mx-auto">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="기업명 검색"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-4xl px-4 py-8">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{getTabLabel()}</h2>
                        <p className="text-gray-600">편차치가 높을수록 입사하기 어려운 인기 기업입니다</p>
                    </div>

                    {filteredRanking.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">검색 결과가 없습니다</h3>
                            <p className="text-gray-600">다른 키워드로 검색해보세요</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {filteredRanking.map((group, groupIndex) => (
                                <div key={groupIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                    {/* Group Header */}
                                    <div className={`bg-gradient-to-r ${getTierColor(group.tier)} p-6 text-white`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {getTierIcon(group.tier)}
                                                <div>
                                                    <h3 className="text-lg font-bold">
                                                        <span>{group.title} </span>
                                                        <span>{group.tier && (
                                                            <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-bold">
                                                                {group.tier}
                                                            </span>
                                                        )}</span>
                                                    </h3>
                                                    {group.description && (
                                                        <p className="text-sm opacity-90 mt-1">{group.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-3xl font-bold opacity-80">{group.companies.length}</p>
                                                <p className="text-sm opacity-90">개 기업</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Companies Grid */}
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {group.companies.map((company, companyIndex) => (
                                                <div
                                                    key={companyIndex}
                                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-3">

                                                        <div>
                                                            <h4 className="font-bold text-gray-800">{company.name}</h4>
                                                            {company.category && (
                                                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                                    {company.category}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getTierColor(group.tier)}`}>
                                                            {company.score}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Legend */}
                    <div className="mt-12 bg-white rounded-2xl p-6 shadow-md">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">편차치 등급 안내</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded"></div>
                                <span className="text-sm font-medium">S+ (80~): 최고 등급</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded"></div>
                                <span className="text-sm font-medium">S (75~79): 초우수급</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
                                <span className="text-sm font-medium">A+ (70~74): 우수급</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded"></div>
                                <span className="text-sm font-medium">A (65~69): 상급</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-4">
                            편차치는 해당 기업의 입사 경쟁률, 선호도, 연봉 등을 종합적으로 고려한 지표입니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}