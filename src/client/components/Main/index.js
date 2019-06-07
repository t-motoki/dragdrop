import React, { Component } from 'react';
import moment from 'moment';

import CustomizedTables from '../CustomizedTables';
import MenuBar from '../MenuBar';
import ItemList from '../ItemList';
import ItemChain from '../ItemChain';

import './style.scss';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(new Date()),
      finishDate: moment(new Date()).add(33,'h'),
      interval: 30,
    };

    this.createData = this.createData.bind(this);

  }

  createData(date, time, jobchain) {
    return { date, time, jobchain };
  };
  
  render() {
    // const maxJobTime = 5000;
    // const divisionNum = 10;

    // let TimeLine = [];

    const rows1 = [
      this.createData(this.state.finishDate.format('YYYY/MM/DD '), this.state.finishDate.format('kk:mm'), <ItemChain/>),
    ];

    const rows2 = [
      this.createData(this.state.startDate.format('YYYY/MM/DD '), this.state.startDate.format('kk:mm'), <ItemChain/>),
      this.createData('', this.state.startDate.add(30,'m').format('kk:mm'), <ItemChain/>),
      this.createData('', this.state.startDate.add(30,'m').format('kk:mm'), <ItemChain/>),
      this.createData('', this.state.startDate.add(30,'m').format('kk:mm'), <ItemChain/>),
      this.createData('', this.state.startDate.add(30,'m').format('kk:mm'), <ItemChain/>),
    ];
  
    return (
      <div className='main'>
        <MenuBar />
        <div className='joblist'>
          <ItemList />
        </div>
        <div className='chainList'>
          <div>■実際のチェーン</div>
          <CustomizedTables head={{bgcolor:'#f8bc23'}} rows={rows1} idpre='ano'/>
          <div>■時間帯別予測のチェーン</div>
          <CustomizedTables head={{bgcolor:'#19da7c'}} rows={rows2} idpre='yos'/>
        </div>
      </div>
    );
  }
}

export default Main;
