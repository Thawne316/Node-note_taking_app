const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter ((note) => note.title !== title)

    if(notes.length == duplicateNotes.length) {
        console.log(chalk.red.inverse('No note found'))
    } else {
        saveNotes(duplicateNotes)
        console.log(chalk.green.inverse('Note removed!'))
    }
}  

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.white.inverse('My List'))
    notes.forEach((notes) => {
        console.log(notes.title)
    })
}

const readNotes = (title) => {
    const notes = loadNotes()
    const reqdNote = notes.find((note) => note.title === title)  
    if(reqdNote) {
        console.log(chalk.bold.underline(reqdNote.title))
        console.log(reqdNote.body)
    }  else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes:listNotes,
    readNotes:readNotes
}    
