import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export default (Props) => {

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 8,
    margin: `0 0 0 0`,
    border: `solid 1px #777`,
  
    // change background colour if dragging
    background: isDragging ? 'aquamarine' : 'aliceblue',
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });
  
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lemonchiffon' : 'gainsboro',
    display: 'flex',
    padding: `8px 0 8px`,
    overflow: 'auto',
  });

  return (
      <Droppable droppableId={Props.droppableId} direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {Props.items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  );
}
