import React, { Component } from 'react';
import moment from 'moment';

import CustomizedTables from '../CustomizedTables';

import './style.scss';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(new Date()),
      finishDate: moment(new Date()).add(5,'h'),
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
      this.createData(this.state.finishDate.format('YYYY/MM/DD '), this.state.startDate.format('kk:mm'), ''),
    ];

    const rows2 = [
      this.createData(this.state.startDate.format('YYYY/MM/DD '), this.state.startDate.format('kk:mm'), ''),
      this.createData('', this.state.startDate.add(30,'m').format('kk:mm'), ''),
      this.createData('', this.state.startDate.add(30,'m').format('kk:mm'), ''),
      this.createData('', this.state.startDate.add(30,'m').format('kk:mm'), ''),
      this.createData('', this.state.startDate.add(30,'m').format('kk:mm'), ''),
    ];
  
    return (
      <div className='main'>
        <div className='joblist'>
        </div>
        <div className='chainList'>
          <CustomizedTables head={{bgcolor:'#f6b764'}} rows={rows1} idpre='ano'/>
          <CustomizedTables head={{bgcolor:'#55ee8a'}} rows={rows2} idpre='yos'/>
        </div>
      </div>
    );
  }
}

export default Main;
