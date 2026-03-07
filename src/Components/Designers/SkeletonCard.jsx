import { useRealtimeCollection } from "../../lib/hook"; 
export default  SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-200" />
        <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>
    </div>
);
