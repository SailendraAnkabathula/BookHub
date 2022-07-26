import React from 'react'

const ContextObject = React.createContext({
  activeRouteId: 'HOME',
  isNotFoundPageClicked: true,
  onChangeActiveRouteId: () => {},
  onNotFoundPageClicked: () => {},
})
export default ContextObject
