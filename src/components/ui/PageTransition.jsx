import { AnimatePresence, motion } from 'framer-motion'

function PageTransition({ children, mode = 'wait' }) {
  const routeKey =
    typeof children?.key !== 'undefined' ? children.key : 'route'

  return (
    <AnimatePresence mode={mode}>
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition


