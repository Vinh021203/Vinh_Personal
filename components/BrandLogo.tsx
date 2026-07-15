import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({ className = "h-9 w-auto", priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/vinhworks-logo-header.png"
      alt="VinhWorks"
      width={640}
      height={103}
      priority={priority}
      sizes="(max-width: 768px) 150px, 190px"
      className={`object-contain ${className}`}
    />
  );
}
