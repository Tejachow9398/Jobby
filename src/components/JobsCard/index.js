import {Link} from 'react-router-dom'
import {IoStar} from 'react-icons/io5'
import {ImLocation} from 'react-icons/im'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobsCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details
  return (
    <Link to={`/jobs/${id}`} className="card-Link">
      <li className="list">
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
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobsCard
