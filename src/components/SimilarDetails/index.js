import {Link} from 'react-router-dom'
import {IoStar} from 'react-icons/io5'
import {ImLocation} from 'react-icons/im'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarDetails = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = details
  console.log(id)
  return (
    <Link to={`/Jobs/${id}`} className="card-Link">
      <li className="list similar-cont">
        <div className="job-logo-cont">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="logo-url"
          />
          <div className="rating-cont">
            <h1>{title}</h1>
            <IoStar className="star" />
            <p>{rating}</p>
          </div>
        </div>
        <hr />
        <div>
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
        <div className="details-cont">
          <div className="location-cont">
            <ImLocation className="location" />
            <p>{location}</p>
            <BsBriefcaseFill className="location" />
            <p>{employmentType}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarDetails
