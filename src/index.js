import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import stats from './data.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const TableRow = (props) => {
  const cells = (props.isHead == "0")
    ? props.row.map((item, index) => <td key={index}> {item} </td>)
    : props.row.map((item, index) => <th key={index}> {item} </th>);

  return(
    <>
      {cells}
    </>  
  )
}

const TableHead = (props) => {
  return(
    <thead>
      <tr>
        <TableRow row={props.head} isHead ="1"/>
      </tr>
    </thead>
  )
}

const TableBody = (props) => {

  const begRange= (props.numPage - 1) * props.amountRows;
  const endRange= begRange + Number(props.amountRows);

  const tbody = props.body.map((item, index) =>
    <tr key={index} className={
      (index >= begRange && index < endRange) ? "show" : "hide"
    }>
      <TableRow row = {Object.values(item)} isHead = "0"/>
    </tr>
  )
  return(
    <tbody>
      {tbody}
    </tbody>
  )
}

const Table = (props) => {
  const n = Math.ceil(props.data.length/props.amountRows);

  const [activePage, setActivePage] = React.useState("1");

  const changeActive = (event) => {
    setActivePage(event.target.innerHTML);
  }

  const arr = Array.from({length: n}, (v, i)=> i+1);
  const pages = arr.map((item, index) =>
    <span
      className={activePage == item ? "active" : ""}
      onMouseEnter={(e) => e.target.classList.add("hover")}
      onMouseLeave={(e) => e.target.classList.remove("hover")}
      onClick={changeActive}
    >
      {item}
    </span>
  );

  return (
    <>
      <table>
        <TableHead head={Object.keys(props.data[0])}/>
        <TableBody body={props.data} amountRows={props.amountRows} numPage={activePage}/>
      </table>
      <div>
        {props.activePag && pages}
      </div>
    </>
  )
}

function Content() {
return(
    <>
      <h3>Топ 50 игроков в КС2</h3>
      <Table data={ stats } amountRows = "10" activePag = {true}/>
    </>
  )
}
root.render(<Content />)


