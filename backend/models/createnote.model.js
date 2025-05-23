import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    content:{
        type : String,
        required : true
    },
    tags:{
        type : [String],
        required : true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // user model ka naam
        required: true,
      },
})

const Note = mongoose.model("Note", noteSchema)
export default Note;