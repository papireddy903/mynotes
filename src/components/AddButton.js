import React from 'react'
import add from "../assets/add.png"
import { Link } from 'react-router-dom'

const AddButton = () => {
  return (
    <Link to="/note/new" className='floating-button'>
        <div>
            <img src={add} />
        </div>
    </Link>
  )
}

export default AddButton
