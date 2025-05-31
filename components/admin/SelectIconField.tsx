import {
  LucideIcon,
  Code2,
  MonitorSmartphone,
  Layers,
  ServerCog,
  CheckCircle,
  BarChart3,
  Network,
} from 'lucide-react';

export const iconOptions = [
  { label: 'Code2', icon: Code2 },
  { label: 'MonitorSmartphone', icon: MonitorSmartphone },
  { label: 'Layers', icon: Layers },
  { label: 'ServerCog', icon: ServerCog },
  { label: 'CheckCircle', icon: CheckCircle },
  { label: 'BarChart3', icon: BarChart3 }, // ✅ SEO
  { label: 'Network', icon: Network },     // ✅ API
];

export const iconMap: Record<string, LucideIcon> = {
  Code2,
  MonitorSmartphone,
  Layers,
  ServerCog,
  CheckCircle,
  BarChart3,
  Network,
};


export default function SelectIconField({
  icon,
  setIcon,
}: {
  icon: string;
  setIcon: (val: string) => void;
}) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-teal-300">Chọn icon đại diện</label>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {iconOptions.map(({ label, icon: Icon }) => (
          <button
            type="button"
            key={label}
            onClick={() => setIcon(label)}
            className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-colors duration-200
              ${icon === label ? 'bg-teal-600 border-teal-400 text-white' : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-teal-300'}`}
          >
            <Icon size={20} />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
