//import { lang } from './param'
//import { WORDS, VALIDGUESSES } from '../index'

export var solution: string,
           solutionIndex: number,
           tomorrow: number;
export var WORDS: string[];
export var VALIDGUESSES: string[];
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
export const getWordOfDay = (words: string[], validGuesses: string[]) => {
  /* WORDS = (await (await req('/rc/words_' + lang + '_5.txt')).text()).split(',');
  VALIDGUESSES = (await (await req('/rc/dict_' + lang + '_5.txt')).text()).split(','); */

  // Feb 9, 2022 Game Epoch
  //const epochMs = new Date(Date.UTC(2022, 1, 9, 0, 0, 0)).valueOf()
  const epochMs = new Date('Feb 9, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  solution = words[index % words.length].toUpperCase();
  solutionIndex = index;
  tomorrow = nextday;
  WORDS = words;
  VALIDGUESSES = validGuesses;
  //console.log(solution, solutionIndex, tomorrow);
}

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}