interface Props {
  request: Request
}

export async function POST({ request }: Props) {
  const { email } = await request.json()

  const api = '--REPLACE WITH YOUR API KEY--'

  await fetch('https://stormy-cyan-hare.cyclic.app/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, api }),
  })

  return new Response('OK', {
    status: 200,
  })
}
