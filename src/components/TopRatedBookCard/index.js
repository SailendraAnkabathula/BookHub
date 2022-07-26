import './index.css'
import {Link} from 'react-router-dom'
import ContextObject from '../../ReactContext/contextObject'

const TopRatedBookCard = props => {
  const {bookDetails} = props
  const {id, coverPic, title, authorName} = bookDetails
  const renderAuthorName = () => (
    <ContextObject.Consumer>
      {value => {
        const {isNotFoundPageClicked} = value
        if (isNotFoundPageClicked) {
          return <p className="book-author-name-text">{authorName}</p>
        }
        return <p className="book-author-name-text">{authorName}</p>
      }}
    </ContextObject.Consumer>
  )

  return (
    <li>
      <Link to={`/books/${id}`} className="link-container">
        <div className="slick-item" key={id}>
          <img className="book-image" src={coverPic} alt={title} />
          <h1 className="book-title">{title}</h1>
          {renderAuthorName()}
        </div>
      </Link>
    </li>
  )
}

export default TopRatedBookCard
