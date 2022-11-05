import { FirebaseContext } from '@context/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export async function POST() {
  const [state] = useContext(FirebaseContext)

  let alreadySignedUp = false

  console

  if (state.auth && state.db) {
    const q = query(collection(state.db, 'nooks'), where('owner', '==', state.auth.currentUser?.uid))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
      alreadySignedUp = true
    })
  }

  return new Response(JSON.stringify({ alreadySignedUp }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
