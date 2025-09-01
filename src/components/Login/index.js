import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errormsg: '', error: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onsuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdetails = {
      username,
      password,
    }
    const apiurl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const response = await fetch(apiurl, options)
    const data = await response.json()
    if (response.ok) {
      this.onsuccess(data.jwt_token)
    } else {
      console.log(data.error_msg)
      this.setState({error: true, errormsg: data.error_msg})
    }
  }

  render() {
    const {username, password, error, errormsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="Login-cont">
        <div className="Login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="Login-form" onSubmit={this.onSubmit}>
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              className="input"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
            <button type="submit" className="Login-btn">
              Login
            </button>
            {error && <p className="error">{errormsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
