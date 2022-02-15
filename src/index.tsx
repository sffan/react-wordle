import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import './i18n'
import reportWebVitals from './reportWebVitals'
import { lang } from './lib/param'
import { getWordOfDay } from './lib/words'

declare global {
  interface String {
    format(...replacements: string[]): string
  }
}

/*eslint no-extend-native: "off"*/
if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match
    })
  }
}

const readWords = async () => {
  let words = (await fetch('/rc/words_' + lang + '_5.txt')).text()
  let validGuesses = (await fetch('/rc/dict_' + lang + '_5.txt')).text()

  return {
    words: words,
    validGuesses: validGuesses,
  }
}

readWords().then(async (wordsData) => {
  let words = (await wordsData.words).split(',')
  let validGuesses = (await wordsData.validGuesses).split(',')
  getWordOfDay(words, validGuesses)

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
