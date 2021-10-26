import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from './suggested-profile'

export default function Suggestions({ userId, following, loggedInUserDocId }) {
  const [profiles, setProfiles] = useState(null)

  // go ahead and get the suggested profile
  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following)
      setProfiles(response)
    }

    if (userId) {
      suggestedProfiles()
    }
  }, [userId])
  // use the firebase service (call userId)
  // getSuggestedProfiles
  // call the async function ^^^^^ within useEffect
  // store it in state
  // go ahead and render

  // eslint-disable-next-line no-nested-ternary
  return !profiles ? (
    <Skeleton count={3} height={150} className="mt-10" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>

      <div className="grid gap-5 mt-4">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string
}
