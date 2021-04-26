import { useEffect, useRef, useState } from 'react'
import './App.css';
import LeaveCommentText from './components/LeaveCommentText'
import MainContext from './MainContext'
import Note from './components/Note'
import NoteBox from './components/NoteBox'

function App() {

  const screen = useRef(null)
  const [mode, setMode] = useState(false)
  const [notes, setNotes] = useState(localStorage.notes && JSON.parse(localStorage.notes)|| [])

  const [boxVisible, setBoxVisible] = useState(false)

  const [boxPosition, setBoxPosition] = useState({
    x: 0,
    y: 0
  })

  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })

  
  // sayfa açılır açılmaz focus oldu c ye basmayı kolaylaştırıyor
  useEffect(() => {
    screen.current.focus()
  }, [])

  // notes değiştipinde bu notları kaydederiz
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  },[notes])

  // c tusuna basılınca olan olay
  const handleKeyUp = (e) => {
    if (e.key === 'c') {
      setMode(!mode)
      setBoxVisible(false)
    }
    if (e.key === 'Escape'){
      setBoxVisible(false)
    }
  }

  // Farenın konumunu gösterir
  const handleMouseMove = (e) => {
    setPosition({
      x: [e.pageX, e.clientX],
      y: [e.pageY, e.clientY]
    })
  }

  //Ekrana tıklayınca açılacak kutu
  const handleClick = (e) => {
    // eğer mode açıksa(c tusuna basılmış ise)
    if(mode){
      setBoxPosition({
        x: position.x[0],
        y: position.y[0]
      })
      setBoxVisible(true)
    }
  }

  const data = {
    position,
    boxPosition,
    setMode,
    notes,
    setNotes,
    setBoxVisible,
    mode
  }

  return (
    <MainContext.Provider value={data}>
      <div ref={screen} tabIndex={0} onClick={handleClick} onMouseMove={handleMouseMove} onKeyUp={handleKeyUp} className={`screen ${mode && 'editable'}`}>
        <img src="https://images.unsplash.com/photo-1597742800947-e17e915b8d83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=625&q=80" />

        {mode && <LeaveCommentText />}

        {mode && (<div>Yorum modu aktif</div>)}

        {notes && notes.map((note, i) => <Note key={i} {...note} />)}

        {boxVisible && <NoteBox />}
      </div>
    </MainContext.Provider>
  );
}

export default App;
