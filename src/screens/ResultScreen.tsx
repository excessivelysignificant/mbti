import { motion } from 'framer-motion'
import { forwardRef, useMemo, useRef, useState } from 'react'
import type { ScoreResult } from '../lib/score'
import { generateShareCard } from '../lib/shareCard'
import { ShareCardModal } from '../components/ShareCardModal'
import { PERSONALITIES } from '../data/personalities'
import { getAvatarDataUri } from '../lib/avatar'

type Props = {
  result: ScoreResult
  onRestart: () => void
}

export function ResultScreen({ result, onRestart }: Props) {
  const { personality, percentages } = result
  const cardRef = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [dataUrl, setDataUrl] = useState<string>()
  const avatar = useMemo(() => getAvatarDataUri(personality.code), [personality.code])
  const quote = useMemo(() => {
    const list = personality.quotes
    return list[Math.floor(Math.random() * list.length)]
  }, [personality.code])

  const onShare = async () => {
    setModalOpen(true)
    setDataUrl(undefined)
    await new Promise((r) => setTimeout(r, 80))
    if (!cardRef.current) return
    try {
      const url = await generateShareCard(cardRef.current)
      setDataUrl(url)
    } catch (err) {
      console.error('生成分享卡失败', err)
    }
  }

  return (
    <div className="min-h-screen px-5 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        {/* hero 头像贴纸 */}
        <div className="text-center mb-7 relative">
          <span className="tape inline-block mb-4 text-xs">YOUR TYPE IS</span>
          <div className="flex justify-center mb-5">
            <div className="relative animate-float">
              <div
                className="w-44 h-44 sticker overflow-hidden flex items-center justify-center"
                style={{ background: personality.gradient[0], transform: 'rotate(-3deg)' }}
              >
                <img
                  src={avatar}
                  alt={personality.name}
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
              <div
                className="absolute -bottom-2 -right-3 w-14 h-14 sticker bg-white flex items-center justify-center text-3xl"
                style={{ transform: 'rotate(8deg)' }}
              >
                {personality.emoji}
              </div>
              <div
                className="absolute -top-3 -left-4 sticker-pop bg-[var(--acid-yellow)] text-xs font-black text-[var(--ink)]"
                style={{ transform: 'rotate(-12deg)' }}
              >
                {personality.code}
              </div>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-[var(--ink)] mb-2 leading-none">
            <span className="underline-mark">{personality.name}</span>
          </h1>
          <p className="text-[var(--ink)]/80 mt-3 text-base font-medium px-2">
            {personality.tagline}
          </p>
        </div>

        {/* 金句卡片 */}
        <div
          className="sticker p-5 mb-6 relative"
          style={{ background: personality.gradient[1], transform: 'rotate(-0.8deg)' }}
        >
          <span className="absolute -top-3 left-4 tape text-[10px]">心声</span>
          <p className="text-[var(--ink)] text-lg font-bold leading-relaxed mt-1 text-center">
            "{quote}"
          </p>
        </div>

        {/* 维度条 */}
        <div className="sticker p-5 mb-5 bg-white">
          <span className="absolute -top-3 left-5 tape text-[10px]">DIMENSIONS</span>
          <div className="space-y-3 mt-2">
            <DimensionBar leftLabel="外向 E" rightLabel="I 内向" pct={percentages.EI} />
            <DimensionBar leftLabel="实感 S" rightLabel="N 直觉" pct={percentages.SN} />
            <DimensionBar leftLabel="思考 T" rightLabel="F 情感" pct={percentages.TF} />
            <DimensionBar leftLabel="判断 J" rightLabel="P 知觉" pct={percentages.JP} />
          </div>
        </div>

        <SectionCard title="关于你" tape="ABOUT" tilt={0.6}>
          <p className="text-[var(--ink)] leading-relaxed text-[15px]">
            {personality.description}
          </p>
        </SectionCard>

        <SectionCard title="✨ 你的优势" tape="STRENGTHS" tilt={-0.4}>
          <ul className="space-y-1.5">
            {personality.strengths.map((s) => (
              <li key={s} className="text-[var(--ink)] flex font-medium">
                <span className="mr-2 text-[var(--hot-pink)]">✦</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="🌱 注意点" tape="MIND" tilt={0.5}>
          <ul className="space-y-1.5">
            {personality.weaknesses.map((s) => (
              <li key={s} className="text-[var(--ink)] flex font-medium">
                <span className="mr-2 text-[var(--tomato)]">!</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="💞 默契搭档" tape="MATCH" tilt={-0.6}>
          <div className="flex gap-3 flex-wrap">
            {personality.bestMatch.map((c) => {
              const m = PERSONALITIES[c]
              return (
                <div
                  key={c}
                  className="sticker-pop bg-white"
                  style={{ padding: '6px 14px 6px 6px', gap: 10 }}
                >
                  <div
                    className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center border-2 border-[var(--ink)]"
                    style={{ background: m.gradient[0] }}
                  >
                    <img
                      src={getAvatarDataUri(m.code)}
                      alt={m.name}
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  </div>
                  <span className="font-black text-[var(--ink)]">{m.code}</span>
                  <span className="text-[var(--ink)]/65 ml-1 text-sm">{m.name}</span>
                </div>
              )
            })}
          </div>
        </SectionCard>

        {/* actions */}
        <div className="flex flex-col gap-3 mt-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02, rotate: -0.6 }}
            onClick={onShare}
            className="sticker w-full py-4 text-lg font-black text-[var(--ink)]"
            style={{ background: 'var(--acid-yellow)' }}
          >
            📸 生成我的人格卡片
          </motion.button>
          <button
            onClick={onRestart}
            className="sticker-soft w-full py-3 text-[var(--ink)] hover:bg-white/50 bg-white text-sm font-bold"
          >
            重新测试
          </button>
        </div>

        <p className="text-center text-[var(--ink)]/45 text-xs mt-6 font-medium">
          16 PERSONALITIES · 看见真实的你
        </p>
      </motion.div>

      {/* off-screen 渲染分享卡 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: '-99999px',
          width: 750,
          pointerEvents: 'none',
        }}
      >
        <ShareCard ref={cardRef} result={result} quote={quote} />
      </div>

      <ShareCardModal
        open={modalOpen}
        dataUrl={dataUrl}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}

function SectionCard({
  title,
  tape,
  tilt = 0,
  children,
}: {
  title: string
  tape: string
  tilt?: number
  children: React.ReactNode
}) {
  return (
    <div
      className="sticker p-5 mb-5 bg-white relative"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <span className="absolute -top-3 left-5 tape text-[10px]">{tape}</span>
      <h3 className="text-[var(--ink)] text-lg font-black mb-3 mt-1">{title}</h3>
      {children}
    </div>
  )
}

function DimensionBar({
  leftLabel,
  rightLabel,
  pct,
}: {
  leftLabel: string
  rightLabel: string
  pct: number
}) {
  return (
    <div>
      <div className="flex justify-between text-sm text-[var(--ink)] font-bold mb-1.5">
        <span>{leftLabel} {pct}%</span>
        <span>{100 - pct}% {rightLabel}</span>
      </div>
      <div className="h-2.5 rounded-full border-2 border-[var(--ink)] bg-white overflow-hidden">
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(90deg, #ff3da3, #ffe45e, #93e6ff)' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

const ShareCard = forwardRef<
  HTMLDivElement,
  { result: ScoreResult; quote: string }
>(({ result, quote }, ref) => {
  const { personality, percentages } = result
  const [c1, c2] = personality.gradient
  const avatar = getAvatarDataUri(personality.code)

  return (
    <div
      ref={ref}
      style={{
        width: 750,
        padding: 50,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
        background: '#fffaf2',
        color: '#0f0a1f',
        boxSizing: 'border-box',
        backgroundImage:
          'radial-gradient(#0f0a1f 1.6px, transparent 1.8px)',
        backgroundSize: '20px 20px',
      }}
    >
      {/* 标题胶带 */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <span
          style={{
            display: 'inline-block',
            background: '#fff45e',
            border: '3px solid #0f0a1f',
            padding: '8px 18px',
            fontWeight: 800,
            letterSpacing: 4,
            fontSize: 14,
            transform: 'rotate(-2deg)',
            boxShadow: '4px 4px 0 #0f0a1f',
          }}
        >
          16 PERSONALITIES TEST
        </span>
      </div>

      {/* 头像贴纸 */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28, position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: 280,
              height: 280,
              background: c1,
              border: '4px solid #0f0a1f',
              borderRadius: 36,
              boxShadow: '10px 10px 0 #0f0a1f',
              transform: 'rotate(-3deg)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={avatar}
              alt={personality.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          {/* code 贴纸 */}
          <div
            style={{
              position: 'absolute',
              top: -16,
              left: -28,
              background: '#fff45e',
              border: '3px solid #0f0a1f',
              borderRadius: 999,
              padding: '8px 18px',
              fontWeight: 900,
              fontSize: 22,
              letterSpacing: 2,
              transform: 'rotate(-12deg)',
              boxShadow: '4px 4px 0 #0f0a1f',
            }}
          >
            {personality.code}
          </div>
          {/* emoji 贴纸 */}
          <div
            style={{
              position: 'absolute',
              bottom: -10,
              right: -16,
              width: 80,
              height: 80,
              background: '#fff',
              border: '3px solid #0f0a1f',
              borderRadius: 22,
              boxShadow: '4px 4px 0 #0f0a1f',
              transform: 'rotate(8deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 44,
            }}
          >
            {personality.emoji}
          </div>
        </div>
      </div>

      {/* 名字大字 */}
      <div style={{ textAlign: 'center', marginBottom: 22 }}>
        <div
          style={{
            display: 'inline-block',
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1,
            backgroundImage: 'linear-gradient(transparent 60%, #fff45e 60%)',
            padding: '0 8px',
          }}
        >
          {personality.name}
        </div>
      </div>
      <div
        style={{
          fontSize: 22,
          textAlign: 'center',
          marginBottom: 30,
          fontWeight: 600,
          opacity: 0.85,
        }}
      >
        {personality.tagline}
      </div>

      {/* 金句卡 */}
      <div
        style={{
          background: c2,
          border: '4px solid #0f0a1f',
          borderRadius: 28,
          padding: '24px 28px',
          marginBottom: 28,
          fontSize: 24,
          fontWeight: 700,
          textAlign: 'center',
          lineHeight: 1.5,
          boxShadow: '6px 6px 0 #0f0a1f',
          transform: 'rotate(-0.6deg)',
        }}
      >
        💬 "{quote}"
      </div>

      {/* 维度卡 */}
      <div
        style={{
          background: '#fff',
          border: '4px solid #0f0a1f',
          borderRadius: 28,
          padding: 28,
          marginBottom: 24,
          boxShadow: '6px 6px 0 #0f0a1f',
        }}
      >
        {[
          { l: '外向 E', r: 'I 内向', v: percentages.EI },
          { l: '实感 S', r: 'N 直觉', v: percentages.SN },
          { l: '思考 T', r: 'F 情感', v: percentages.TF },
          { l: '判断 J', r: 'P 知觉', v: percentages.JP },
        ].map((b, i) => (
          <div key={i} style={{ marginBottom: i < 3 ? 16 : 0 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 18,
                marginBottom: 6,
                fontWeight: 700,
              }}
            >
              <span>{b.l} {b.v}%</span>
              <span>{100 - b.v}% {b.r}</span>
            </div>
            <div
              style={{
                height: 14,
                background: '#fff',
                border: '2.5px solid #0f0a1f',
                borderRadius: 999,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${b.v}%`,
                  height: '100%',
                  background:
                    'linear-gradient(90deg, #ff3da3 0%, #ffe45e 50%, #93e6ff 100%)',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 默契搭档 */}
      <div
        style={{
          background: '#fff',
          border: '4px solid #0f0a1f',
          borderRadius: 28,
          padding: 24,
          marginBottom: 24,
          boxShadow: '6px 6px 0 #0f0a1f',
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 14 }}>💞 默契搭档</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {personality.bestMatch.map((c) => {
            const m = PERSONALITIES[c]
            return (
              <div
                key={c}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 16px 8px 8px',
                  background: '#fff',
                  border: '3px solid #0f0a1f',
                  borderRadius: 999,
                  boxShadow: '3px 3px 0 #0f0a1f',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: m.gradient[0],
                    border: '2.5px solid #0f0a1f',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={getAvatarDataUri(m.code)}
                    alt={m.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <span style={{ fontWeight: 900, fontSize: 18 }}>{m.code}</span>
                <span style={{ opacity: 0.7, fontSize: 16 }}>{m.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* 底部 */}
      <div
        style={{
          textAlign: 'center',
          fontSize: 14,
          opacity: 0.6,
          marginTop: 12,
          fontWeight: 600,
          letterSpacing: 2,
        }}
      >
        16 PERSONALITIES · 测一测,你是谁
      </div>
    </div>
  )
})
ShareCard.displayName = 'ShareCard'
