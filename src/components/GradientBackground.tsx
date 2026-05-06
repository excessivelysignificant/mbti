type Props = {
  gradient?: [string, string]
}

export function GradientBackground({ gradient }: Props) {
  const [from, to] = gradient ?? ['#6a82fb', '#fc5c7d']
  return (
    <>
      {/* 视口固定层:用户怎么滚动背景永远在,渐变也最自然 */}
      <div
        className="fixed inset-0 -z-30"
        style={{
          background: `linear-gradient(135deg, ${from} 0%, ${to} 50%, #4facfe 100%)`,
          transition: 'background 0.8s ease',
        }}
      />
      {/* 兜底层:撑满整个文档高度,防止 fullPage 截图/超长滚动露出底色 */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
          transition: 'background 0.8s ease',
        }}
      />
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-50 blur-3xl animate-blob"
          style={{ background: from }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] rounded-full opacity-40 blur-3xl animate-blob"
          style={{ background: to, animationDelay: '-6s' }}
        />
        <div
          className="absolute -bottom-40 left-1/4 w-[26rem] h-[26rem] rounded-full opacity-40 blur-3xl animate-blob"
          style={{ background: '#4facfe', animationDelay: '-12s' }}
        />
      </div>
    </>
  )
}
