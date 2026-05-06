import { motion } from 'framer-motion'

type Props = { current: number; total: number }

export function ProgressBar({ current, total }: Props) {
  const pct = (current / total) * 100
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2 text-white/80 text-sm tracking-wide">
        <span>问题 {current} / {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-pink-300 via-fuchsia-400 to-cyan-300"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  )
}
