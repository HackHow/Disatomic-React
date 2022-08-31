import React from 'react';
import Item from './Item';

// const arr = [1, 2, 3]

function List({ listData, deleteData }) {
  return (
    <div className="list">
      {listData.map((item) => {
        const { id, note, date, time } = item;
        return (
          <Item
            key={id}
            id={id}
            note={note}
            date={date}
            time={time}
            deleteData={deleteData}
          />
        );
      })}
    </div>
  );
}

export default List;
