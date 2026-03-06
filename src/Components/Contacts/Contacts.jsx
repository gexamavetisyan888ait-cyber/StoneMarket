import React from 'react';
import { Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useRealtimeCollection } from "../../lib/hook"; 

const iconMap = {
  Phone: <Phone className="w-8 h-8 text-[#62d4a0]" />,
  Mail: <Mail className="w-8 h-8 text-[#62d4a0]" />,
  Instagram: <Instagram className="w-8 h-8 text-[#62d4a0]" />,
  Facebook: <Facebook className="w-8 h-8 text-[#62d4a0]" />,
  MessageCircle: <MessageCircle className="w-8 h-8 text-[#62d4a0]" />,
};

export default function ContactSection() {
  const { data: contacts, loading, error } = useRealtimeCollection("db/contacts");

  if (error) return <div className="text-center py-10 text-red-500">Սխալ՝ {error}</div>;

  return (
    <section className="bg-[#f5f5f5] py-16 px-4">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 tracking-wider text-slate-800">
          ԿՈՆՏԱԿՏՆԵՐ
        </h2>

        <div className="flex flex-wrap justify-center bg-white border-l border-gray-300">
          {loading ? (
            [1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-1 min-w-[200px] p-20 border-r border-gray-300 animate-pulse bg-gray-50" />
            ))
          ) : (
            contacts.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] flex flex-col items-center justify-center p-10 border-r border-gray-300 hover:bg-gray-50 transition-colors group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform">
                  {iconMap[item.icon] || <MessageCircle className="w-8 h-8 text-[#62d4a0]" />}
                </div>
                <span className="text-sm font-bold text-black text-center">
                  {item.label}
                </span>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
}