import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import type { FlowComponent } from 'solid-js'


type State = [{
  app: ReturnType<typeof initializeApp> | null
  auth: ReturnType<typeof getAuth> | null
  db: ReturnType<typeof getFirestore> | null
}]

export const FirebaseContext = createContext<State>([
  {
    app: null,
    auth: null,
    db: null,
  }
])

export const FirebaseProvider: FlowComponent = (props) => {
  const firebaseConfig: FirebaseOptions = {
    apiKey: 'AIzaSyCgiBWCWHNd1u-jfbv77XjZgN97qs6lYmo',
    projectId: 'nook-eb0bd',
    authDomain: 'nook-eb0bd.firebaseapp.com',
  }
  const app = initializeApp(firebaseConfig)

  const [state] = createStore({
    app,
    auth: getAuth(app),
    db: getFirestore(app),
  })

  const theme = [
    state,
  ] as State

  return (
    <FirebaseContext.Provider value={theme}>
      {props.children}
    </FirebaseContext.Provider>
  )
}

