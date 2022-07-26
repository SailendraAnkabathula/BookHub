import './App.css'
import {Component} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Bookselves from './components/Bookselves'
import BookDetails from './components/BookDetails'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ContextObject from './ReactContext/contextObject'

class App extends Component {
  state = {activeRouteId: 'Home', isNotFoundPageClicked: true}

  onChangeActiveRouteId = id => {
    this.setState({activeRouteId: id})
  }

  onNotFoundPageClicked = () => {
    this.setState({isNotFoundPageClicked: false})
  }

  render() {
    const {activeRouteId, isNotFoundPageClicked} = this.state
    return (
      <ContextObject.Provider
        value={{
          activeRouteId,
          isNotFoundPageClicked,
          onChangeActiveRouteId: this.onChangeActiveRouteId,
          onNotFoundPageClicked: this.onNotFoundPageClicked,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={Bookselves} />
          <ProtectedRoute exact path="/books/:id" component={BookDetails} />
          <ProtectedRoute exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ContextObject.Provider>
    )
  }
}

export default App
