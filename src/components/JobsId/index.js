import {Component} from 'react'
import {IoStar} from 'react-icons/io5'
import {ImLocation} from 'react-icons/im'
import {HiExternalLink} from 'react-icons/hi'
import {BsBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarDetails from '../SimilarDetails'
import './index.css'

const isLoadingconstant = {
  isLoading: 'LOADING',
  issuccess: 'SUCCESS',
  isfailure: 'FAILURE',
  isinitial: 'INITIAL',
}

class JobsId extends Component {
  state = {
    jobdetails: [],
    isLoading: isLoadingconstant.isinitial,
    similarjobDeatils: [],
  }

  componentDidMount() {
    this.getjobDetail()
  }

  getjobDetail = async () => {
    this.setState({isLoading: isLoadingconstant.isLoading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    console.log(id)
    const apiurl = `https://apis.ccbp.in/jobs/${id}`
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
        companyLogoUrl: data.job_details.company_logo_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        companyWebsiteUrl: data.job_details.company_website_url,
        skills: data.job_details.skills.map(each => ({
          skillimageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
      }
      const updatedsimilarjob = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        isLoading: isLoadingconstant.issuccess,
        jobdetails: updatedData,
        similarjobDeatils: updatedsimilarjob,
      })
    } else {
      this.setState({isLoading: isLoadingconstant.isfailure})
    }
  }

  renderSuccessView = () => {
    const {jobdetails, similarjobDeatils} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
    } = jobdetails
    return (
      <>
        <div className="jobitem">
          <div className="list">
            <div className="job-logo-cont">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="logo-url"
              />
              <div className="rating-cont">
                <h1>{title}</h1>
                <IoStar className="star" />
                <p>{rating}</p>
              </div>
            </div>
            <div className="details-cont">
              <div className="location-cont">
                <ImLocation className="location" />
                <p>{location}</p>
                <BsBriefcaseFill className="location" />
                <p>{employmentType}</p>
              </div>
              <p>{packagePerAnnum}</p>
            </div>
            <hr />
            <div>
              <div className="company-cont">
                <h1>Description</h1>
                <a href={companyWebsiteUrl} className="external-site">
                  Visit
                  <HiExternalLink className="external-site" />
                </a>
              </div>
              <p>{jobDescription}</p>
            </div>
            <h1>Skills</h1>
            <ul className="skills-ul">
              {skills.map(each => {
                const {name, skillimageUrl} = each
                return (
                  <li className="skills-list" key={name}>
                    <img
                      src={skillimageUrl}
                      alt={name}
                      className="skills-img"
                    />
                    <p>{name}</p>
                  </li>
                )
              })}
            </ul>
            <h1>Life at Company</h1>
            <div className="lifeAtCompany-cont">
              <p>{lifeAtCompany.description}</p>
              <img src={lifeAtCompany.imageUrl} alt="life at company" />
            </div>
          </div>
          <div>
            <h1 className="similar-head">Similar Jobs</h1>
            <ul className="skills-ul">
              {similarjobDeatils.map(each => (
                <SimilarDetails key={each.id} details={each} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="jobs-cont" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="jobitem">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="Login-btn logout"
        onClick={this.getjobDetail}
      >
        Retry
      </button>
    </div>
  )

  renderSwitch = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case isLoadingconstant.isLoading:
        return this.renderLoadingView()
      case isLoadingconstant.issuccess:
        return this.renderSuccessView()
      case isLoadingconstant.isfailure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderSwitch()}
      </div>
    )
  }
}

export default JobsId
