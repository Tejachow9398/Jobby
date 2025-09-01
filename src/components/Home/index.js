import {Link, Redirect} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  const onClickFindJobs = () => {
    ;<Redirect to="/jobs" />
  }
  return (
    <>
      <Header />
      <div className="home-cont">
        <h1>Find The Job That fits Your Life </h1>
        <p>
          Millions of people are searching for jobs, salary information, company
          reviews. Find the jobthat fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button
            type="button"
            className="Login-btn logout"
            onClick={onClickFindJobs}
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
