import { motion } from 'framer-motion'
import type { QuizMode } from '../data/questions'

type Props = {
  onStart: (mode: QuizMode) => void
}

export function CoverScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <div className="text-6xl mb-5 select-none animate-float">🌈</div>
          <div className="text-white/70 tracking-[0.4em] text-xs mb-2">16 PERSONALITIES</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 leading-tight">
            看见真实的你
          </h1>
          <p className="text-white/75">从一道题开始,认识你自己</p>
        </div>

        <div className="space-y-4">
          <ModeCard
            mode="simple"
            emoji="⚡"
            title="简单版"
            meta="16 题 · 约 2 分钟"
            desc="快速了解你的大致人格类型,适合刚接触 MBTI"
            onClick={() => onStart('simple')}
            badge="推荐新手"
          />
          <ModeCard
            mode="accurate"
            emoji="🎯"
            title="准确版"
            meta="28 题 · 约 4 分钟"
            desc="更细致的多维度刻画,结果更稳定可靠"
            onClick={() => onStart('accurate')}
            badge="更精准"
          />
        </div>

        <p className="text-white/45 text-xs text-center mt-8">
          即测即出 · 无需注册 · 可生成分享卡片
        </p>
      </motion.div>
    </div>
  )
}

function ModeCard({
  emoji,
  title,
  meta,
  desc,
  onClick,
  badge,
}: {
  mode: QuizMode
  emoji: string
  title: string
  meta: string
  desc: string
  onClick: () => void
  badge?: string
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onClick={onClick}
      className="glass-strong w-full rounded-3xl p-5 text-left flex items-center gap-4 group"
    >
      <div className="text-4xl shrink-0 group-hover:scale-110 transition-transform">
        {emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white text-xl font-semibold">{title}</span>
          {badge && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white/90 tracking-wide">
              {badge}
            </span>
          )}
        </div>
        <div className="text-white/60 text-xs mb-1.5">{meta}</div>
        <div className="text-white/80 text-sm leading-snug">{desc}</div>
      </div>
      <div className="text-white/50 text-2xl shrink-0 group-hover:translate-x-1 transition-transform">
        →
      </div>
    </motion.button>
  )
}
