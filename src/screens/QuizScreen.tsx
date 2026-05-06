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

export function QuizScreen({ mode, onFinish, onBack }: Props) {
  const questions = useMemo(() => getQuestions(mode), [mode])
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [direction, setDirection] = useState(1)
  const [picked, setPicked] = useState<number | null>(null)

  const q = questions[step]

  const choose = (idx: 0 | 1) => {
    if (picked !== null) return
    setPicked(idx)
    const next = { ...answers, [q.id]: idx }
    setAnswers(next)

    setTimeout(() => {
      setPicked(null)
      if (step === questions.length - 1) {
        onFinish(next)
      } else {
        setDirection(1)
        setStep((s) => s + 1)
      }
    }, 260)
  }

  const back = () => {
    if (step === 0) {
      onBack()
      return
    }
    setDirection(-1)
    setStep((s) => s - 1)
  }

  return (
    <div className="min-h-screen flex flex-col px-5 py-6 sm:py-8">
      <div className="flex items-center gap-3 mb-6 max-w-md w-full mx-auto">
        <button
          onClick={back}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white text-lg flex items-center justify-center transition"
          aria-label={step === 0 ? '返回' : '上一题'}
        >
          ←
        </button>
        <div className="flex-1">
          <ProgressBar current={step + 1} total={questions.length} />
        </div>
      </div>

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
            <div className="glass-strong rounded-3xl px-6 py-7 mb-6">
              <div className="flex items-center gap-2 text-white/55 text-xs mb-3 tracking-widest">
                <span>Q{q.id}</span>
                <span className="opacity-60">·</span>
                <span>{dimLabel(q.dim)}</span>
              </div>
              <h2 className="text-white text-xl sm:text-[1.4rem] font-semibold leading-relaxed">
                {q.text}
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {q.options.map((opt, i) => {
                const active = picked === i
                return (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    onClick={() => choose(i as 0 | 1)}
                    className={`relative w-full px-5 py-5 rounded-2xl text-white text-base sm:text-[1.05rem] font-medium text-left transition border backdrop-blur-md
                      ${active
                        ? 'bg-white/30 border-white/60 shadow-2xl'
                        : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40'
                      }
                    `}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full mr-3 text-xs font-bold transition
                        ${active ? 'bg-white text-purple-700' : 'bg-white/20 text-white/80'}`}
                    >
                      {i === 0 ? 'A' : 'B'}
                    </span>
                    {opt.label}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="text-center text-white/45 text-xs mt-6">
        没有标准答案,选最贴近自己直觉的那个
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
