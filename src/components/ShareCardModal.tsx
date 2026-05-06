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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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
                className="w-full rounded-2xl shadow-2xl select-none"
                draggable={false}
              />
            ) : (
              <div className="w-full aspect-[3/4] rounded-2xl bg-white/10 border border-white/15 grid place-items-center">
                <span className="text-white/70 text-sm">生成中…</span>
              </div>
            )}
            <p className="mt-5 text-white text-center text-sm leading-relaxed">
              👆 长按图片保存到相册
              <br />
              然后分享到朋友圈或聊天里
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white/90 text-sm transition"
            >
              关闭
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
