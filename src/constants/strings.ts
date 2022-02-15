//export var GAME_TITLE = 'WORDLE'
//export var WIN_MESSAGES = ['Great Job!', 'Awesome', 'Well done!']
//export var GAME_COPIED_MESSAGE = 'Game copied to clipboard'
//export var ABOUT_GAME_MESSAGE = 'About this game'
//export var NOT_ENOUGH_LETTERS_MESSAGE = 'Not enough letters'
//export var WORD_NOT_FOUND_MESSAGE = 'Word not found'
//export var CORRECT_WORD_MESSAGE = (solution: string) =>
//  `The word was ${solution}`
//export var ENTER_TEXT = 'Enter'
//export var DELETE_TEXT = 'Delete'
//export var STATISTICS_TITLE = 'Statistics'
//export var GUESS_DISTRIBUTION_TEXT = 'Guess Distribution'
//export var NEW_WORD_TEXT = 'New word in'
//export var SHARE_TEXT = 'Share'
//export var TOTAL_TRIES_TEXT = 'Total tries'
//export var SUCCESS_RATE_TEXT = 'Success rate'
//export var CURRENT_STREAK_TEXT = 'Current streak'
//export var BEST_STREAK_TEXT = 'Best streak'


export const capitalizeFirstLetter = (s:string) => {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}