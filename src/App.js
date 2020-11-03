import React, { useState } from "react";
import "./App.css";

export default function App() {

  const INIT_DATA = [0, 0, 0, 0, 0, 0, 0, 0, 0]

  const [data, setData] = useState(INIT_DATA);
  const [clickedTime, setClickedTime] = useState(INIT_DATA);

  const increaseActiveItems = (temp) => {
    temp.forEach((_item, _index) => {
      if (_item) {
        temp[_index] += 1;
      }
    });
  };

  const increaseLowerItems = (temp, value) => {
    temp.forEach((_item, _index) => {
      if (_item && _item < value) {
        temp[_index] += 1;
      }
    });
  };

  const onClickEvent = (item, index) => {
    const tempClickedTime = [...clickedTime];
    tempClickedTime[index] += 1;
    setClickedTime(tempClickedTime);

    const temp = [...data];

    if (item) {
      increaseLowerItems(temp, item);
      temp[index] = 1;
      setData(temp);
    } else {
      increaseActiveItems(temp);
      temp[index] = 1;
      setData(temp);
    }
  };

  const renderSlash = (number) => {
    let indicator = "";
    for (let i = 0; i < number; i++) {
      indicator = indicator.concat("/");
    }

    return indicator;
  };

  const resetAll = () => {
    setData(INIT_DATA)
    setClickedTime(INIT_DATA)
  }

  return (
    <>
    <div className="App">
      <div className="container">
        {data.map((item, index) => (
          <div className="item" key={index}>
            <button className="btn" onClick={() => onClickEvent(item, index)}>
              <h3>{item || "."}</h3>
              <br />
              <span>{renderSlash(clickedTime[index])}</span>
              <br />
              <code>{clickedTime[index] || "."}</code>
            </button>
          </div>
        ))}
      </div>

    </div>

    <div>
        <button onClick={resetAll}>Delete All</button>
    </div>

    <div className="tut">
      <h1>Lí do mà có cái thứ này. =))</h1>
      <p>
        Bảng này "nhớ" giúp các bạn trạng thái của các kết quả trước. Mỗi khi mảnh ghép xuất hiện hãy nhấn vào ô tương ứng trên bảng này để nó cập nhật và bạn hãy dựa theo kết quả cũ để mở game mới.
      </p>
      <p>
        Số ở trên là thời gian lần cuối xuất hiện mảnh ghép. Số bên dưới là số lần đã xuất hiện mảnh ghép (dấu / chỉ là indicator cho dễ nhìn).</p>
      <p>
        Dựa theo khả năng xuất hiện là như nhau giữa 9 ô, hãy chọn ưu tiên:
        <ul>
          <li>Các ô chưa từng mở ra mảnh ghép</li>
          <li>Các ô rất lâu chưa ra mảnh ghép (số to &gt; số nhỏ)</li>
          <li>Các ô rất ít xuất hiện mảnh ghép (số nhỏ &gt; số to)</li>
        </ul>
      </p>
    </div>
    </>
  );
}
