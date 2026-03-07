import { useRealtimeCollection } from "../../lib/hook";

export default function Sidebar() {
  const {
    data: menuItems,
    loading,
    error,
  } = useRealtimeCollection("db/categories");
  return (
    <div className="bg-white w-full lg:w-80 rounded-2xl shadow-sm p-6 space-y-4 h-fit">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
        Կատեգորիաներ
      </h3>
      {menuItems.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-4 text-gray-700 hover:text-emerald-500 transition-all cursor-pointer p-3 hover:bg-gray-50 rounded-xl"
        >
          <span className="text-2xl">{item.icon}</span>
          <span className="font-semibold text-sm md:text-base">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}