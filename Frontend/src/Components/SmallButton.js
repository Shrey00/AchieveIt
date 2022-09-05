

const  SmallButton = ({buttonText, handleClick}) => {
  return (
    <button className = "px-[1.2rem] py-[0.13rem] bg-green-400 hover:bg-green-500" onClick={handleClick}>{buttonText}</button>
  )
}

export default SmallButton;