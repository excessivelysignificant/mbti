import { createAvatar } from '@dicebear/core'
import { adventurer } from '@dicebear/collection'
import type { MBTICode } from '../data/personalities'

/**
 * adventurer 风格:大眼/丰富发型/夸张表情,中二/可爱兼具
 * 每种 code 用不同 seed 保证差异化大
 */
const SEEDS: Record<MBTICode, string> = {
  INTJ: 'INTJ-strategy-master-9',
  INTP: 'INTP-curious-mind-3',
  ENTJ: 'ENTJ-king-2',
  ENTP: 'ENTP-debater-5',
  INFJ: 'INFJ-mystic-7',
  INFP: 'INFP-dreamer-1',
  ENFJ: 'ENFJ-leader-4',
  ENFP: 'ENFP-spark-8',
  ISTJ: 'ISTJ-rock-2',
  ISFJ: 'ISFJ-warm-6',
  ESTJ: 'ESTJ-boss-3',
  ESFJ: 'ESFJ-host-9',
  ISTP: 'ISTP-tinker-4',
  ISFP: 'ISFP-artist-7',
  ESTP: 'ESTP-rebel-1',
  ESFP: 'ESFP-star-5',
}

export function getAvatarSvg(code: MBTICode): string {
  return createAvatar(adventurer, {
    seed: SEEDS[code],
    size: 200,
    backgroundColor: ['transparent'],
    radius: 0,
  }).toString()
}

export function getAvatarDataUri(code: MBTICode): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(getAvatarSvg(code))}`
}
