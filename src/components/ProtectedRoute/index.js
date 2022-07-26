import {Redirect, Route} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = props => {
  const jwtToken = Cookie.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" /> // if unauthenticated user then page is redirecting to login Route.
  }
  return <Route {...props} /> // if user is authenticated then returns to respective page.
}
export default ProtectedRoute
