import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`

  const classes = classnames(
    'w-12 h-12 border-solid flex items-center justify-center mx-0.5 text-2xl font-bold rounded-xl dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600 border-2 cell-empty':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700 cell-absent':
        status === 'absent',
      'correct shadowed bg-green-500 text-white border-green-500 cell-correct':
        status === 'correct',
      'present shadowed bg-yellow-500 text-white border-yellow-500 cell-present':
        status === 'present',
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  return (
    <div className={classes} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}



/*
export const Cell = ({ value, status }: Props) => {
  const classes = classnames(
    'w-12 h-12 flex items-center justify-center mx-0.5 text-2xl rounded-xl',
    {
      'border-slate-200 border-solid border-2 cell-empty': !status,
      'border-black': value && !status,
      'bg-slate-400 text-white border-slate-400 cell-absent': status === 'absent',
      'bg-green-500 text-white border-green-500 cell-correct': status === 'correct',
      'bg-yellow-500 text-white border-yellow-500 cell-present': status === 'present',
      'cell-animation': !!value,
    }
  )
  return <div className={classes}>{value}</div>
}
*/
