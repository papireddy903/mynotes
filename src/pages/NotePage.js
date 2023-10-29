import React, {useEffect, useState} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
// import notes from '../assets/data'
import arrowLeft from '../assets/arrow-left.png'
import AddButton from '../components/AddButton';

const NotePage = ({history}) => {
    const {id} = useParams();
    // const note = notes.find(note => note.id===Number(id))
    let [note,setNote] = useState([])

    let navigate = useNavigate()

    useEffect(() => {
      getNote()
    }, [id])

    let getNote = async () => {
      if (id == 'new') return 
      let response = await fetch(`http://localhost:8000/notes/${id}`)
      let data = await response.json()
      console.log("data: ",data)
      setNote(data)
    }

    let handleSubmit = () => {
      if (id !== 'new' && !note.body){
        deleteNote()
      }
      else if (id !== 'new'){
        updateNote()
      }
      else if (id === 'new' && note.body!== null){
        createNote()
      }
      updateNote()
      navigate('/')
    }

    let createNote = async () => {
      await fetch(`http://localhost:8000/notes`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...note, 'updated':new Date()})
      })
      navigate('/')
    }

    let updateNote = async () => {
      await fetch(`http://localhost:8000/notes/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...note, 'updated':new Date()})
      })
    }

    let deleteNote = async () => {
      await fetch(`http://localhost:8000/notes/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      }
      )
      navigate('/')
    }

  return (
    <div className='note'>
      <div >
        <h3 className='note-header'>
          <Link to="/" >
            <div className='note-header'>
              <img onClick={handleSubmit} src={arrowLeft}/>
            </div>
          </Link>
          {id!=='new'?(
              <button onClick={deleteNote}>Delete</button>
          ):
          (
            <button onClick={handleSubmit}>Done</button>
          )
          }
          
        </h3>
      </div>
      
      <textarea onChange = {(e)=> {setNote({...note, 'body':e.target.value})}} value={note.body}></textarea>
    </div>
  )
}

export default NotePage;
