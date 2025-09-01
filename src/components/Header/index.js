import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <ul className="header-cont">
      <li>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </li>
      <li className="nav-links">
        <Link to="/" className="link">
          {' '}
          Home{' '}
        </Link>
        <Link to="/jobs" className="link">
          Jobs
        </Link>
      </li>
      <li>
        <button
          type="button"
          className="Login-btn logout"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
