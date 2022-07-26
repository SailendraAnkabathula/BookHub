import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import BookSelfOptionItem from '../BookselfOptionItem'
import BookCard from '../BookCard'
import SearchItem from '../SearchItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const booksApiUrlStatusConstraints = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookShelves extends Component {
  state = {
    booksList: [],
    booksApiStatus: booksApiUrlStatusConstraints.initial,
    activeBookSelf: bookshelvesList[0].value,
    searchValue: '',
    showShowNoBooksListText: '',
    shouldShowNoBooksText: false,
  }

  componentDidMount() {
    this.getBooks()
  }

  searchElementButtonClicked = () => {
    this.getBooks()
  }

  onChangeSearchInputValue = value => {
    this.setState({
      searchValue: value,
    })
  }

  updateTheGivenListItems = data => {
    const {searchValue} = this.state
    if (data.books.length === 0) {
      this.setState({
        showShowNoBooksListText: `Your search for ${searchValue} did not find any matches.`,
        shouldShowNoBooksText: true,
      })
    }
    const updatedData = data.books.map(eachBookItem => ({
      id: eachBookItem.id,
      title: eachBookItem.title,
      readStatus: eachBookItem.read_status,
      rating: eachBookItem.rating,
      authorName: eachBookItem.author_name,
      coverPic: eachBookItem.cover_pic,
    }))
    this.setState({
      booksList: updatedData,
      booksApiStatus: booksApiUrlStatusConstraints.success,
    })
  }

  getBooks = async () => {
    const {activeBookSelf, searchValue} = this.state
    this.setState({booksApiStatus: booksApiUrlStatusConstraints.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const booksApiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeBookSelf}&search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(booksApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.updateTheGivenListItems(data)
    } else if (response.status === 401) {
      this.setState({
        booksApiStatus: booksApiUrlStatusConstraints.failure,
      })
    } else {
      this.setState({
        booksApiStatus: booksApiUrlStatusConstraints.failure,
      })
    }
  }

  onChangeActiveBookSelf = activeBookSelf => {
    this.setState({activeBookSelf}, this.getBooks)
  }

  renderBookshelvesOptions = () => {
    const {activeBookSelf} = this.state
    return (
      <div className="options-container">
        <h3 className="options-list-title">Bookshelves</h3>
        <ul className="options-list">
          {bookshelvesList.map(eachItem => (
            <BookSelfOptionItem
              optionItem={eachItem}
              key={eachItem.id}
              isActive={eachItem.value === activeBookSelf}
              onChangeActiveBookSelf={this.onChangeActiveBookSelf}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderInprogressView = () => (
    <div className="view-container">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#0284c7" height={50} width={50} />
      </div>
    </div>
  )

  onRetryButtonClicked = () => {
    this.getBooks()
  }

  renderFailureView = () => {
    const labelText = this.getLabelText()
    return (
      <div className="result-container">
        {this.renderBookshelvesOptions()}
        <div className="header-with-result-section failure-view">
          <div className="header-section">
            <h1 className="active-self-title">{labelText} Books</h1>
          </div>
          <div className="failure-view-container">
            <img
              className="failure-view-image-bookshelves"
              src="https://res.cloudinary.com/dk0n8qybo/image/upload/v1649256292/Group_7522_1_vtcb59.jpg"
              alt="failure view"
            />
            <p className="failure-view-content">
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
        </div>
      </div>
    )
  }

  getLabelText = () => {
    const {activeBookSelf} = this.state
    const resultLabel = bookshelvesList.filter(
      eachItem => eachItem.value === activeBookSelf,
    )
    return resultLabel[0].label
  }

  renderSuccessView = () => {
    const {
      booksList,
      searchValue,
      shouldShowNoBooksText,
      showShowNoBooksListText,
    } = this.state
    const labelText = this.getLabelText()
    return (
      <>
        <div className="result-container">
          <div className="website-self-book-options-container">
            {this.renderBookshelvesOptions()}
          </div>

          <div className="header-with-result-section">
            <div className="header-section">
              <h1 className="active-self-title">{labelText} Books</h1>
              <SearchItem
                onChangeSearchInputValue={this.onChangeSearchInputValue}
                searchElementButtonClicked={this.searchElementButtonClicked}
                searchValue={searchValue}
              />
              <div className="mobile-self-book-options-container">
                {this.renderBookshelvesOptions()}
              </div>
            </div>

            {booksList.length > 0 ? (
              <div className="success-books-view-container">
                <ul className="books-list">
                  {booksList.map(eachBookItem => (
                    <BookCard
                      bookDetails={eachBookItem}
                      key={eachBookItem.id}
                      BsFillStarFill={BsFillStarFill}
                    />
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bookSelf-no-books-view-container">
                <img
                  src="https://res.cloudinary.com/dk0n8qybo/image/upload/v1649007398/Asset_1_1_m4xzkn.jpg"
                  alt="no books"
                  className="no-books-view-image"
                />
                {shouldShowNoBooksText && (
                  <p className="result-text">{showShowNoBooksListText}</p>
                )}
              </div>
            )}
          </div>
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

  renderBookSelfPage = () => {
    const {booksApiStatus} = this.state
    switch (booksApiStatus) {
      case booksApiUrlStatusConstraints.inProgress:
        return this.renderInprogressView()
      case booksApiUrlStatusConstraints.success:
        return this.renderSuccessView()
      case booksApiUrlStatusConstraints.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bookSelf-container" testid="Bookshelves">
        <Header />
        {this.renderBookSelfPage()}
      </div>
    )
  }
}
export default BookShelves
