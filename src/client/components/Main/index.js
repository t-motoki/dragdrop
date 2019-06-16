import React, { Component } from 'react';
import moment from 'moment';
import { SnackbarProvider } from 'notistack';

import MenuBar from '../MenuBar';
import ItemChain from '../ItemChain';
import MovingArea from '../MovingArea';

import './style.scss';

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`
  }));

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
        count: 45,
        order: getItems(30),
        rjbChain: getItems(5, 30),
        pjbChain0: getItems(2, 35),
        pjbChain1: getItems(3, 37),
        pjbChain2: getItems(5, 40),
      },
    };
  }

  createData = (date, time, jobchain) => {
    return { date, time, jobchain };
  };

  // 子コンポーネントに更新してもらう
  onDragEnd = state => {
    this.setState({
      itemlist: state
    });
  }

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
        <SnackbarProvider maxSnack={1} autoHideDuration={2000}
          anchorOrigin={{vertical: 'top', horizontal: 'right',}}
        >
          <MovingArea rows1={rows1} rows2={rows2} itemlist={this.state.itemlist} onDragEnd={this.onDragEnd}/>
        </SnackbarProvider>
      </div>
    );
  }
}

export default Main;
