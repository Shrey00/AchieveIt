import React from 'react'

const Button = ({buttonText, handleClick}) => {
  return (
    <button className = "m-4 p-2 bg-green-400 rounded-md" onClick={handleClick}>{buttonText}</button>
  )
}

export default Button