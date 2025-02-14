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



const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  if(err.name === 'CastError') {
    return res.status(400).send({err:'malformated id'})
  } else if(err.name === 'ValidationError') { 
    return res.status(400).json({err:err.message})
  }

  next(err)
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then( notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (req, res, next) => {

    Note.findById(req.params.id).then( note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).json(note)
      }
    }).catch(error => next(error))


})

app.delete('/api/notes/:id', (req, res, next) => {
    const id = req.params.id
    Note.findByIdAndDelete(id)
      .then(result => {
        res.status(204).end()
      })
      .catch(error => next(error))
})

app.post('/api/notes', (req, res, next) => {
  
  const body = req.body

  const note = new Note({
    content:body.content,
    important:body.inportant || false
  })
  
  note.save()
    .then( saveNote => {
      res.json(saveNote)
    })
    .catch(error => {
      next(error)
    })
})

app.post('/api/notes', (req, res) => {
  const note = req.body
  
  console.log(note)
  res.status(200).json(note)
})

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  const  {content, important} = req.body

  Note.findByIdAndUpdate(id, {content, important}, {new:true, runValidators:true, context: 'query' }) 
    .then(updateNote => {
      res.json(updateNote)
    })
    .catch(error => {
       next(error)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// controlador de solicitudes con endpoint desconocido
app.use(unknownEndpoint)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port localhost:${PORT}`)
})