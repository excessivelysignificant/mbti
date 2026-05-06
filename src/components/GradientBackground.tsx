type Props = {
  /** 当前主色 [primary, accent] - 用于色斑/装饰元素 */
  accent?: [string, string]
}

/**
 * Y2K 贴纸风背景:奶油底 + 网格 + 飘浮装饰元素 (星星/爱心/花)
 * 不再用渐变,改成纯色块 + 大量装饰图形
 */
export function GradientBackground({ accent }: Props) {
  const [c1, c2] = accent ?? ['#ff3da3', '#93e6ff']
  return (
    <>
      {/* 奶油纸底 */}
      <div className="fixed inset-0 -z-30" style={{ background: '#fffaf2' }} />
      {/* 网格 */}
      <div className="fixed inset-0 -z-29 bg-grid" aria-hidden />
      {/* 文档全长兜底 */}
      <div
        aria-hidden
        className="absolute inset-0 -z-30"
        style={{ background: '#fffaf2' }}
      />
      <div className="absolute inset-0 -z-29 bg-dots" aria-hidden />

      {/* 装饰: 飘浮的色斑 */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none" aria-hidden>
        <div
          className="absolute -top-24 -left-16 w-72 h-72 rounded-full animate-float"
          style={{
            background: c1,
            border: '3px solid #0f0a1f',
            boxShadow: '6px 6px 0 #0f0a1f',
            opacity: 0.85,
          }}
        />
        <div
          className="absolute top-1/3 -right-20 w-64 h-64 rounded-[42%_58%_64%_36%/_38%_47%_53%_62%] animate-float"
          style={{
            background: c2,
            border: '3px solid #0f0a1f',
            boxShadow: '-6px 6px 0 #0f0a1f',
            opacity: 0.85,
            animationDelay: '-1.4s',
          }}
        />
        <div
          className="absolute bottom-10 -left-10 w-56 h-56 rounded-full animate-float"
          style={{
            background: '#fff45e',
            border: '3px solid #0f0a1f',
            boxShadow: '5px 5px 0 #0f0a1f',
            opacity: 0.85,
            animationDelay: '-2.6s',
          }}
        />
      </div>

      {/* 装饰: 星星和爱心 */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        aria-hidden
      >
        <Star className="absolute top-12 right-8 w-9 h-9 animate-spin-slow" />
        <Sparkle className="absolute top-1/4 left-6 w-7 h-7 animate-wiggle" />
        <Heart className="absolute top-2/3 right-12 w-8 h-8 animate-wiggle" />
        <Star className="absolute bottom-20 left-12 w-8 h-8 animate-spin-slow" />
        <Flower className="absolute bottom-32 right-6 w-9 h-9 animate-wiggle" />
      </div>
    </>
  )
}

function Star({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#fff45e" stroke="#0f0a1f" strokeWidth="2">
      <path d="M12 2 L14.5 9 L22 9.5 L16 14 L18 21.5 L12 17.5 L6 21.5 L8 14 L2 9.5 L9.5 9 Z" strokeLinejoin="round" />
    </svg>
  )
}
function Heart({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#ff3da3" stroke="#0f0a1f" strokeWidth="2">
      <path d="M12 21s-7.5-4.6-9.7-9.4C.7 7.7 3.6 4 7.4 4c1.9 0 3.5 1 4.6 2.4C13.1 5 14.7 4 16.6 4c3.8 0 6.7 3.7 5.1 7.6C19.5 16.4 12 21 12 21Z" strokeLinejoin="round" />
    </svg>
  )
}
function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#93e6ff" stroke="#0f0a1f" strokeWidth="2">
      <path d="M12 2 C13 8 16 11 22 12 C16 13 13 16 12 22 C11 16 8 13 2 12 C8 11 11 8 12 2 Z" strokeLinejoin="round" />
    </svg>
  )
}
function Flower({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#aef7c4" stroke="#0f0a1f" strokeWidth="2">
      <circle cx="12" cy="6" r="3" />
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="12" r="3" />
      <circle cx="12" cy="12" r="2.4" fill="#fff45e" />
    </svg>
  )
}
