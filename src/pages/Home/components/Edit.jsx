import { React, useState } from 'react';
import { v4 } from 'uuid';

function Edit({ add }) {
  const [note, setNote] = useState('');
  function noteChange(e) {
    setNote(e.target.value);
  }

  const [date, setDate] = useState('');
  function dateChange(e) {
    setDate(e.target.value);
  }

  const [time, setTime] = useState('');
  function timeChange(e) {
    setTime(e.target.value);
  }

  function addItem() {
    add(function (prevData) {
      return [...prevData, { id: v4(), note, date, time }];
    });
  }

  return (
    <div>
      <h1>備忘錄</h1>
      <p>記事：</p>
      <input type="text" value={note} onChange={noteChange} />
      <p>日期：</p>
      <input type="date" value={date} onChange={dateChange} />
      <p>時間：</p>
      <input type="time" value={time} onChange={timeChange} />
      <button onClick={addItem} className="add">
        新增
      </button>
    </div>
  );
}

export default Edit;
