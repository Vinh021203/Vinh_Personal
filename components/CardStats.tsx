'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

type CardStatsProps = {
  label: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
};

export const CardStats = ({ label, value, icon, bg }: CardStatsProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
  Math.floor(latest).toLocaleString('vi-VN')
  );

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1,
      ease: 'easeOut',
    });

    return controls.stop;
  }, [value]);

  return (
    <div
      className={`rounded-xl p-6 text-white bg-gradient-to-br ${bg} flex items-center justify-between hover:scale-[1.03] transition-transform duration-200`}
    >
      <div>
        <motion.div className="text-2xl font-bold">{rounded}</motion.div>
        <div className="mt-1 text-sm">{label}</div>
      </div>
      <div className="opacity-30">{icon}</div>
    </div>
  );
};
