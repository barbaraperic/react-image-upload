import React from 'react'

const Images = ({images}) => {
  return (
    <div>
      {images.map(image => (
        <img src={image} alt={image}/>
      ))}
    </div>
  )
}

export default Images