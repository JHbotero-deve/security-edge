import { motion } from 'framer-motion';

interface NexusChartProps {
  data: number[];
  color?: string;
  height?: number;
}

export const NexusChart = ({ data, color = '#3b82f6', height = 60 }: NexusChartProps) => {
  const max = Math.max(...data);

  return (
    <div className="flex items-end gap-1 h-[60px] w-full group/chart" style={{ height }}>
      {data.map((val, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(val / max) * 100}%` }}
          transition={{ delay: i * 0.05, type: 'spring', stiffness: 100 }}
          className="flex-1 rounded-sm opacity-40 group-hover/chart:opacity-80 transition-opacity"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};
