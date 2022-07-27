import {BsSearch} from 'react-icons/bs'
import './index.css'

const SearchItem = props => {
  const {
    onChangeSearchInputValue,
    searchElementButtonClicked,
    searchValue,
  } = props
  const onChangeText = event => {
    onChangeSearchInputValue(event.target.value)
  }

  const buttonClicked = () => {
    searchElementButtonClicked()
  }

  return (
    <div className="render-search-input-container">
      <input
        type="search"
        value={searchValue}
        onChange={onChangeText}
        placeholder="Search"
        className="user-search-input"
      />
      <button
        type="button"
        className="search-element-button"
        onClick={buttonClicked}
        testid="searchButton"
      >
        <BsSearch color="#0f172a" height={24} width={24} />
      </button>
    </div>
  )
}
export default SearchItem
