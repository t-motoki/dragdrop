import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSnackbar } from 'notistack';

import ItemList from '../ItemList';
import CustomizedTables from '../CustomizedTables';

import TrashBox from '../TrashBox';

export default (Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const deleteItem = (list, startIndex) => {
    const result = Array.from(list);
    result.splice(startIndex, 1);
    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination, copy = false) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    // コピーフラグが有効の場合は移動せずにコピーする
    // const [removed] = sourceClone.splice(droppableSource.index, 1);
    const [removed] = copy
      ? JSON.parse(JSON.stringify(sourceClone.slice(droppableSource.index, droppableSource.index + 1)))
      : sourceClone.splice(droppableSource.index, 1);

    if (copy) {
      // コピーの場合はアイテムのIDを追加する
      removed.id = 'item-' + Props.itemlist.count;
      Props.itemlist.count++;
    }

    // アイテムを挿入
    destClone.splice(droppableDestination.index, 0, removed);

    // 結果を作成して返却
    let result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const onDragEnd = result => {
    const { source, destination } = result;

    // 移動範囲外の場合はそのまま返す
    if (!destination) {
      return;
    }

    let state = JSON.parse(JSON.stringify(Props.itemlist));
    if (source.droppableId === destination.droppableId) {
      // 同じ場所へ移動する場合の操作
      state[source.droppableId] = reorder(
        state[source.droppableId],
        source.index,
        destination.index
      );

    } else if (destination.droppableId === 'trashBox') {

      if(source.droppableId !== 'order'){
        // 削除
        state[source.droppableId] = deleteItem(
          state[source.droppableId],
          source.index
        );
        enqueueSnackbar(`削除しました。`);
      }else{
        enqueueSnackbar('これは削除できません。', { variant: 'error' });
        return;
      }

    } else {
      // 移動(コピー)してはいけない場所はそのまま返す
      if (destination.droppableId === 'order' || destination.droppableId === 'rjbChain') {
        if(source.droppableId !== 'order'){
          enqueueSnackbar('ここに移動はできません。', { variant: 'error' });
          return;
        }
      }
      // 別の場所へ移動(コピー)できない
      if (source.droppableId === 'rjbChain') {
        enqueueSnackbar('ここからは、別の場所へ移動することができません。', { variant: 'error' });
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
    state.count = Props.itemlist.count;
    Props.onDragEnd(state);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='joblist'>
        <ItemList droppableId={'order'} items={Props.itemlist.order} />
      </div>
      <div className='chainList'>
        <TrashBox droppableId={'trashBox'} />
        <div>■実際のチェーン</div>
        <CustomizedTables head={{ bgcolor: 'gold' }} rows={Props.rows1} idpre='ano' />
        <br /><br />
        <div>■時間帯別予測のチェーン</div>
        <CustomizedTables head={{ bgcolor: 'palegreen' }} rows={Props.rows2} idpre='yos' />
      </div>
    </DragDropContext>
  );
}
