const express = require('express')
const app = express()

app.get('/', (request, response) => {
  response.send('Running')
})

console.log('Listening on port 3001')
app.listen(3001)
