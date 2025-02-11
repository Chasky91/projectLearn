import mongoose from 'mongoose'
if(process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password =encodeURIComponent(process.argv[2])
const user = encodeURIComponent('davidfull')
console.log(password, "password")
const  url =  `mongodb+srv://${user}:${password}@cluster0.noxuk.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content:String,
    important:Boolean
})

const Note = mongoose.model('Note',noteSchema)

/*const note = new Note({
    content:"Que rica cola",
    important:false
})



note.save().then(result => {
    console.log('note saved')
    console.log(url)
    mongoose.connection.close()
})*/

Note.find({important : false}).then(result => {
    result.forEach( note => {
        console.log(note)
    })
    mongoose.connection.close()
})