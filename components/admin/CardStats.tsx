'use client';

import React from 'react';

export interface CardStatsProps {
  label: string;
  value: number;
  icon?: React.ReactNode;      // ✅ Thêm prop icon
  bg?: string;                 // ✅ Thêm prop bg
}

export const CardStats = ({ label, value, icon, bg = 'from-slate-800 to-slate-700' }: CardStatsProps) => {
  return (
    <div className={`rounded-xl p-6 bg-gradient-to-br ${bg} shadow-lg text-white flex items-center gap-4`}>
      <div className="p-2 rounded-lg bg-white/10">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-300">{label}</div>
      </div>
    </div>
  );
};
