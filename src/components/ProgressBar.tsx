import { motion } from 'framer-motion'

type Props = { current: number; total: number }

export function ProgressBar({ current, total }: Props) {
  const pct = (current / total) * 100
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5 text-[var(--ink)] text-xs font-bold tracking-wider">
        <span>{current} / {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-3 bg-white border-2 border-[var(--ink)] rounded-full overflow-hidden shadow-[3px_3px_0_var(--ink)]">
        <motion.div
          className="h-full"
          style={{
            background: 'linear-gradient(90deg, #ff3da3 0%, #ffe45e 50%, #93e6ff 100%)',
          }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  )
}
