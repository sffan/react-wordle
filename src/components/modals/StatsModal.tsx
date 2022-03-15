import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'
import {
  capitalizeFirstLetter,
} from '../../constants/strings'
import i18n from '../../i18n'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShare: () => void
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShare,
}: Props) => {
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={i18n.t("stat.statistics")}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={i18n.t("stat.statistics")}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
        {i18n.t("stat.records")}
      </h4>
      <Histogram gameStats={gameStats} />
      {(isGameLost || isGameWon) && (
        <div className="sm:mt-6 dark:text-white mb-5">{/* mt-5 columns-2 */}
          <div>
            <h5>{i18n.t("stat.new_word_time")}</h5>
            <Countdown
              className="text-lg font-medium text-gray-900 dark:text-gray-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
          <button
            type="button"
            className="stat-share-btn mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm" /* hover:bg-indigo-700 */
            onClick={() => {
              shareStatus(guesses, isGameLost, "gtag_report_conversion_data_share")
              handleShare()
            }}
          >
            {capitalizeFirstLetter(i18n.t("win.share"))}
          </button>
        </div>
      )}
    </BaseModal>
  )
}