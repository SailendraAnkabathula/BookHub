import './index.css'

const BookSelfOptionItem = props => {
  const {optionItem, onChangeActiveBookSelf, isActive} = props
  const {id, label, value} = optionItem
  const onChangeActiveOptionId = () => {
    onChangeActiveBookSelf(value)
  }
  const classStyling = isActive
    ? 'option-button active'
    : 'option-button in-active'
  return (
    <li className="option-item" id={id}>
      <button
        className={classStyling}
        onClick={onChangeActiveOptionId}
        type="button"
      >
        {label}
      </button>
    </li>
  )
}
export default BookSelfOptionItem
