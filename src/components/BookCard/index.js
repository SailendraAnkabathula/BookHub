import {Link} from 'react-router-dom'

import './index.css'

const BookCard = props => {
  const {bookDetails, BsFillStarFill} = props
  const {id, authorName, coverPic, rating, readStatus, title} = bookDetails
  return (
    <li className="item-card">
      <Link className="link-container" to={`/books/${id}`}>
        <div className="book-card-item">
          <img className="cover-image" src={coverPic} alt={title} />
          <div className="book-details-container">
            <h1 className="each-book-item-title">{title}</h1>
            <p className="author-name">{authorName}</p>
            <div className="rating-container">
              <p className="rating-title">Avg Rating</p>
              <div className="star-with-rating">
                <BsFillStarFill fill="#FBBF24" height={16} width={16} />
                <p className="rating-value">{rating}</p>
              </div>
            </div>
            <p className="book-status">
              Status: <span className="reading-status">{readStatus}</span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default BookCard
