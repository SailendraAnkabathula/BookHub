import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import ContextObject from '../../ReactContext/contextObject'
import Header from '../Header'
import TopRatedBookCard from '../TopRatedBookCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const topRatedBooksApiStatusConstraints = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    topRatedBooksList: [],
    apiStatus: topRatedBooksApiStatusConstraints.initial,
  }

  componentDidMount() {
    this.getTopRatedBooks()
  }

  componentWillUnmount() {
    this.setState({
      topRatedBooksList: [],
      apiStatus: topRatedBooksApiStatusConstraints.initial,
    })
  }

  getTopRatedBooks = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: topRatedBooksApiStatusConstraints.inProgress})
    const topRatedBooksApiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(topRatedBooksApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.books.map(eachBookItem => ({
        id: eachBookItem.id,
        authorName: eachBookItem.author_name,
        coverPic: eachBookItem.cover_pic,
        title: eachBookItem.title,
      }))
      this.setState({
        topRatedBooksList: updatedData,
        apiStatus: topRatedBooksApiStatusConstraints.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: topRatedBooksApiStatusConstraints.failure})
    } else {
      this.setState({apiStatus: topRatedBooksApiStatusConstraints.failure})
    }
  }

  onRetryButtonClicked = () => {
    this.getTopRatedBooks()
  }

  renderTextContentPart = () => (
    <ContextObject.Consumer>
      {value => {
        const {onChangeActiveRouteId} = value
        const changeActiveRoute = () => {
          onChangeActiveRouteId('BOOKSHELVES')
        }
        return (
          <div className="text-container">
            <h1 className="title">Find Your Next Favorite Books?</h1>
            <p className="description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf" className="link-container">
              <button
                className="get-books-button mobile"
                type="button"
                onClick={changeActiveRoute}
              >
                Find Books
              </button>
            </Link>
          </div>
        )
      }}
    </ContextObject.Consumer>
  )

  renderHeaderPart = () => (
    <ContextObject.Consumer>
      {value => {
        const {onChangeActiveRouteId} = value
        const changeActiveRoute = () => {
          onChangeActiveRouteId('BOOKSHELVES')
        }
        return (
          <div className="title-find-books-header">
            <h1 className="books-title">Top Rated Books</h1>
            <Link to="/shelf" className="link-container">
              <button
                className="get-books-button desktop"
                type="button"
                onClick={changeActiveRoute}
              >
                Find Books
              </button>
            </Link>
          </div>
        )
      }}
    </ContextObject.Consumer>
  )

  renderFailureViewContainer = () => (
    <>
      {this.renderTextContentPart()}
      <div className="top-books-container">
        <div className="title-find-books-header">
          <h1 className="books-title">Top Rated Books</h1>
          <Link to="/shelf" className="link-container">
            <button className="get-books-button desktop" type="button">
              Find Books
            </button>
          </Link>
        </div>
        <div className="home-failure-view-container">
          <img
            className="failure-view-image-home"
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
    const {topRatedBooksList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <>
        {this.renderTextContentPart()}
        <div className="top-books-container">
          {this.renderHeaderPart()}
          <div className="top-books-list-container">
            <Slider {...settings}>
              {topRatedBooksList.map(eachBookItem => (
                <TopRatedBookCard
                  key={eachBookItem.id}
                  bookDetails={eachBookItem}
                />
              ))}
            </Slider>
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

  renderHomePage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case topRatedBooksApiStatusConstraints.inProgress:
        return this.renderInProgressViewContainer()
      case topRatedBooksApiStatusConstraints.success:
        return this.renderSuccessViewContainer()
      case topRatedBooksApiStatusConstraints.failure:
        return this.renderFailureViewContainer()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home-content-container" testid="Home">
        <Header />
        {this.renderHomePage()}
      </div>
    )
  }
}
export default Home
