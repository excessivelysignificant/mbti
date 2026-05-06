import { QUESTIONS, type Dim } from '../data/questions'
import { PERSONALITIES, type MBTICode, type Personality } from '../data/personalities'

export type Answers = Record<number, 0 | 1>

export type ScoreResult = {
  code: MBTICode
  personality: Personality
  /** 每个字母实际选中的次数 */
  rawScores: Record<'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P', number>
  /** 左侧字母 (E/S/T/J) 的占比 0-100 */
  percentages: Record<Dim, number>
}

const LEFT: Record<Dim, 'E' | 'S' | 'T' | 'J'> = { EI: 'E', SN: 'S', TF: 'T', JP: 'J' }
const RIGHT: Record<Dim, 'I' | 'N' | 'F' | 'P'> = { EI: 'I', SN: 'N', TF: 'F', JP: 'P' }

export function calculateMBTI(answers: Answers): ScoreResult {
  const dimSum: Record<Dim, number> = { EI: 0, SN: 0, TF: 0, JP: 0 }
  const dimCount: Record<Dim, number> = { EI: 0, SN: 0, TF: 0, JP: 0 }

  for (const q of QUESTIONS) {
    const idx = answers[q.id]
    if (idx === undefined) continue
    dimSum[q.dim] += q.options[idx].value
    dimCount[q.dim] += 1
  }

  const code = (
    pickLetter('EI', dimSum.EI) +
    pickLetter('SN', dimSum.SN) +
    pickLetter('TF', dimSum.TF) +
    pickLetter('JP', dimSum.JP)
  ) as MBTICode

  const lettersOf = (dim: Dim) => {
    const total = dimCount[dim] || 1
    const left = (dimSum[dim] + total) / 2
    const right = total - left
    return [left, right] as const
  }
  const [E, I] = lettersOf('EI')
  const [S, N] = lettersOf('SN')
  const [T, F] = lettersOf('TF')
  const [J, P] = lettersOf('JP')

  const pct = (dim: Dim) => {
    const total = dimCount[dim] || 1
    return Math.round(((dimSum[dim] + total) / (2 * total)) * 100)
  }

  return {
    code,
    personality: PERSONALITIES[code],
    rawScores: { E, I, S, N, T, F, J, P },
    percentages: { EI: pct('EI'), SN: pct('SN'), TF: pct('TF'), JP: pct('JP') },
  }
}

function pickLetter(dim: Dim, sum: number): string {
  if (sum > 0) return LEFT[dim]
  if (sum < 0) return RIGHT[dim]
  // 平局时偏向相对小众的一侧 (I/N/F/P),仅简单版偶尔出现
  return RIGHT[dim]
}
