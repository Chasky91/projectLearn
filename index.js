import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Note from './models/notes.js'


const app = express()
const PORT = process.env.PORT 

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const getMaxId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0
  return maxId + 1
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then( notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note =  notes.find(note => note.id === id)
    if (!note) {
      res.status(404).send('Note not found, no encontrado')
    } else {
        res.json(note)
    }    
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  
  const body = req.body
  if(!body.content) { 
      res.status(400).json({
        err:"Content is required, that missing"
      })
  }
  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: getMaxId()
  }
  notes = notes.concat(note)
  res.status(201).json(note)
})

app.post('/api/notes', (req, res) => {
  const note = req.body
  
  console.log(note)
  res.status(200).json(note)
})

app.listen(PORT, () => {
  console.log(`Server running on port localhost:${PORT}`)
})