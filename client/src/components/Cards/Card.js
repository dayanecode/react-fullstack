import React, { useState } from "react"
import FormDialog from "../Dialog/Dialog"

const Card = (props) => {

  const [open, setOpen] = useState(false);

  const handleClickCard = () => {
    setOpen(true)
  }

  return (

    <section>
        <FormDialog 
          open={open} 
          setOpen={setOpen}
          id={props.id} 
          task={props.task} 
          status={props.status} 
          comments={props.comments} 
          listCard={props.listCard}
          setListCard={props.setListCard}
          />
          <div className="card--wrapper">
            <div className="card--container" onClick={() => handleClickCard()}>
                <p className="card--id">{props.id}</p>
                <h1 className="card--title" >{props.task}</h1>
                <p className="card--status"><strong>Status:</strong> {props.status}</p>
                <p className="card--comments"><strong>Comentário:</strong> {props.comments}</p>
            </div>
        </div>
      </section>

  )
}

export default Card

