import { motion } from 'framer-motion'
import type { QuizMode } from '../data/questions'

type Props = {
  onStart: (mode: QuizMode) => void
}

export function CoverScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* 标题块 */}
        <div className="text-center mb-8 relative">
          <span className="tape inline-block mb-5 text-sm">
            16 PERSONALITIES TEST
          </span>
          <h1 className="text-[2.6rem] sm:text-5xl font-black leading-[1.05] mb-3 text-[var(--ink)]">
            <span className="underline-mark">看见</span>
            <br />
            <span className="relative inline-block">
              真实的你
              <SparkleSvg className="absolute -top-3 -right-7 w-7 h-7 animate-wiggle" />
            </span>
          </h1>
          <p className="text-[var(--ink)]/70 mt-2 text-base">
            从一道题开始 · 给自己一面镜子
          </p>
        </div>

        {/* 模式选项 */}
        <div className="space-y-4">
          <ModeCard
            mode="simple"
            emoji="⚡"
            title="简单版"
            meta="16 题 · 约 2 分钟"
            desc="先尝个鲜,够看个大概"
            badge="新手友好"
            color="var(--acid-yellow)"
            rotate={-1.2}
            onClick={() => onStart('simple')}
          />
          <ModeCard
            mode="accurate"
            emoji="🎯"
            title="准确版"
            meta="28 题 · 约 4 分钟"
            desc="想被精准戳中?选这个"
            badge="更准"
            color="var(--mint)"
            rotate={1.2}
            onClick={() => onStart('accurate')}
          />
        </div>

        <div className="text-center mt-8">
          <span className="sticker-pop text-xs text-[var(--ink)]/80">
            ✨ 即测即出 · 无需注册 · 可生成分享图
          </span>
        </div>
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
  color,
  rotate,
}: {
  mode: QuizMode
  emoji: string
  title: string
  meta: string
  desc: string
  onClick: () => void
  badge?: string
  color: string
  rotate: number
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, rotate: rotate * 0.3 }}
      whileTap={{ scale: 0.97, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onClick={onClick}
      className="sticker w-full p-5 text-left flex items-center gap-4 group"
      style={{ background: color, transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="w-16 h-16 sticker-soft flex items-center justify-center text-3xl shrink-0 bg-white"
      >
        {emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl font-black text-[var(--ink)]">{title}</span>
          {badge && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--ink)] text-white font-bold tracking-wide">
              {badge}
            </span>
          )}
        </div>
        <div className="text-[var(--ink)]/65 text-xs mb-1.5 font-medium">{meta}</div>
        <div className="text-[var(--ink)]/85 text-sm leading-snug">{desc}</div>
      </div>
      <div className="text-[var(--ink)] text-3xl shrink-0 font-black group-hover:translate-x-1 transition-transform">
        →
      </div>
    </motion.button>
  )
}

function SparkleSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#ff3da3" stroke="#0f0a1f" strokeWidth="2">
      <path d="M12 2 C13 8 16 11 22 12 C16 13 13 16 12 22 C11 16 8 13 2 12 C8 11 11 8 12 2 Z" strokeLinejoin="round" />
    </svg>
  )
}
