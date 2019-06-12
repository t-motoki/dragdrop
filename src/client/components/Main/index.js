import React, { Component } from 'react';
import moment from 'moment';
import { DragDropContext } from 'react-beautiful-dnd';

import CustomizedTables from '../CustomizedTables';
import MenuBar from '../MenuBar';
import ItemList from '../ItemList';
import ItemChain from '../ItemChain';

import './style.scss';

const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

let itemCount = 40;
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
const move = (source, destination, droppableSource, droppableDestination, copy=false, cannot=false) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);

  const result = {};
  if(cannot){
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  }

  // const [removed] = sourceClone.splice(droppableSource.index, 1);
  const [removed] = copy
  ? JSON.parse(JSON.stringify(sourceClone.slice(droppableSource.index, droppableSource.index+1)))
  : sourceClone.splice(droppableSource.index, 1);

  if(copy){
    itemCount++;
    console.log(itemCount);
    removed.id = 'item-'+ (itemCount-1);
  }

  destClone.splice(droppableDestination.index, 0, removed);
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(new Date()),
      finishDate: moment(new Date()).add(33,'h'),
      interval: 30,
      ItemStatus:{
        real:[{id:'', name:'',procTime:0,with:0}],
        esti:[
          [{name:'',procTime:0,with:0}]
        ]
      },
      itemlist: getItems(30),
      rjbChain: getItems(5,30),
      pjbChain: [
        getItems(2,35),
        getItems(3,37),
      ],
    };

    this.createData = this.createData.bind(this);

  }

  createData(date, time, jobchain) {
    return { date, time, jobchain };
  };

  id2List = {
    droppable1: 'itemlist',
    droppable2: 'rjbChain'
  };
  
  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
          return;
      }

      if (source.droppableId === destination.droppableId) {
          const itemlist = reorder(
              this.getList(source.droppableId),
              source.index,
              destination.index
          );

          let state = { itemlist };

          if (source.droppableId === 'droppable2') {
              state = { rjbChain: itemlist };
          }

          this.setState(state);
      } else {
          const result = move(
              this.getList(source.droppableId),
              this.getList(destination.droppableId),
              source,
              destination,
              source.droppableId === 'droppable1',
              destination.droppableId === 'droppable1' || destination.droppableId === 'droppable3',
          );
          this.setState({
            itemlist: result.droppable1,
            rjbChain: result.droppable2
          });
      }
  };


  render() {
    // const maxJobTime = 5000;
    // const divisionNum = 10;

    // let TimeLine = [];

    const rows1 = [
      this.createData(this.state.finishDate.format('YYYY/MM/DD '), this.state.finishDate.format('HH:mm'), <ItemChain droppableId={'droppable2'} items={this.state.rjbChain} />),
    ];

    const rows2 = [
      this.createData(this.state.startDate.format('YYYY/MM/DD '), this.state.startDate.format('HH:mm'), <ItemChain droppableId={'droppable3'} items={this.state.pjbChain[0]} />),
      this.createData('', this.state.startDate.add(30,'m').format('HH:mm'), <ItemChain droppableId={'droppable4'} items={this.state.pjbChain[1]} />),
    ];
  
    return (
      <div className='main'>
        <MenuBar />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className='joblist'>
            <ItemList droppableId={'droppable1'} items={this.state.itemlist} />
          </div>
          <div className='chainList'>
            <div>■実際のチェーン</div>
            <CustomizedTables head={{bgcolor:'gold'}} rows={rows1} idpre='ano'/>
            <br /><br />
            <div>■時間帯別予測のチェーン</div>
            <CustomizedTables head={{bgcolor:'palegreen'}} rows={rows2} idpre='yos'/>
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export default Main;
