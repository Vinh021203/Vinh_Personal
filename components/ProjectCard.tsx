import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export const ProjectCard = ({ title, description, image, link }: ProjectCardProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col justify-between h-full overflow-hidden transition-all duration-300 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md shadow-md hover:shadow-lg hover:scale-[1.02] group"
    >
      <img
        src={image}
        alt={`Hình ảnh dự án: ${title}`}
        className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105 rounded-t-xl"
      />

      <div className="flex flex-col justify-between flex-1 p-5">
        <div className="mb-3">
          <h3 className="mb-1 text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-400 line-clamp-3">{description}</p>
        </div>

        <div className="flex justify-end text-pink-400">
          <ExternalLink size={18} />
        </div>
      </div>
    </a>
  );
};
