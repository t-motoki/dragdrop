import React from 'react';
import './style.scss';

export default (Props) => {

  const maxJobTime = Props.maxJobTime;
  let divisionNum = 10;
  let divisionTime = 0;
  let remainder = 0;
  
  if(maxJobTime >= divisionNum){
    divisionTime = Math.floor(maxJobTime / divisionNum);
    remainder = maxJobTime % divisionNum;
  }else{
    divisionNum = 1;
    divisionTime = maxJobTime;
  }

  let total = 0;
  let data = [];
  for (let i = 0; i < divisionNum; i++) {
    total += divisionTime;
    if (i === divisionNum - 1) {
      total += remainder;
    }
    data.push(total+'ms');
  }

  return (
    <div className="dtable">
      {
        data.map((v, i) => {
          return (
            <div className="dtable_c" key={'key' + i}>
              {v}
            </div>
          );
        })
      }
    </div>
  );
}
