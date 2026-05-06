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
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        {/* hero */}
        <div className="text-center mb-7">
          <div className="flex justify-center mb-4">
            <div
              className="relative w-36 h-36 rounded-full p-1 animate-float shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${personality.gradient[0]}, ${personality.gradient[1]})`,
              }}
            >
              <div className="w-full h-full rounded-full bg-white/95 overflow-hidden flex items-center justify-center">
                <img
                  src={avatar}
                  alt={personality.name}
                  className="w-full h-full object-contain select-none"
                  draggable={false}
                />
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl select-none"
                aria-hidden
              >
                {personality.emoji}
              </div>
            </div>
          </div>
          <div className="text-white/70 tracking-[0.4em] text-xs mb-2">{personality.code}</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 leading-tight">
            {personality.name}
          </h1>
          <p className="text-white/85 italic px-2">"{personality.tagline}"</p>
        </div>

        {/* dimension bars */}
        <div className="glass-strong rounded-3xl p-6 mb-5 space-y-4">
          <DimensionBar leftLabel="外向 E" rightLabel="I 内向" pct={percentages.EI} />
          <DimensionBar leftLabel="实感 S" rightLabel="N 直觉" pct={percentages.SN} />
          <DimensionBar leftLabel="思考 T" rightLabel="F 情感" pct={percentages.TF} />
          <DimensionBar leftLabel="判断 J" rightLabel="P 知觉" pct={percentages.JP} />
        </div>

        <SectionCard title="关于你">
          <p className="text-white/85 leading-relaxed">{personality.description}</p>
        </SectionCard>

        <SectionCard title="✨ 你的优势">
          <ul className="space-y-2">
            {personality.strengths.map((s) => (
              <li key={s} className="text-white/85 flex">
                <span className="mr-2 text-white/50">·</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="🌱 可以更好">
          <ul className="space-y-2">
            {personality.weaknesses.map((s) => (
              <li key={s} className="text-white/85 flex">
                <span className="mr-2 text-white/50">·</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="💞 默契搭档">
          <div className="flex gap-3 flex-wrap">
            {personality.bestMatch.map((c) => {
              const m = PERSONALITIES[c]
              return (
                <div
                  key={c}
                  className="pl-1 pr-4 py-1 rounded-full bg-white/15 border border-white/20 text-white/95 text-sm flex items-center gap-2.5"
                >
                  <div
                    className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${m.gradient[0]}, ${m.gradient[1]})`,
                    }}
                  >
                    <img
                      src={getAvatarDataUri(m.code)}
                      alt={m.name}
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  </div>
                  <span className="font-semibold tracking-wide">{m.code}</span>
                  <span className="text-white/70">{m.name}</span>
                </div>
              )
            })}
          </div>
        </SectionCard>

        {/* actions */}
        <div className="flex flex-col gap-3 mt-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            onClick={onShare}
            className="w-full py-4 rounded-2xl text-base sm:text-lg font-semibold text-white shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${personality.gradient[0]}, ${personality.gradient[1]})`,
              boxShadow: `0 12px 36px ${hex2rgba(personality.gradient[1], 0.45)}`,
            }}
          >
            📸 生成我的人格卡片
          </motion.button>
          <button
            onClick={onRestart}
            className="w-full py-3 rounded-2xl text-white/85 hover:text-white bg-white/10 hover:bg-white/15 transition border border-white/20 text-sm"
          >
            重新测试
          </button>
        </div>
      </motion.div>

      {/* off-screen 渲染分享卡 (转 PNG 用) */}
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
        <ShareCard ref={cardRef} result={result} />
      </div>

      <ShareCardModal
        open={modalOpen}
        dataUrl={dataUrl}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-3xl p-6 mb-5">
      <h3 className="text-white text-lg font-semibold mb-3">{title}</h3>
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
      <div className="flex justify-between text-sm text-white/85 mb-1.5">
        <span>{leftLabel} {pct}%</span>
        <span>{100 - pct}% {rightLabel}</span>
      </div>
      <div className="h-2 rounded-full bg-white/15 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-300 via-fuchsia-400 to-cyan-300"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function hex2rgba(hex: string, alpha: number) {
  const c = hex.replace('#', '')
  const v = c.length === 3 ? c.split('').map((x) => x + x).join('') : c
  const num = parseInt(v, 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  return `rgba(${r},${g},${b},${alpha})`
}

const ShareCard = forwardRef<HTMLDivElement, { result: ScoreResult }>(({ result }, ref) => {
  const { personality, percentages } = result
  const [from, to] = personality.gradient
  const avatar = getAvatarDataUri(personality.code)
  return (
    <div
      ref={ref}
      style={{
        width: 750,
        padding: '60px 50px 50px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
        background: `linear-gradient(160deg, ${from} 0%, ${to} 100%)`,
        color: '#fff',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ fontSize: 14, letterSpacing: 6, opacity: 0.85 }}>
          16 PERSONALITIES
        </div>
        <div
          style={{
            position: 'relative',
            width: 240,
            height: 240,
            margin: '24px auto 0',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.95)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src={avatar}
            alt={personality.name}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -4,
              right: -4,
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            {personality.emoji}
          </div>
        </div>
        <div style={{ fontSize: 18, letterSpacing: 12, marginTop: 28, opacity: 0.9 }}>
          {personality.code}
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, marginTop: 6 }}>
          {personality.name}
        </div>
        <div style={{ fontSize: 22, opacity: 0.9, marginTop: 12, fontStyle: 'italic' }}>
          "{personality.tagline}"
        </div>
      </div>

      <div
        style={{
          background: 'rgba(255,255,255,0.18)',
          borderRadius: 24,
          padding: 28,
          marginBottom: 24,
        }}
      >
        {[
          { l: '外向 E', r: 'I 内向', v: percentages.EI },
          { l: '实感 S', r: 'N 直觉', v: percentages.SN },
          { l: '思考 T', r: 'F 情感', v: percentages.TF },
          { l: '判断 J', r: 'P 知觉', v: percentages.JP },
        ].map((b, i) => (
          <div key={i} style={{ marginBottom: i < 3 ? 18 : 0 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 18,
                marginBottom: 6,
              }}
            >
              <span>{b.l} {b.v}%</span>
              <span>{100 - b.v}% {b.r}</span>
            </div>
            <div
              style={{
                height: 8,
                background: 'rgba(255,255,255,0.25)',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <div style={{ width: `${b.v}%`, height: '100%', background: '#fff' }} />
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: 'rgba(255,255,255,0.18)',
          borderRadius: 24,
          padding: 28,
          fontSize: 20,
          lineHeight: 1.7,
          marginBottom: 28,
        }}
      >
        {personality.description}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.18)',
            borderRadius: 24,
            padding: 24,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>✨ 优势</div>
          {personality.strengths.slice(0, 3).map((s) => (
            <div key={s} style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.95 }}>
              · {s}
            </div>
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.18)',
            borderRadius: 24,
            padding: 24,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>💞 默契搭档</div>
          {personality.bestMatch.map((c) => {
            const m = PERSONALITIES[c]
            return (
              <div
                key={c}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                  fontSize: 16,
                  opacity: 0.95,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${m.gradient[0]}, ${m.gradient[1]})`,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={getAvatarDataUri(m.code)}
                    alt={m.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <span style={{ fontWeight: 600 }}>{m.code}</span>
                <span style={{ opacity: 0.85 }}>{m.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ textAlign: 'center', opacity: 0.75, fontSize: 14, marginTop: 20 }}>
        16 PERSONALITIES TEST · 测一测,你是谁
      </div>
    </div>
  )
})
ShareCard.displayName = 'ShareCard'
