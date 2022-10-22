import mysql from 'mysql2'

interface Props {
  request: Request
}

export async function POST({ request }: Props) {
  const { email } = await request.json()

  const connection = mysql.createConnection(process.env.DATABASE_URL || '')

  connection.query(
    `INSERT INTO subscribers (email) VALUES ('${email}')`,
    (err, results) => {
      if (err) {
        console.log(err)
      } else {
        console.log(results)
      }
    }
  )

  return new Response('OK', {
    status: 200,
  })
}
