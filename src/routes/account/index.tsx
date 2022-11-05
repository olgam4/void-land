import logo from '@assets/logo.png'
import { FirebaseContext } from '@context/firebase'
import { getRedirectResult, GoogleAuthProvider, sendSignInLinkToEmail, signInWithRedirect } from 'firebase/auth'
import { useLocation, useNavigate } from 'solid-start'
import toast from 'solid-toast'

const actionCodeSettings = {
  url: 'https://nook.glo.quebec/account/confirm-sign-up',
  // url: 'http://localhost:3000/account/confirm-sign-up',
  handleCodeInApp: true,
}

export default function() {
  const [state] = useContext(FirebaseContext)
  const [email, setEmail] = createSignal('')
  const [saving, setSaving] = createSignal(false)
  const navigate = useNavigate()
  const location = useLocation()

  createEffect(() => {
    if (!state.auth) return
    if (location.pathname.includes('confirm-sign-up')) return

    const redirectTo = '/account/settings'

    getRedirectResult(state.auth)
      .then((result) => {
        if (!result?.user) return
        if (result.user.metadata?.lastSignInTime === result.user.metadata?.creationTime) {
          window.localStorage.setItem('emailForSignIn', result.user.email!)
          toast.success('Welcome to Nook!')
          navigate('/account/confirm-sign-up')
        } else {
          navigate(redirectTo)
        }

      })
    if (state.auth?.currentUser) navigate(redirectTo)
  })

  createEffect(() => {
    const params = new URLSearchParams(location.search)
    const plan = params.get('plan') || 'none'

    if (plan) {
      localStorage.setItem('plan', plan)
    }
  })

  const onSubmit = (e: Event) => {
    e.preventDefault()
    setSaving(true)
    state.auth && sendSignInLinkToEmail(state.auth, email(), actionCodeSettings)
      .then(() => {
        setSaving(false)
        window.localStorage.setItem('emailForSignIn', email())
        setEmail('')
        toast.success('Email sent!')
      })
      .catch((error) => {
        setSaving(false)
        switch (error.code) {
          case 'auth/invalid-email':
            toast.error('Invalid email')
            break
          case 'auth/missing-email':
            toast.error('Missing email')
            break
          default:
            toast.error('Something went wrong')
            break
        }
      })
  }

  const signWithGoogle = () => {
    if (!state.auth) return
    const provider = new GoogleAuthProvider()
    signInWithRedirect(state.auth, provider)
      .then(() => {
        toast.success('Signed in with Google')
      })
      .catch((error) => {
        console.error(error)
        toast.error('Something went wrong')
      })
  }

  return (
    <div class="flex full flex-col text-white flex-center bg-[#1D2E38]">
      <img src={logo} class="w-32 mb-20" />
      <div class="w-3/4 sm:w-1/4">
        <div class="flex flex-col flex-center">
          <h1 class="text-base mb-4 font-normal">
            Sign in / up with
          </h1>
          <div class="flex w-full justify-center space-x-4">
            <a class="rounded-2xl cursor-pointer flex-1 p-5 flex flex-center bg-gradient-to-tr from-[#ffafbd] to-[#ffc3a0]" onClick={signWithGoogle}>
              <div class="i-carbon-logo-google w-8 h-8" />
            </a>
          </div>
        </div>
        <div class="my-8 relative h-12 w-full">
          <div class="absolute w-full top-6 h-[2px] bg-gray-500" />
          <div class="absolute left-1/2 -translate-x-6 w-12 top-6 h-[10px] bg-[#1D2E38]" />
          <div class="absolute text-center top-3 text-gray-400 w-full">or</div>
        </div>
        <form class="flex flex-col space-y-5" onSubmit={onSubmit}>
          <input
            type="text"
            name="email"
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
            class="p-2 text-center bg-[#18262E] rounded-2xl border-2 border-gray-500"
            placeholder="john.doe@email.com"
          />
          <button disabled={saving()} class="rounded-2xl flex-1 p-3 flex font-bold flex-center bg-gradient-to-tr from-[#ffafbd] to-[#ffc3a0]" type="submit">
            <Switch>
              <Match when={!saving()}>
                Continue
              </Match>
              <Match when={saving()}>
                ...
              </Match>
            </Switch>
          </button>
        </form>
      </div>
    </div>
  )
}
