import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  open: boolean
  dataUrl?: string
  onClose: () => void
}

export function ShareCardModal({ open, dataUrl, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ background: 'rgba(15, 10, 31, 0.78)', backdropFilter: 'blur(8px)' }}
        >
          <motion.div
            initial={{ scale: 0.85, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 220 }}
            className="max-w-sm w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {dataUrl ? (
              <img
                src={dataUrl}
                alt="我的人格卡片"
                className="w-full select-none"
                style={{
                  border: '3px solid #0f0a1f',
                  borderRadius: 18,
                  boxShadow: '8px 8px 0 #fff45e, 8px 8px 0 4px #0f0a1f',
                }}
                draggable={false}
              />
            ) : (
              <div
                className="w-full aspect-[3/4] grid place-items-center"
                style={{
                  border: '3px solid #0f0a1f',
                  borderRadius: 18,
                  background: '#fff',
                }}
              >
                <span className="text-[var(--ink)]/70 text-sm font-bold">生成中…</span>
              </div>
            )}
            <p className="mt-5 text-white text-center text-sm leading-relaxed font-medium">
              👆 长按图片保存到相册
              <br />
              再分享到朋友圈或聊天
            </p>
            <button
              onClick={onClose}
              className="mt-4 sticker-pop bg-white text-[var(--ink)] font-bold text-sm"
            >
              关闭
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
