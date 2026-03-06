import React from 'react';
import { Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';

const contactData = [
  {
    id: 1,
    icon: <Phone className="w-8 h-8 text-[#62d4a0]" />,
    label: '+374 (33) 76 - 73 - 77',
    link: 'tel:+37433767377',
  },
  {
    id: 2,
    icon: <Mail className="w-8 h-8 text-[#62d4a0]" />,
    label: 'sstonemarket@yandex.ru',
    link: 'mailto:sstonemarket@yandex.ru',
  },
  {
    id: 3,
    icon: <Instagram className="w-8 h-8 text-[#62d4a0]" />,
    label: 'stonemarket.am',
    link: 'https://instagram.com/stonemarket.am',
  },
  {
    id: 4,
    icon: <Facebook className="w-8 h-8 text-[#62d4a0]" />,
    label: 'Stone Market',
    link: 'https://facebook.com/stonemarket',
  },
  {
    id: 5,
    icon: <MessageCircle className="w-8 h-8 text-[#62d4a0]" />,
    label: 'WhatsApp',
    link: 'https://wa.me/37433767377',
  },
];

export default function ContactSection (){
  return (

    <section className="bg-[#f5f5f5] py-16 px-4">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 tracking-wider text-slate-800">
          ԿՈՆՏԱԿՏՆԵՐ
        </h2>

        <div className="flex flex-wrap justify-center bg-white border-l border-gray-300">
          {contactData.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[200px] flex flex-col items-center justify-center p-10 border-r border-gray-300 hover:bg-gray-50 transition-colors group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-sm font-bold text-black text-center">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

