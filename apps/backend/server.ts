import 'dotenv/config'
import app from './app'
import type { Server } from 'http'

const PORT = process.env.PORT || 3000

const server: Server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default server