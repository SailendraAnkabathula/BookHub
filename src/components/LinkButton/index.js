import './index.css'
import {Link} from 'react-router-dom'

import ContextObject from '../../ReactContext/contextObject'

const LinkButton = props => {
  const {link, displayText, routeId} = props
  return (
    <ContextObject.Consumer>
      {value => {
        const {activeRouteId, onChangeActiveRouteId} = value
        const homeClassStyling =
          activeRouteId === routeId
            ? 'select-route-button active-route'
            : 'select-route-button'
        const onClickHomeRoute = () => {
          onChangeActiveRouteId(routeId)
        }
        return (
          <li className="link-item" key="HOME" id={routeId}>
            <Link to={`${link}`} className="link-content">
              <button
                className={homeClassStyling}
                type="button"
                onClick={onClickHomeRoute}
              >
                {displayText}
              </button>
            </Link>
          </li>
        )
      }}
    </ContextObject.Consumer>
  )
}
export default LinkButton
