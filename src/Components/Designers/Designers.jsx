import React from "react";
import { useRealtimeCollection } from "../../lib/hook"; 
const CompanyCard = ({ company }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                    src={company.img}
                    alt={company.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-800 mb-2 text-lg line-clamp-1">{company.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed flex-grow">
                    {company.desc}
                </p>
            </div>
        </div>
    );
};

const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-200" />
        <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>
    </div>
);

export default function App() {
    const { data: companies, loading, error } = useRealtimeCollection("db/designers");

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12 tracking-tight">
                    ԴԻԶԱՅՆԵՐՆԵՐ
                </h1>

                {error && (
                    <div className="text-center text-red-500 p-10 bg-red-50 rounded-2xl">
                        Տվյալների բեռնման սխալ։ {error}
                    </div>
                )}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {loading ? (
                        Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
                    ) : (
                        companies.map((company) => (
                            <CompanyCard key={company.id} company={company} />
                        ))
                    )}
                </div>

                {!loading && companies.length === 0 && (
                    <div className="text-center text-gray-400 py-20">
                        Տվյալներ չեն գտնվել:
                    </div>
                )}
            </div>
        </div>
    );
}