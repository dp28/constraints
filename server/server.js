const express = require('express')
const { solveEventProblem } = require('json-constraints-solver')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (request, response) => {
  response.send('Running')
})

app.post('/events', (request, response) => {
  console.log('Received')
  solveEventProblem(request.body).then(response.send.bind(response))
})

console.log('Listening on port 3001')
app.listen(3001)
