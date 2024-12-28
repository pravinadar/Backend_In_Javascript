const express = require('express')    // this line is as good as " import express from "express" "
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/name', (req, res) => {
  res.send('Pravin')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})