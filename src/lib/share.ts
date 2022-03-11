import copy from 'copy-to-clipboard';
import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { lang } from './param'
//import { GAME_TITLE } from '../constants/strings'
import i18n from '../i18n'
export const GA_TRACKING_ID = 'AW-625715352'


export const shareStatus = (guesses: string[], lost: boolean, conversion_func: string) => {
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
  let title = i18n.t("home.title");
  if (title === "Palora") {
    title = "Palora.me"
  }
  copy(
    `${title} ${solutionIndex+1} ${lost ? 'X' : guesses.length}/6\n\n` +
      generateEmojiGrid(guesses) + '\n' + href
  );
  fetch('/stat/click_share/?lang=' + lang + '&f=' + randStr);
  //window.gtag_report_conversion_homepage_share(href);
  //eval(conversion_func + "('" + href + "')");
  alert("needreplace2eval" + conversion_func + "('" + href + "')")
  
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
