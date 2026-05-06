import { createAvatar } from '@dicebear/core'
import { notionists } from '@dicebear/collection'
import type { MBTICode } from '../data/personalities'

/**
 * 用 DiceBear notionists (Notion 手绘风) 为每种 MBTI 生成唯一头像。
 * 同一个 code 永远得到同一张图;不同 code 视觉差异明显。
 */
export function getAvatarSvg(code: MBTICode): string {
  return createAvatar(notionists, {
    seed: `mbti-${code}`,
    size: 200,
    backgroundColor: ['transparent'],
    radius: 50,
  }).toString()
}

export function getAvatarDataUri(code: MBTICode): string {
  // 直接 inline SVG -> data URI (html-to-image 处理 <img src> 比 inline SVG 更稳)
  const svg = getAvatarSvg(code)
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
