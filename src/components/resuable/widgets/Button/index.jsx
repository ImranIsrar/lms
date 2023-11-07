
import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

/* Button
  * buttonText  => (Text)*
  * buttonTag   => a / (button)*
  * buttonClass => Classes
  * buttonType  => button / (submit)*
  * buttonLink  => # / (url)*
  * buttonAfterIcon => display Icon After Text
  * buttonBeforeIcon => display Icon Before Text
  * buttonHandle     => Handle
*/

const ThemeButton = ({ buttonText, buttonTag, buttonType, buttonLink, buttonClass, buttonAfterIcon,
   buttonBeforeIcon, buttonHandle }) => {
  return (
    <>
      {
        buttonText && (
          (() => {
            switch (buttonTag) {
              case 'button':
                return (
                  buttonTag && buttonTag == 'button' ? (
                    <Button type={ (buttonType && buttonType == 'submit') ? buttonType : 'button' }
                      className={ buttonClass && `${buttonClass}`  }
                      variant=""
                      onClick={buttonHandle ? buttonHandle : undefined}
                    >
                      { buttonBeforeIcon && <span className="pe-2 d-inline-block">{buttonBeforeIcon}</span> }
                      { buttonText }
                      { buttonAfterIcon && <span className="ps-2 d-inline-block">{buttonAfterIcon}</span> }
                    </Button>
                  ) : (
                    <Link to={ buttonLink ? buttonLink : '#' }
                      className={ buttonClass && `${buttonClass}` }
                      onClick={buttonHandle ? buttonHandle : undefined}
                    >
                      { buttonBeforeIcon && <span className="pe-2 d-inline-block">{buttonBeforeIcon}</span> }
                      { buttonText }
                      { buttonAfterIcon && <span className="ps-2 d-inline-block">{buttonAfterIcon}</span> }
                    </Link>
                  )
                );
              
              default:
                return (
                  <Link to={ buttonLink ? buttonLink : '#' }
                    className={ buttonClass && `${buttonClass}` }
                    onClick={buttonHandle ? buttonHandle : undefined}
                  >
                    { buttonBeforeIcon && <span className="pe-2 d-inline-block">{buttonBeforeIcon}</span> }
                    { buttonText }
                    { buttonAfterIcon && <span className="ps-2 d-inline-block">{buttonAfterIcon}</span> }
                  </Link>
                );
            }
          })()
        )
      }
    </>
  )
}

export default ThemeButton
