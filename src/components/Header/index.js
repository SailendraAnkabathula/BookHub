import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import LinkButton from '../LinkButton'
import './index.css'

const linkConstraints = [
  {id: 'HOME', link: '/', displayText: 'Home'},
  {id: 'BOOKSHELVES', link: '/shelf', displayText: 'Bookshelves'},
]

class Header extends Component {
  state = {shouldShowMenu: false}

  onLogoutButtonClicked = () => {
    const {history} = this.props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  onMenuButtonClicked = () => {
    this.setState(prevState => ({
      shouldShowMenu: !prevState.shouldShowMenu,
    }))
  }

  closeButtonClicked = () => {
    this.setState({shouldShowMenu: false})
  }

  render() {
    const {shouldShowMenu} = this.state
    return (
      <nav className="nav-container">
        <div className="nav-content">
          <Link className="link-container" to="/">
            <img
              src="https://res.cloudinary.com/dk0n8qybo/image/upload/v1648448879/Group_7731_kxnaty.jpg"
              className="navbar-website-logo"
              alt="website logo"
            />
          </Link>
          <div className="desktop-view-links-container">
            <ul className="links-list">
              {linkConstraints.map(eachConstraints => (
                <LinkButton
                  key={eachConstraints.id}
                  displayText={eachConstraints.displayText}
                  routeId={eachConstraints.id}
                  link={eachConstraints.link}
                />
              ))}
            </ul>
          </div>
          <button
            type="button"
            onClick={this.onLogoutButtonClicked}
            className="desktop-view-logout-button"
          >
            Logout
          </button>
          <button
            type="button"
            className="mobile-view-menu-button"
            onClick={this.onMenuButtonClicked}
          >
            <img
              src="https://res.cloudinary.com/dk0n8qybo/image/upload/v1648619294/icon_zlci9y.svg"
              alt="hamburger icon"
              className="menu-icon"
            />
          </button>
        </div>
        {shouldShowMenu && (
          <div className="mobile-view-menu-list">
            <ul className="links-list">
              {linkConstraints.map(eachConstraints => (
                <LinkButton
                  key={eachConstraints.id}
                  displayText={eachConstraints.displayText}
                  routeId={eachConstraints.id}
                  link={eachConstraints.link}
                />
              ))}
            </ul>
            <button
              type="button"
              onClick={this.onLogoutButtonClicked}
              className="mobile-view-logout-button"
            >
              Logout
            </button>
            <button
              type="button"
              onClick={this.closeButtonClicked}
              className="close-button"
            >
              <img
                src="https://res.cloudinary.com/dk0n8qybo/image/upload/v1648620853/Shape_cllue6.svg"
                className="close-icon"
                alt="close icon"
              />
            </button>
          </div>
        )}
      </nav>
    )
  }
}
export default withRouter(Header)
