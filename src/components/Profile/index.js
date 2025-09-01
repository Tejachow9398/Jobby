import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const loadingConstant = {
  isInitial: 'INITIAL',
  isLoading: 'LOADING',
  isFailure: 'FAILURE',
  isSuccess: 'SUCCESS',
}

class Profile extends Component {
  state = {profiledetails: {}, isLoading: loadingConstant.isInitial}

  componentDidMount() {
    this.getprofilelist()
  }

  getprofilelist = async () => {
    this.setState({isLoading: loadingConstant.isLoading})
    const jwtToken = Cookies.get('jwt_token')
    const apiurl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiurl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        isLoading: loadingConstant.isSuccess,
        profiledetails: updatedData,
      })
    } else {
      console.log('failureProfile')
      this.setState({isLoading: loadingConstant.isFailure})
    }
  }

  renderSuccessView = () => {
    const {profiledetails} = this.state
    const {profileImageUrl, shortBio} = profiledetails
    return (
      <div className="profile-cont">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">Devvela Teja</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="jobs-cont" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="profile-cont">
      <button
        type="button"
        className="Login-btn logout"
        onClick={this.getprofilelist}
      >
        Retry
      </button>{' '}
    </div>
  )

  renderSwitch = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case loadingConstant.isLoading:
        return this.renderLoadingView()
      case loadingConstant.isSuccess:
        return this.renderSuccessView()
      case loadingConstant.isFailure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderSwitch()}</div>
  }
}
export default Profile
