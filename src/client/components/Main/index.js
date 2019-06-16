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

let itemCount = 45;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const move = (source, destination, droppableSource, droppableDestination, copy = false) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);

  console.log(sourceClone);
  console.log(destClone);

  // コピーフラグが有効の場合は移動せずにコピーする
  // const [removed] = sourceClone.splice(droppableSource.index, 1);
  const [removed] = copy
    ? JSON.parse(JSON.stringify(sourceClone.slice(droppableSource.index, droppableSource.index + 1)))
    : sourceClone.splice(droppableSource.index, 1);

  if (copy) {
    // コピーの場合はアイテムのIDを追加する
    itemCount++;
    removed.id = 'item-' + (itemCount - 1);
  }

  // アイテムを挿入
  destClone.splice(droppableDestination.index, 0, removed);

  // 結果を作成して返却
  let result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(new Date()),
      finishDate: moment(new Date()).add(33, 'h'),
      interval: 30,
      ItemStatus: {
        real: [{ id: '', name: '', procTime: 0, with: 0 }],
        esti: [
          [{ name: '', procTime: 0, with: 0 }]
        ]
      },
      itemlist: {
        order: getItems(30),
        rjbChain: getItems(5, 30),
        pjbChain0: getItems(2, 35),
        pjbChain1: getItems(3, 37),
        pjbChain2: getItems(5, 40),
      },
    };

    this.createData = this.createData.bind(this);

  }

  createData(date, time, jobchain) {
    return { date, time, jobchain };
  };

  getList = id => this.state[this.id2List[id]];
  onDragEnd = result => {
    const { source, destination } = result;

    // 移動範囲外の場合はそのまま返す
    if (!destination) {
      return;
    }

    let state = JSON.parse(JSON.stringify(this.state.itemlist));
    if (source.droppableId === destination.droppableId) {
      // 同じ場所へ移動する場合の操作
      state[source.droppableId] = reorder(
        state[source.droppableId],
        source.index,
        destination.index
      );
    } else {

      // 移動(コピー)してはいけない場所はそのまま返す
      if (destination.droppableId === 'order' || destination.droppableId === 'rjbChain') {
        return;
      }

      // 別の場所へ移動(コピー)できない
      if(source.droppableId === 'rjbChain'){
        return;
      }

      // 別の場所へ移動(コピー)する場合の操作
      let result = move(
        state[source.droppableId],
        state[destination.droppableId],
        source,
        destination,
        source.droppableId === 'order',
      );

      // 変更後の値をセット
      state[source.droppableId] = result[source.droppableId];
      state[destination.droppableId] = result[destination.droppableId];

    }

    this.setState({
      itemlist: state
    });

  };


  render() {

    // 比較対象のチェーン
    const rows1 = [
      this.createData(
        this.state.finishDate.format('YYYY/MM/DD '), this.state.finishDate.format('HH:mm'), 
        <ItemChain droppableId={'rjbChain'} items={this.state.itemlist.rjbChain} />
      ),
    ];

    // 予測されたチェーン(とりあえず手打ち)
    const rows2 = [
      this.createData(
        this.state.startDate.format('YYYY/MM/DD '), this.state.startDate.format('HH:mm'), 
        <ItemChain droppableId={'pjbChain0'} items={this.state.itemlist.pjbChain0} />
      ),
      this.createData(
        '', this.state.startDate.add(30, 'm').format('HH:mm'), 
        <ItemChain droppableId={'pjbChain1'} items={this.state.itemlist.pjbChain1} />
      ),
      this.createData(
        '', this.state.startDate.add(30, 'm').format('HH:mm'), 
        <ItemChain droppableId={'pjbChain2'} items={this.state.itemlist.pjbChain2} />
      ),
    ];

    return (
      <div className='main'>
        <MenuBar />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className='joblist'>
            <ItemList droppableId={'order'} items={this.state.itemlist.order} />
          </div>
          <div className='chainList'>
            <div>■実際のチェーン</div>
            <CustomizedTables head={{ bgcolor: 'gold' }} rows={rows1} idpre='ano' />
            <br /><br />
            <div>■時間帯別予測のチェーン</div>
            <CustomizedTables head={{ bgcolor: 'palegreen' }} rows={rows2} idpre='yos' />
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export default Main;
