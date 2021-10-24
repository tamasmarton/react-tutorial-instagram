import { useContext, useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../constants/routes'

export default function Login() {
  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const isInvalid = password === '' || emailAddress === ''

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password)
      history.push(ROUTES.DASHBOARD)
    } catch (error) {
      setEmailAddress('')
      setPassword('')
      setError(error.message)
    }
  }

  useEffect(() => {
    document.title = 'Login Instagram'
  }, [])

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone" />
      </div>

      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.png" alt="Insta logo" className="mt-2 mb-4 w-6/12" />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input
              type="email"
              placeholder="Email address"
              aria-label="Enter your email address"
              className="text-sm text-gray-base w-full h-2 py-5 px-4 mr-3 mb-2 border border-gray-primary rounded"
              onChange={({ target }) => setEmailAddress(target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              aria-label="Enter your password"
              className="text-sm text-gray-base w-full h-2 py-5 px-4 mr-3 mb-2 border border-gray-primary rounded"
              onChange={({ target }) => setPassword(target.value)}
            />

            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                ${isInvalid && 'opacity-50'}
              `}
            >
              Log In
            </button>
          </form>
        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="tect-sm">
            Don't have an account?{` `}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
