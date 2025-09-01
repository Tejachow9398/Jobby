import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'
import JobsCard from '../JobsCard'
import Profile from '../Profile'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const loadingConstant = {
  isInitial: 'INITIAL',
  isLoading: 'LOADING',
  isFailure: 'FAILURE',
  isSuccess: 'SUCCESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    isLoading: loadingConstant.isInitial,
    checkedList: [],
    minpackage: '',
    searchinput: '',
  }

  componentDidMount() {
    this.getjobslist()
  }

  getjobslist = async () => {
    this.setState({isLoading: loadingConstant.isLoading})
    const {checkedList, minpackage, searchinput} = this.state
    const stringchecked = checkedList.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const apiurl = `https://apis.ccbp.in/jobs?employment_type=${stringchecked}&minimum_package=${minpackage}&search=${searchinput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiurl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.jobs.map(jobs => ({
        companyLogoUrl: jobs.company_logo_url,
        employmentType: jobs.employment_type,
        id: jobs.id,
        jobDescription: jobs.job_description,
        location: jobs.location,
        packagePerAnnum: jobs.package_per_annum,
        rating: jobs.rating,
        title: jobs.title,
      }))
      this.setState({
        isLoading: loadingConstant.isSuccess,
        jobsList: updatedData,
      })
    } else {
      this.setState({isLoading: loadingConstant.isFailure})
    }
  }

  onChangesalary = id => {
    this.setState({minpackage: id}, this.getjobslist)
  }

  onClicksearchBtn = () => {
    this.getjobslist()
  }

  onclickCheckbox = (employmentTypeId, checked) => {
    if (checked) {
      this.setState(
        prev => ({
          checkedList: [...prev.checkedList, employmentTypeId],
        }),
        this.getjobslist,
      )
    } else {
      const {checkedList} = this.state
      const filteredList = checkedList.filter(each => each !== employmentTypeId)
      this.setState({checkedList: filteredList}, this.getjobslist)
    }
  }

  onchangeinput = event => {
    this.setState({searchinput: event.target.value})
  }

  renderLoadingView = () => (
    <div className="jobs-cont" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="noJobs">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="should be failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="Login-btn logout"
        onClick={this.getjobslist}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    return (
      <div>
        {jobsList.length === 0 ? (
          <div className="noJobs">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters</p>
          </div>
        ) : (
          <ul className="ul">
            {jobsList.map(each => (
              <JobsCard key={each.id} details={each} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderswitch = () => {
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
    const {searchinput} = this.state
    return (
      <div>
        <Header />
        <div className="jobs-cont">
          <div>
            <Profile />
            <hr />
            <div>
              <h1>Type of Employment</h1>
              <ul className="ul">
                {employmentTypesList.map(each => (
                  <EmploymentType
                    key={each.employmentTypeId}
                    details={each}
                    onclickCheckbox={this.onclickCheckbox}
                  />
                ))}
              </ul>
            </div>
            <hr />
            <h1>Salary Range </h1>
            <ul className="ul">
              {salaryRangesList.map(each => (
                <SalaryRange
                  key={each.salaryRangeId}
                  details={each}
                  onChangesalary={this.onChangesalary}
                />
              ))}
            </ul>
          </div>
          <div className="jobdetails-cont">
            <div className="input-cont">
              <input
                type="search"
                placeholder="Search"
                className="input"
                onChange={this.onchangeinput}
                value={searchinput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.onClicksearchBtn}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderswitch()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
