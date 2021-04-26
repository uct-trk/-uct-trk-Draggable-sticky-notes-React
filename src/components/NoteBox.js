import MainContext from '../MainContext'
import React, { useContext, useState } from 'react'

function NoteBox() {

    const types = [
        {
            name: "comment",
            color: "red",
            text: "Yorum"
        },
        {
            name: "private-comment",
            color: "#999",
            text: "Gizli Yorum"
        },
        {
            name: "note",
            color: "orange",
            text: "Not"
        }
    ]

    const { boxPosition, setMode, notes, setNotes, setBoxVisible, mode } = useContext(MainContext)
    const [color, setColor] = useState(types[0].color)
    const [note, setNote] = useState('')

    // dropdowndaki durumu değiştirdipimizde type coloruna göre renk alır
    const changeColor = (e) => {
        setColor(e.target.value)
    }

    const textHandle = (e) => {
        setNote(e.target.value)
    }

    const addNote = () => {
        const currentNote = {

            id: "1",
            note,
            number: notes.length + 1,
            color,
            position: {
                x: boxPosition.x,
                y: boxPosition.y

            }
        }
        setNotes([...notes, currentNote])
        setBoxVisible(false)
        
    }

    return (
        <div onMouseEnter={() => setMode(false)} onMouseLeave={() => setMode(true)} style={{ '--color': color, position: "absolute", top: boxPosition.y, left: boxPosition.x }} className="note-box">
            <span className="note-box-number">{notes.length + 1}</span>

            <select style={{ background: color }} onChange={changeColor}>
                {types.map(type => (
                    <option value={type.color}>{type.text}</option>
                ))}
            </select>
            <textarea onChange={textHandle} cols="30" rows="5" ></textarea>
            <button onClick={addNote} disabled={!note} style={{ background: color }}>ADD</button>
        </div>
    )
}

export default NoteBox
