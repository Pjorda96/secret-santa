import { useState } from 'react';
import './App.css';

const defaultUser = { name: '', email: '' };

function App() {
  const [list, setList] = useState([{...defaultUser, id: 0}]);
  const [error, setError] = useState(false);
  const [ok, setok] = useState(false);

  function handleChange(key, value, i) {
    const newList = [...list];
    newList[i][key] = value;

    setList(newList)
    setError(false);
  }

  function handleAdd() {
    setList([...list, {...defaultUser, id: list.length}])
  }

  function checkEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function shuffle(){
    const listCopy = [...list];
    const result = [];

    while (result.length < list.length) {
      const id = Math.floor(Math.random() * listCopy.length);

      if (listCopy[id].id !== result.length) {
        result.push(listCopy.splice(id, 1)[0]);
      } else if (listCopy.length === 1) { // only when last is the same
        // swap two at the end
        result.push(result[result.length - 1]);
        result[result.length - 2] = listCopy.splice(id, 1)[0];
      }
    }

    // TODO: call api and ok
  }

  function handleSubmit() {
    const err = list.some(el => !el.name || !el.email || !checkEmail(el.email));
    setError(err)
    err || shuffle();
  }

  return (
    <div className="App">
      {
        list.map((user, i) => (
          <div key={i} className="card">
            <input
              type="text"
              defaultValue={user.name}
              placeholder="Name"
              onChange={e => handleChange('name', e.target.value, i)}
            />
            <input
              type="email"
              defaultValue={user.email}
              placeholder="Email"
              onChange={e => handleChange('email', e.target.value, i)}
            />
          </div>
        ))
      }

      <button type="button" onClick={handleAdd}>
        Add
      </button>

      <button type="button" onClick={handleSubmit}>
        Send
      </button>

      {
        error && <span>Errooooooooooor</span>
      }
      {
        ok && <span>Oooook</span>
      }
    </div>
  );
}

export default App;
