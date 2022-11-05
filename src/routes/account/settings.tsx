import { FirebaseContext } from '@context/firebase'
import { useNavigate } from 'solid-start'

export default function() {
  const [state] = useContext(FirebaseContext)
  const navigate = useNavigate()

  createEffect(() => {
    if (!state.auth?.currentUser) navigate('/account')
    const plan = localStorage.getItem('plan') || 'none'
    localStorage.removeItem('plan')

    if (plan === 'paid') {
      window.location.href = 'https://billing.stripe.com/p/login/8wMbKx4rG5y311e4gg'
      // window.location.href = 'https://billing.stripe.com/p/login/test_dR68x70jjeLLgKs9AA'
    } else if (plan === 'none') {
      navigate('/#pricing')
    } else {
      window.location.href = 'https://buy.stripe.com/' + plan
      // window.location.href = 'https://buy.stripe.com/test_cN22aLfBB3Oma64bII'
    }
  })

  return (
    <div />
  )
}
