import React from 'react'

const Content = (props) => {
    console.log(props)

    return (
      <>
        {props.parts.map(part => <p key={part.name}> {part.name} {part.exercises} </p>)}
      </>
    )
}

export default Content