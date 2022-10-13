import { resetWarningCache } from "prop-types/checkPropTypes";
import React, { useEffect, useState } from "react";

export function ToDoList() {
  const [list, setList] = useState([]);
  const [render, rerender] = useState(true);


function getList() {
fetch("https://assets.breatheco.de/apis/fake/todos/user/Ben")
.then(response => response.json())
.then((data) => setList(data))
.catch(error => console.log('error', error));
}

function putList() {
  if(list !=[]) {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/Ben", {
      method: "PUT",
      body:JSON.stringify(list),
      headers: {
        "Content-Type": "application/json",
      },
    })

    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}}
  
  useEffect(() => getList(), []);

  useEffect(() => putList(), [list]);

  const addToList = (item) => {
    const newList = [...list, {label: item, done: false}];
    setList(newList)
  }
  
  const deleteList = (x) => {
    const newList = [...list];
    newList.splice(x, 1);
    setList(newList);
  }

  function handleKeyPress(e) {
    var key = e.key;
    if (key == "Enter") {
      addToList(e.target.value)
      e.target.value = "";
      console.log(list);
      rerender(!render);
    } 
  }

  function removeHandler() {
    deleteList(setList);
    console.log(list);
    rerender(!render);
  }

  return (
    <div className="container">
      <h1><em>ToDos</em></h1>
      <input
        type="text"
        onKeyPress={handleKeyPress}
        placeholder="What needs to be done?"
      />
      <ul className="list">
        {list.map((item, idx) => {
          return (
            <li key={idx}>
              {item.label}&nbsp;&nbsp;
              <button onClick={()=>removeHandler(idx)}>
                <strong>X</strong>
              </button>
            </li>
          );
        })}
        <hr />
      </ul>
    </div>
  );
}