import {
  InformationCircleIcon,
  ChartBarIcon,
  SunIcon,
  MoonIcon,
  ShareIcon,
  GlobeIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import i18n from './i18n'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { I18nModal } from './components/modals/I18nModel'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { shareStatus } from './lib/share'
//import { Ad } from './components/ad/Ad'
import {
  MAX_WORD_LENGTH,
  MAX_CHALLENGES,
  ALERT_TIME_MS,
  REVEAL_TIME_MS,
} from './constants/settings'
import { isWordInWordList, isWinningWord, solution } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'

import './App.css'

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isI18nModalOpen, setIsI18nModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [successAlert, setSuccessAlert] = useState('')
  const [isRevealing, setIsRevealing] = useState(false)
  /* const [bannerImgId, setBannerImgId] = useState('1')
  useEffect(() => {
    setTimeout(() => {
      setBannerImgId(bannerImgId === '2' ? '1' : '2')
    }, 20000)
  }, [bannerImgId]) */

  /* const switchBanner = () => {
    console.log(bannerImgId, bannerImgId === "1")
    setBannerImgId(bannerImgId === "1" ? "2" : "1");
  } */

  const [guesses, setGuesses] = useState<string[]>(() => {
    //while(!solution){}
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  useEffect(() => {
    document.title = i18n.t('home.page_title')
    document.getElementsByTagName('meta')[3].content =
      i18n.t('home.description')
    document.getElementsByTagName('meta')[4].content = i18n.t('home.keywords')
  }, [])
  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      let WIN_MESSAGES = [
        i18n.t('alert.splendid'),
        i18n.t('alert.awesome'),
        i18n.t('alert.great'),
      ]
      setTimeout(() => {
        setSuccessAlert(
          WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
        )

        setTimeout(() => {
          setSuccessAlert('')
          setIsStatsModalOpen(true)
        }, ALERT_TIME_MS)
      }, REVEAL_TIME_MS * MAX_WORD_LENGTH)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    if (
      currentGuess.length < MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === MAX_WORD_LENGTH)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * MAX_WORD_LENGTH)

    const winningWord = isWinningWord(currentGuess)

    if (
      currentGuess.length === MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  return (
    <div className="pt-2 pb-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-6 mt-4">
        <h1 className="text-3xl ml-2.5 grow font-bold dark:text-white">
          {i18n.t('home.title')}
        </h1>
        {isDarkMode ? (
          <SunIcon
            className="h-6 w-6 mr-1 cursor-pointer dark:stroke-white"
            onClick={() => handleDarkMode(!isDarkMode)}
          />
        ) : (
          <MoonIcon
            className="h-6 w-6 mr-1 cursor-pointer"
            onClick={() => handleDarkMode(!isDarkMode)}
          />
        )}
        <GlobeIcon
          className="h-6 w-6 mr-1 cursor-pointer dark:stroke-white"
          onClick={() => setIsI18nModalOpen(true)}
        />
        <InformationCircleIcon
          className="h-6 w-6 mr-1 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 mr-1 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
        <ShareIcon
          className="h-6 w-6 mr-1 cursor-pointer dark:stroke-white"
          onClick={() => {
            shareStatus(
              guesses,
              isGameLost,
              'gtag_report_conversion_homepage_share'
            )
            setSuccessAlert(i18n.t('alert.link_copied'))
            return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
          }}
        />
      </div>
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        isRevealing={isRevealing}
      />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        isRevealing={isRevealing}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShare={() => {
          setSuccessAlert(i18n.t('alert.link_copied'))
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
      />
      <I18nModal
        isOpen={isI18nModalOpen}
        handleClose={() => setIsI18nModalOpen(false)}
      />

      {/* <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
        onClick={() => setIsAboutModalOpen(true)}
      >
        {ABOUT_GAME_MESSAGE}
      </button> */}
      {/* <Ad
        onTop={isGameWon || isGameLost}
        imgId={'1'}
        show={bannerImgId === '1'}
      />
      <Ad
        onTop={isGameWon || isGameLost}
        imgId={'2'}
        show={bannerImgId === '2'}
      /> */}

      <Alert
        message={i18n.t('alert.not_enough_letter')}
        isOpen={isNotEnoughLetters}
      />
      <Alert
        message={i18n.t('alert.not_in_wordlist')}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert
        message={i18n.t('alert.answer').format(solution)}
        isOpen={isGameLost}
      />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default App
