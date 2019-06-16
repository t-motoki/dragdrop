import React from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";

import 'font-awesome/css/font-awesome.min.css';

export default (Props) => {
  const getTrashStyle = isDraggingOver => ({
    position:'absolute', right:'5px',
    borderRadius: '50%', border: 'solid 3px #000',
    padding:'7px 14px 7px', top: '55px',
    background: isDraggingOver ? "#666" : "#ccc",
    filter: 'drop-shadow(3px 3px 3px rgba(0,0,0,0.5))'
  });
  return (
    <Droppable droppableId={Props.droppableId}>
      {
        (provided, snapshot) => ( 
          <div ref={provided.innerRef} {...provided.droppableProps}
           className='fa fa-trash-o fa-4x' aria-hidden='true' style={getTrashStyle(snapshot.isDraggingOver)}>
            <Draggable key={'trash'} draggableId={'trash'} index={0}>
            {
              (provided) => (<div ref={provided.innerRef} {...provided.droppableProps} {...provided.dragHandleProps}></div>)
            }
          </Draggable>
          </div>
        )
      }
      
    </Droppable>
  );
}
