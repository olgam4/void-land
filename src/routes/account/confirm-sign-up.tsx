import { FirebaseContext } from '@context/firebase'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { doc, setDoc, } from 'firebase/firestore'
import { useNavigate } from 'solid-start'
import toast from 'solid-toast'
import Account from '.'

export default function() {
  const [state] = useContext(FirebaseContext)
  const [nook, setNook] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [verify, setVerify] = createSignal('')
  const [saving, setSaving] = createSignal(false)
  const [alreadySignedUp, setAlreadySignedUp] = createSignal(false)

  const navigate = useNavigate()

  createEffect(async () => {
    const result = await fetch('/api/subscribe', {
      method: 'POST',
    })
    const data = await result.json()
    data && setAlreadySignedUp(data.alreadySignedUp)
  })

  createEffect(on(alreadySignedUp, () => {
    if (alreadySignedUp()) {
      navigate('/account/settings')
    }
  }))

  createEffect(() => {
    if (!state.auth) return
    if (!isSignInWithEmailLink(state.auth, window.location.href)) return

    let email = window.localStorage.getItem('emailForSignIn')

    if (!email) {
      email = window.prompt('Please provide your email for confirmation') || ''
    }

    signInWithEmailLink(state.auth, email, window.location.href)
      .then(async () => {
        window.localStorage.removeItem('emailForSignIn')
        const result = await fetch('/api/subscribe', {
          method: 'POST',
        })
        const data = await result.json()
        if (data.alreadySignedUp) {
          toast.success('Welcome to Nook!')
          navigate('/account/confirm-sign-up')
        } else {
          navigate('/account/settings')
        }
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-action-code') {
          toast.error('Oops, that link is no longer valid')
          navigate('/account')
        }
      })
  })

  const onSubmit = (e: Event) => {
    e.preventDefault()

    if (password() !== verify() || !password()) {
      toast.error('Keys do not match')
      return
    }

    if (!nook()) {
      toast.error('Nook name is required')
      return
    }

    if (!state.db || !state.auth) {
      toast.error('Something went wrong')
      return
    }

    setSaving(true)
    setDoc(doc(state.db, 'nooks', nook()), {
      key: password(),
      owner: state.auth.currentUser?.uid || '',
    })
      .then(() => {
        setSaving(false)
        setNook('')
        setPassword('')
        setVerify('')
        toast.success('Nook created!')
        navigate('/account')
      })
      .catch(() => {
        setSaving(false)
        toast.error('Something went wrong')
      })
  }

  return (
    <>
      <Account />
      <div class="full flex text-white flex-center bg-black/40">
        <div class="p-10 bg-[#1D2E38] opacity-100 sm:w-1/4">
          <form class="flex flex-col space-y-4" onSubmit={onSubmit}>
            <h1 class="text-2xl font-semibold">Confirm Sign Up</h1>
            <div class="space-y-2 text-gray-400">
              <p>
                Choose your nook's name: be careful, you can't change it later and it will be visible to everyone.
              </p>
              <p>
                Also, it needs to be unique.
              </p>
            </div>
            <label>
              <p>Nook Name</p>
              <input
                value={nook()}
                placeholder="My nook's name"
                class="p-2 w-full text-center bg-[#18262E] rounded-2xl border-2 border-gray-500"
                onInput={e => setNook(e.currentTarget.value)}
              />
            </label>
            <div class="space-y-2 text-gray-400">
              <p>
                Your secret key will be used to sign in to your account. It's a good idea to use a password manager to generate a strong password.
              </p>
              <p>
                <i><b>It will not be possible to recover your account if you lose they key</b></i> nor will it be possible to change it, so make sure you do not forget what it is.
              </p>
            </div>
            <label class="flex-1">
              <p>Secret Key</p>
              <input
                name="password"
                type="password"
                class="p-2 w-full text-center bg-[#18262E] rounded-2xl border-2 border-gray-500"
                value={password()}
                onInput={e => setPassword(e.currentTarget.value)}
              />
            </label>
            <label class="flex-1">
              <p>Verify Secret Key</p>
              <input
                class="p-2 w-full text-center bg-[#18262E] rounded-2xl border-2 border-gray-500"
                name="verify"
                type="password"
                value={verify()} onInput={e => setVerify(e.currentTarget.value)}
              />
            </label>
            <button disabled={saving()} class="rounded-2xl flex-1 p-3 flex font-bold flex-center bg-gradient-to-tr from-[#ffafbd] to-[#ffc3a0]" type="submit">
              <Switch>
                <Match when={!saving()}>
                  Confirm
                </Match>
                <Match when={saving()}>
                  ...
                </Match>
              </Switch>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
