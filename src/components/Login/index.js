import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    shouldShowErrorMsg: false,
    errorMsg: '',
  }

  onLoginSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({shouldShowErrorMsg: true, errorMsg})
  }

  onChangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameContainer = () => {
    const {username} = this.state
    return (
      <div className="user-input-container">
        <label htmlFor="usernameInput" className="label-text">
          Username*
        </label>
        <input
          type="text"
          className="input-element"
          placeholder="Username"
          id="usernameInput"
          onChange={this.onChangeUsernameInput}
          value={username}
        />
      </div>
    )
  }

  renderPasswordContainer = () => {
    const {password} = this.state
    return (
      <div className="user-input-container">
        <label htmlFor="userPasswordInput" className="label-text">
          Password*
        </label>
        <input
          type="password"
          className="input-element"
          placeholder="Password"
          id="userPasswordInput"
          onChange={this.onChangePasswordInput}
          value={password}
        />
      </div>
    )
  }

  onLoginButtonClicked = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg, shouldShowErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dk0n8qybo/image/upload/v1648448866/Rectangle_1467_yvlsrx.jpg"
          className="website-image"
          alt="website login"
        />
        <form
          className="form-content-container"
          onSubmit={this.onLoginButtonClicked}
        >
          <img
            src="https://res.cloudinary.com/dk0n8qybo/image/upload/v1648448892/Ellipse_99_k1epzl.jpg"
            className="ellipse-image"
            alt="website login"
          />
          <img
            src="https://res.cloudinary.com/dk0n8qybo/image/upload/v1648448879/Group_7731_kxnaty.jpg"
            className="mobile-view-login-logo"
            alt="login website logo"
          />
          {this.renderUsernameContainer()}
          {this.renderPasswordContainer()}
          {shouldShowErrorMsg && <p className="error-message">{errorMsg}</p>}
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}
export default Login
