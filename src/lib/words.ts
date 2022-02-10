//import { lang } from './param'
import { WORDS, VALIDGUESSES } from '../constants/words_en'

export var solution: string, solutionIndex: number, tomorrow: number;
/* export var WORDS: string[];
export var VALIDGUESSES: string[]; */

/* export function req(url: string) {
  const response = fetch(url);
  return response;
} */

/* export const getWordOfDay = async () => {
  let words = (await req('/rc/words_' + lang + '_5.txt')).text();
  let validGuesses = (await req('/rc/dict_' + lang + '_5.txt')).text();

  return {
    words: words,
    validGuesses: validGuesses,
  }
}

const { words, validGuesses } = await getWordOfDay() */

//export const getWordOfDay = async () => {
export const getWordOfDay = () => {
  /* WORDS = (await (await req('/rc/words_' + lang + '_5.txt')).text()).split(',');
  VALIDGUESSES = (await (await req('/rc/dict_' + lang + '_5.txt')).text()).split(','); */

  // Feb 9, 2022 Game Epoch
  //const epochMs = new Date(Date.UTC(2022, 1, 9, 0, 0, 0)).valueOf()
  const epochMs = new Date().valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  solution = WORDS[index % WORDS.length].toUpperCase();
  solutionIndex = index;
  tomorrow = nextday;
  console.log(solution, solutionIndex, tomorrow)
}
getWordOfDay();

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}