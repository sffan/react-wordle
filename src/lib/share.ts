import copy from 'copy-to-clipboard';
import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { lang } from './param'
//import { GAME_TITLE } from '../constants/strings'
import i18n from '../i18n'

export const shareStatus = (guesses: string[], lost: boolean) => {
  /* navigator.clipboard.writeText(
    `${i18n.t("home.title")} ${solutionIndex} ${lost ? 'X' : guesses.length}/6\n\n` +
      generateEmojiGrid(guesses)
  ) */
  let href = window.location.href;
  let randStr = Math.random().toString(36).slice(-4);
  randStr = randStr.split('').map((c) => (Math.round(Math.random()*10) % 2 === 0 ? c.toUpperCase() : c)).join('');
  if (href.indexOf('?') !== -1){
    href += '&f=' + randStr;
  } else {
    href += '?f=' + randStr;
  }
  copy(
    `${i18n.t("home.title")} ${solutionIndex+1} ${lost ? 'X' : guesses.length}/6\n\n` +
      generateEmojiGrid(guesses) + '\n' + href
  );
  fetch('/stat/click_share/?lang=' + lang + '&f=' + randStr);
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
