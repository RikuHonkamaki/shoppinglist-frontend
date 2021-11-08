import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

const URL = 'http://localhost/shoppinglist/';

function App() {
  const [tasks, setTasks] = useState([]);
  const [item, setItem] = useState('');

  useEffect(() => {
    axios.get(URL)
    .then((response) => {
      setTasks(response.data)
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    })
  }, [])

  return (
  <div className="container">
    <h2>Shopping list</h2>
    <form onSubmit={save}>
      <label>New item</label>
      <input value = {item} onChange={e => setItem(e.target.value)}/>
      <button>Save</button>
    </form>
    <ol>
      {tasks?.map(item => (
        <li key={item.id}>
          {item.description}&nbsp;
        <a href="#" className="delete" onClick={() => remove(item.id)}>
          Delete
        </a>
        </li>
      ))}
    </ol>
  </div>
  );

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item})
    axios.post(URL + 'add.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setTasks(tasks => [...tasks, response.data]);
      setItem('');
    }).catch (error => {
      alert(error.response.data.error)
    });
  }

  function remove (id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php',json,{
    headers: {
        'Content-type' : 'application/json'
      }
    })
    .then((response) => {
      const newListWithoutRemoved = tasks.filter((etem) => etem.id !== id);
      setTasks(newListWithoutRemoved);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    });
  }

}

export default App;
