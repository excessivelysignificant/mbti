import { motion, AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'
import { getQuestions, type QuizMode } from '../data/questions'
import type { Answers } from '../lib/score'
import { ProgressBar } from '../components/ProgressBar'

type Props = {
  mode: QuizMode
  onFinish: (answers: Answers) => void
  onBack: () => void
}

const OPTION_COLORS = ['#fff45e', '#93e6ff'] as const
const OPTION_TILT = [-1.4, 1.4] as const

export function QuizScreen({ mode, onFinish, onBack }: Props) {
  const questions = useMemo(() => getQuestions(mode), [mode])
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [direction, setDirection] = useState(1)
  const [picked, setPicked] = useState<number | null>(null)
  const [banter, setBanter] = useState<string | null>(null)

  const q = questions[step]

  const choose = (idx: 0 | 1) => {
    if (picked !== null) return
    setPicked(idx)
    const next = { ...answers, [q.id]: idx }
    setAnswers(next)

    const banterText = q.options[idx].banter
    if (banterText) setBanter(banterText)

    const delay = banterText ? 900 : 280

    setTimeout(() => {
      setPicked(null)
      setBanter(null)
      if (step === questions.length - 1) {
        onFinish(next)
      } else {
        setDirection(1)
        setStep((s) => s + 1)
      }
    }, delay)
  }

  const back = () => {
    if (picked !== null) return
    if (step === 0) {
      onBack()
      return
    }
    setDirection(-1)
    setStep((s) => s - 1)
  }

  return (
    <div className="min-h-screen flex flex-col px-5 py-6 sm:py-8">
      {/* 顶部进度 */}
      <div className="flex items-center gap-3 mb-7 max-w-md w-full mx-auto">
        <button
          onClick={back}
          className="w-10 h-10 sticker-soft text-[var(--ink)] text-lg font-black flex items-center justify-center shrink-0 bg-white"
          aria-label={step === 0 ? '返回' : '上一题'}
        >
          ←
        </button>
        <div className="flex-1">
          <ProgressBar current={step + 1} total={questions.length} />
        </div>
      </div>

      {/* 主内容 */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={q.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -36 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full max-w-md"
          >
            {/* 题目卡 */}
            <div
              className="sticker px-6 py-7 mb-8 relative"
              style={{ background: 'white', transform: 'rotate(-0.6deg)' }}
            >
              <div className="absolute -top-3 left-5 tape text-xs">
                Q{q.id} · {dimLabel(q.dim)}
              </div>
              <h2 className="text-[var(--ink)] text-xl sm:text-[1.4rem] font-bold leading-relaxed mt-1">
                {q.text}
              </h2>
            </div>

            {/* 选项 */}
            <div className="flex flex-col gap-4 relative">
              {q.options.map((opt, i) => {
                const active = picked === i
                return (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.025, rotate: OPTION_TILT[i] * 0.4 }}
                    onClick={() => choose(i as 0 | 1)}
                    className={`sticker w-full px-5 py-5 text-[var(--ink)] text-base sm:text-lg font-bold text-left flex items-center gap-3 transition-transform`}
                    style={{
                      background: active ? OPTION_COLORS[i] : 'white',
                      transform: `rotate(${OPTION_TILT[i]}deg)`,
                    }}
                  >
                    <span
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-black shrink-0 border-2 border-[var(--ink)]"
                      style={{
                        background: OPTION_COLORS[i],
                      }}
                    >
                      {i === 0 ? 'A' : 'B'}
                    </span>
                    <span className="flex-1">{opt.label}</span>
                  </motion.button>
                )
              })}

              {/* 选完吐槽气泡 */}
              <AnimatePresence>
                {banter && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.4, y: 18, rotate: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotate: -3 }}
                    exit={{ opacity: 0, scale: 0.5, y: -10 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    className="absolute left-1/2 -translate-x-1/2 -top-12 sticker-pop bg-[var(--hot-pink)] text-white text-sm font-bold pointer-events-none"
                  >
                    💬 {banter}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="text-center text-[var(--ink)]/55 text-xs mt-7 font-medium">
        没有标准答案,选最像你的那个就好 ✨
      </div>
    </div>
  )
}

function dimLabel(dim: 'EI' | 'SN' | 'TF' | 'JP') {
  return {
    EI: '能量来源',
    SN: '信息处理',
    TF: '决策方式',
    JP: '生活态度',
  }[dim]
}
