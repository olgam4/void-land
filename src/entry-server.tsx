import { StartServer, createHandler, renderStream } from 'solid-start/entry-server'
import dotenv from 'dotenv'

dotenv.config()

export default createHandler(renderStream(event => <StartServer event={event} />))
