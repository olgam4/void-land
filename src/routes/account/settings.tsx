import { FirebaseContext } from '@context/firebase'
import { useNavigate } from 'solid-start'

export default function() {
  const [state] = useContext(FirebaseContext)
  const navigate = useNavigate()

  createEffect(() => {
    if (!state.auth?.currentUser) navigate('/account')
  })

  return (
    <div>

    </div>
  )
}
