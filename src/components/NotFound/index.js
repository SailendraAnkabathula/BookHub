import './index.css'
import {Link} from 'react-router-dom'
import ContextObject from '../../ReactContext/contextObject'

const NotFound = () => (
  <ContextObject.Consumer>
    {value => {
      const {onNotFoundPageClicked} = value
      const goBackToHomeButtonClicked = () => {
        onNotFoundPageClicked()
      }
      return (
        <div className="not-found-page-container">
          <img
            src="https://res.cloudinary.com/dk0n8qybo/image/upload/v1649097822/Group_7484_awqepe.jpg"
            className="not-found-image"
            alt="not found"
          />
          <h1 className="not-found-title">Page Not Found</h1>
          <p className="not-found-description">
            we are sorry, the page you requested could not be found, Please go
            back to the homepage.
          </p>
          <Link className="link-text" to="/">
            <button
              type="button"
              className="back-to-home-btn"
              onClick={goBackToHomeButtonClicked}
            >
              Go Back to Home
            </button>
          </Link>
        </div>
      )
    }}
  </ContextObject.Consumer>
)
export default NotFound
