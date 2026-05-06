import { useEffect, useState } from 'react'
import { CoverScreen } from './screens/CoverScreen'
import { QuizScreen } from './screens/QuizScreen'
import { ResultScreen } from './screens/ResultScreen'
import { GradientBackground } from './components/GradientBackground'
import { calculateMBTI, type Answers, type ScoreResult } from './lib/score'
import type { QuizMode } from './data/questions'

type Stage = 'cover' | 'quiz' | 'result'

export default function App() {
  const [stage, setStage] = useState<Stage>('cover')
  const [mode, setMode] = useState<QuizMode>('simple')
  const [result, setResult] = useState<ScoreResult>()

  const start = (m: QuizMode) => {
    setMode(m)
    setStage('quiz')
  }
  const finish = (answers: Answers) => {
    setResult(calculateMBTI(answers))
    setStage('result')
  }
  const restart = () => {
    setResult(undefined)
    setStage('cover')
  }
  const backFromQuiz = () => setStage('cover')

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [stage])

  return (
    <div className="relative min-h-screen">
      <GradientBackground accent={result?.personality.gradient} />
      {stage === 'cover' && <CoverScreen onStart={start} />}
      {stage === 'quiz' && (
        <QuizScreen mode={mode} onFinish={finish} onBack={backFromQuiz} />
      )}
      {stage === 'result' && result && (
        <ResultScreen result={result} onRestart={restart} />
      )}
    </div>
  )
}
