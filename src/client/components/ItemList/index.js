import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default (Props) => {

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 8,
    margin: `0 0 8px 0`,
    border: `solid 1px #777`,
    boxShadow: `2px 2px 2px 1px #bdc0c860`,
  
    // change background colour if dragging
    background: isDragging ? "aquamarine" : "aliceblue",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });
  
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lemonchiffon" : "gainsboro",
    padding: 8,
    width: 168
  });

  return (
      <Droppable droppableId={Props.droppableId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
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
