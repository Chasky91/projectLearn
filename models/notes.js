import mongoose from "mongoose"

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connect to URL', url)

mongoose.connect(url)
    .then(result => {
        console.log('Connected to MONGODB');
    })
    .catch( err => {
        console.log('Error connecting  to MONGODB ', err.message)
    })


    const noteSchema = new mongoose.Schema({
        content:  {
            type: String,
            minLength: 5,
            required: true
        },
        important: Boolean
    })

    noteSchema.set('toJSON',{
        transform: (doc ,returnObject) => {
            returnObject.id = returnObject._id.toString()
            delete returnObject._id
            delete returnObject.__v
        }
    })

    export default mongoose.model('Note', noteSchema)