import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import i18n from '../../i18n'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  let content = i18n.t("help.content").split('\n').filter(function(e){return e});
  return (
    <BaseModal title={i18n.t('help.title')} isOpen={isOpen} handleClose={handleClose}>
      {/* <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the word in 6 tries. After each guess, the color of the tiles will
        change to show how close your guess was to the word.
      </p> */}
      {content.map(function(object, i){
          return <p className="text-sm text-gray-500 dark:text-gray-300 text-left"
          key={object}
          dangerouslySetInnerHTML={{__html:object}}>
          </p>
      })}

      <div className="flex mb-1 mt-4">
        {i18n.t("help.exp1").split('').map(function(letter, i){
          let cell;
          if(i===0){
            cell = <Cell value={letter} status="correct"
            key={letter}
            />
          }else {
            cell = <Cell value={letter}
            key={letter}
            />
          }
          return cell
        })}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300 text-left">
        {i18n.t("help.exp1_desc")}
      </p>

      <div className="flex mb-1 mt-4">
        {i18n.t("help.exp2").split('').map(function(letter, i){
          let cell;
          if(i===1){
            cell = <Cell value={letter} status="present"
            key={letter}
            />
          }else {
            cell = <Cell value={letter}
            key={letter}
            />
          }
          return cell
        })}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300 text-left">
        {i18n.t("help.exp2_desc")}
      </p>

      <div className="flex mb-1 mt-4">
        {i18n.t("help.exp3").split('').map(function(letter, i){
          let cell;
          if(i===3){
            cell = <Cell value={letter} status="absent"
            key={letter}
            />
          }else {
            cell = <Cell value={letter}
            key={letter}
            />
          }
          return cell
        })}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300 text-left">
      {i18n.t("help.exp3_desc")}
      </p>
    </BaseModal>
  )
}
