import classnames from 'classnames'
//import i18n from '../../i18n'
import { lang } from '../../lib/param'

type Props = {
  onTop?: boolean,
  imgId?: string,
  show: boolean,
}

export const Ad = ({ onTop, imgId, show }: Props) => {
  if (!imgId) {
    imgId = "2";
  }
  const classes = classnames(
    'bottom-banner',
    {
      'z-9999': onTop,
    },
    {
      'hidden': show,
    }
  )

  return (
    <div
      className={classes}
      style={{ backgroundImage: "url('img/banner_" + imgId + "_" + lang + ".jpg')" }}
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        document.location.href = "https://bit.ly/3uY3XLZ"
       }}
      >
      <div className="hidden">
        <img src={"img/banner_1_" + lang + ".jpg"} alt="banner1"/>
        <img src={"img/banner_2_" + lang + ".jpg"} alt="banner2"/>
      </div>
    </div>
    
  )
}
