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

  let unit = 'ms';
  if(String(divisionTime).length > 4){
    unit = 's';
    remainder += (divisionTime % 1000) * divisionNum;
    divisionTime = Math.floor(divisionTime / 1000);
    remainder = Math.floor(remainder / 1000);
  }


  let total = 0;
  let data = [];
  for (let i = 0; i < divisionNum; i++) {
    total += divisionTime;
    if (i === divisionNum - 1) {
      total += remainder;
    }
    data.push(total+unit);
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
