import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as api from '../../api'
import Icon from '../icons/Icon'
import { withRouter } from 'react-router-dom'
import { JSEncrypt } from 'jsencrypt'
import WithCommonContext from '../../context/common/WithCommonContext'
import UserContext from '../../context/user/UserContext'

interface SignInProps {
  history: { push: (url: string) => void }
  commonContext: {
    publicKey: string
    getPublicKey: () => void
  }
}

interface handleEvent {
  preventDefault: () => void
}

const SignIn: React.FC<SignInProps> = props => {
  const {
    commonContext: { getPublicKey }
  } = props
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(getPublicKey, [])

  const submit = async (authenticate: (user: object) => void, e: handleEvent) => {
    e && e.preventDefault() // stop the page trying to load the action url.
    const {
      commonContext: { publicKey },
      history
    } = props
    if (!name) return console.error('请输入名字')
    else if (!password) return console.error('请输入密码')
    let encryptor = new JSEncrypt() //实例化
    encryptor.setPublicKey(publicKey) //设置公钥
    api
      .signIn({
        name,
        password: encryptor.encrypt(password)
      })
      .then(user => authenticate(user))
      .then(() => {
        history.push('/workbench/todo')
      })
  }

  return (
    <section className="hero is-fullheight-with-navbar level">
      <UserContext.Consumer>
        {({ authenticate }) => (
          <form onSubmit={e => submit(authenticate, e)} className="level-item has-text-centered">
            <div>
              <div className="field">
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="name"
                    onChange={e => setName(e.target.value)}
                    required
                  />
                  <span className="icon is-small is-left">
                    <Icon name="account" size="0.9" />
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
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <span className="icon is-small is-left">
                    <Icon name="lock" size="0.9" />
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

SignIn.propTypes = {
  commonContext: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(WithCommonContext(SignIn))
