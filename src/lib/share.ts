import copy from 'copy-to-clipboard';
import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
//import { GAME_TITLE } from '../constants/strings'
import i18n from '../i18n'

export const shareStatus = (guesses: string[], lost: boolean) => {
  /* navigator.clipboard.writeText(
    `${i18n.t("home.title")} ${solutionIndex} ${lost ? 'X' : guesses.length}/6\n\n` +
      generateEmojiGrid(guesses)
  ) */
  copy(
    `${i18n.t("home.title")} ${solutionIndex+1} ${lost ? 'X' : guesses.length}/6\n\n` +
      generateEmojiGrid(guesses) +
    '\nhttps://bit.ly/3uEjksF'
  );
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .split('')
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
