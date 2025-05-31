import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  return (
    <div className="group p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-700 rounded-2xl transition-all hover:shadow-2xl hover:border-teal-400/40 hover:scale-[1.025] duration-300">
      <div className="flex items-center justify-center mb-5 text-teal-300 transition-transform duration-300 rounded-full shadow-inner w-14 h-14 bg-teal-900/20 group-hover:rotate-6 group-hover:scale-110 shadow-teal-600/30">
        <Icon size={28} />
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-400">{description}</p>
    </div>
  );
};
