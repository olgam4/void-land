interface Props {
  request: Request
}

export async function POST({ request }: Props) {
  const { email } = await request.json()

  console.log('-- SUBSCRIBE --')

  console.log(email)

  const api = '--REPLACE WITH YOUR API KEY--'

  console.log(api)

  const response = await fetch('https://stormy-cyan-hare.cyclic.app/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, api }),
  })
  .then((res) => console.log(res))
  .catch((error) => {
    console.error(error)
  })

  console.log(response)

  return new Response('OK', {
    status: 200,
  })
}
