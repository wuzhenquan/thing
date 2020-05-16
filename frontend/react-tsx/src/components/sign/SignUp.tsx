import React, { useState, useEffect } from 'react'
import * as api from '../../api'
import Icon from '../icons/Icon'
import { withRouter } from 'react-router-dom'
import { JSEncrypt } from 'jsencrypt'
import WithCommonContext from '../../context/common/WithCommonContext'
import UserContext from '../../context/user/UserContext'

interface SignUpProps {
  commonContext: {
    getPublicKey: () => void
    publicKey: string
  }
  history: { push: (url: string) => void }
}

const SignUp: React.FC<SignUpProps> = props => {
  const {
    commonContext: { getPublicKey, publicKey },
    history: { push }
  } = props
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(getPublicKey, [])

  function submit(authenticate: (user: object) => void, e: React.FormEvent<HTMLFormElement>): void {
    e && e.preventDefault() // stop the page trying to load the action url.
    if (!name) console.error('请输入名字')
    else if (!password) console.error('请输入密码')
    else {
      let encryptor = new JSEncrypt() //实例化
      encryptor.setPublicKey(publicKey) //设置公钥
      api
        .signUp({
          name,
          email,
          password: encryptor.encrypt(password)
        })
        .then(user => authenticate(user))
        .then(() => push('/workbench/todo'))
    }
  }
  return (
    <section className="hero is-fullheight-with-navbar level">
      <UserContext.Consumer>
        {({ authenticate }) => (
          <form onSubmit={e => submit(authenticate, e)} className="level-item has-text-centered">
            <div>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="User name"
                    required
                    onChange={e => setName(e.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <Icon name="account" size="0.9" />
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    required
                    onChange={e => setEmail(e.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <Icon name="email" size="0.9" />
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    required
                    onChange={e => setPassword(e.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <Icon name="lock" size="0.9" />
                  </span>
                </p>
              </div>
              {/* <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" type="password" placeholder="Confirm password" required />
                        <span className="icon is-small is-left">
                            <Icon name='lock' size={ 0.9 } />
                        </span>
                    </p>
                </div> */}
              <div className="field">
                <p className="control">
                  <button className="button is-primary is-fullwidth">Sign up</button>
                </p>
              </div>
              <div>
                <p className="is-size-7">
                  Already have an account? <a href="signin">Sign in.</a>
                </p>
              </div>
            </div>
          </form>
        )}
      </UserContext.Consumer>
    </section>
  )
}

export default withRouter(WithCommonContext(SignUp))
