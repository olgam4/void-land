import faunadb from 'faunadb'

interface Props {
  request: Request
}

export async function POST({ request }: Props) {
  const { email } = await request.json()

  const client = new faunadb.Client({ secret: process.env.FAUNADB || '' })

  const q = faunadb.query
  client.query(
    q.Create(q.Collection('subscribers'), {
      data: { email },
    })
  )

  return new Response('OK', {
    status: 200,
  })
}
