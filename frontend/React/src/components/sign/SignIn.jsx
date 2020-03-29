import React, { Component } from 'react'
import * as api from '../../api'
import Icon from '../icons/Icon'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { JSEncrypt } from 'jsencrypt'
import WithCommonContext from '../../context/common/WithCommonContext'
import UserContext from '../../context/user/UserContext'

class SignIn extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: ''
    }
  }

  componentDidMount() {
    const {
      commonContext: { getPublicKey }
    } = this.props
    getPublicKey()
  }

  async submit(authenticate, e) {
    const {
      commonContext: { publicKey }
    } = this.props
    e && e.preventDefault() // stop the page trying to load the action url.
    const { history } = this.props
    if (!this.state.name) return console.error('请输入名字')
    else if (!this.state.password) return console.error('请输入密码')
    let encryptor = new JSEncrypt() //实例化
    encryptor.setPublicKey(publicKey) //设置公钥
    api
      .signIn({
        name: this.state.name,
        password: encryptor.encrypt(this.state.password)
      })
      .then(user => authenticate(user))
      .then(() => {
        history.push('/workbench/todo')
      })
  }

  render() {
    return (
      <section className="hero is-fullheight-with-navbar level">
        <UserContext.Consumer>
          {({ authenticate }) => (
            <form
              onSubmit={e => {
                this.submit(authenticate, e)
              }}
              className="level-item has-text-centered"
            >
              <div>
                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="text"
                      placeholder="name"
                      onChange={e => {
                        this.setState({ name: e.target.value })
                      }}
                      required
                    />
                    <span className="icon is-small is-left">
                      <Icon name="account" size={0.9} />
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      onChange={e => {
                        this.setState({ password: e.target.value })
                      }}
                      required
                    />
                    <span className="icon is-small is-left">
                      <Icon name="lock" size={0.9} />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <p className="control">
                    <button className="button is-primary is-fullwidth">Sign in</button>
                  </p>
                </div>
                <div>
                  <p className="is-size-7">
                    Don't have an account? <a href="/signup">Sign up.</a>
                  </p>
                </div>
              </div>
            </form>
          )}
        </UserContext.Consumer>
      </section>
    )
  }
}

export default withRouter(WithCommonContext(SignIn))
