import { GameStats } from '../../lib/localStorage'
import {
  TOTAL_TRIES_TEXT,
  SUCCESS_RATE_TEXT,
} from '../../constants/strings'
import i18n from '../../i18n'

type Props = {
  gameStats: GameStats
}

const StatItem = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  return (
    <div className="items-center justify-center m-1 w-1/4 dark:text-white">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  )
}

export const StatBar = ({ gameStats }: Props) => {
  return (
    <div className="flex justify-center my-2">
      <StatItem label={TOTAL_TRIES_TEXT} value={gameStats.totalGames} />
      <StatItem label={SUCCESS_RATE_TEXT} value={`${gameStats.successRate}%`} />
      <StatItem label={i18n.t("stat.current_streak")} value={gameStats.currentStreak} />
      <StatItem label={i18n.t("stat.max_streak")} value={gameStats.bestStreak} />
    </div>
  )
}
