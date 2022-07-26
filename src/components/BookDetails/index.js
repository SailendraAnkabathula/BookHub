import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const bookDetailsApiStatusConstraints = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {
    bookDetails: {},
    apiStatus: bookDetailsApiStatusConstraints.initial,
  }

  componentDidMount() {
    this.getBookDetails()
  }

  componentWillUnmount() {
    this.setState({
      bookDetails: {},
      apiStatus: bookDetailsApiStatusConstraints.initial,
    })
  }

  getBookDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: bookDetailsApiStatusConstraints.inProgress})
    const topRatedBooksApiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(topRatedBooksApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        id: data.book_details.id,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        title: data.book_details.title,
        aboutBook: data.book_details.about_book,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        aboutAuthor: data.book_details.about_author,
      }
      this.setState({
        bookDetails: updatedData,
        apiStatus: bookDetailsApiStatusConstraints.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: bookDetailsApiStatusConstraints.failure})
    } else {
      this.setState({apiStatus: bookDetailsApiStatusConstraints.failure})
    }
  }

  onRetryButtonClicked = () => {
    this.getBookDetails()
  }

  renderFailureViewContainer = () => (
    <>
      <div className="book-details-failure-view-container">
        <img
          className="failure-view-image-book-details"
          src="https://res.cloudinary.com/dk0n8qybo/image/upload/v1649256292/Group_7522_1_vtcb59.jpg"
          alt="failure view"
        />
        <p className="failure-view-content-description">
          Something went wrong. Please try again
        </p>
        <button
          className="retry-button"
          type="button"
          onClick={this.onRetryButtonClicked}
        >
          Try Again
        </button>
      </div>
    </>
  )

  renderInProgressViewContainer = () => (
    <div className="view-container">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#0284c7" height={50} width={50} />
      </div>
    </div>
  )

  renderSuccessViewContainer = () => {
    const {bookDetails} = this.state
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookDetails

    return (
      <>
        <div className="book-details-section-container">
          <div className="book-details-main-details">
            <img className="book-main-image" src={coverPic} alt={title} />
            <div className="book-main-details-container">
              <h2 className="book-item-details-title">{title}</h2>
              <p className="book-item-details-author-name">{authorName}</p>
              <div className="book-details-rating-container">
                <p className="book-details-rating-title">Avg Rating</p>
                <BsFillStarFill fill="#FBBF24" height={16} width={16} />
                <p className="book-details-rating-value">{rating}</p>
              </div>
              <p className="book-status">
                Status: <span className="reading-status">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="hr-line" />
          <h1 className="about-author">About Author</h1>
          <p className="about-author-description">{aboutAuthor}</p>
          <h2 className="about-author">About Book</h2>
          <p className="about-author-description">{aboutBook}</p>
        </div>

        <div className="footer-section">
          <div className="social-media-contact-links">
            <FaGoogle fill="#3d3c3c" size={18} />
            <FaTwitter fill="#3d3c3c" size={18} />
            <FaInstagram fill="#3d3c3c" size={18} />
            <FaYoutube fill="#3d3c3c" size={18} />
          </div>
          <p className="contact-text">Contact Us</p>
        </div>
      </>
    )
  }

  renderBookDetailsPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case bookDetailsApiStatusConstraints.inProgress:
        return this.renderInProgressViewContainer()
      case bookDetailsApiStatusConstraints.success:
        return this.renderSuccessViewContainer()
      case bookDetailsApiStatusConstraints.failure:
        return this.renderFailureViewContainer()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="book-details-content-container">
        <Header />
        {this.renderBookDetailsPage()}
      </div>
    )
  }
}
export default BookDetails
