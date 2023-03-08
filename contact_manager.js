import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

function AddPersonForm(props) {
  const [ person, setPerson ] = useState('');
    
  function handleChange(e) {
    setPerson(e.target.value);
  }
    
  function handleSubmit(e) {
    if(person !== '') {
      props.handleSubmit(person);
      setPerson('');
    }
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" 
        placeholder="Add new contact" 
        onChange={handleChange} 
        value={person} />
      <button type="submit">Add</button>
    </form>
  );
}

function PeopleList(props) {
  const arr = props.data;
  const listItems = arr.map((val, index) =>
    <li key={index}>{val}</li>
  );
  return <ul>{listItems}</ul>;
}

function ContactManager(props) {
  const [contacts, setContacts] = useState(props.data);

  function addPerson(name) {
    setContacts([...contacts, name]);
  }

  return (
    <div>
      <AddPersonForm handleSubmit={addPerson} />
      <PeopleList data={contacts} />
    </div>
  );
}
const contacts = ["James Smith", "Thomas Anderson", "Bruce Wayne"];

ReactDOM.render(
  <ContactManager data={contacts} />, 
  document.getElementById('root')
);


// Style.css
// h1, p {
//     font-family: Lato;
//   }
//   ul {
//     padding: 0;
//     margin:10px 0 0 0;
//   }
//   li {
//     list-style-type: none;
//     padding: 10px;
//     margin: 10px;
//     background-color:rgba(61, 120, 175, 0.411);
//     border-radius: 10px;
//   }
//   form {
//     margin: 10px;
//   }


// package.json
// {
//     "name": "react",
//     "version": "0.0.0",
//     "private": true,
//     "dependencies": {
//       "react": "^16.12.0",
//       "react-dom": "^16.12.0"
//     },
//     "scripts": {
//       "start": "react-scripts start",
//       "build": "react-scripts build",
//       "test": "react-scripts test --env=jsdom",
//       "eject": "react-scripts eject"
//     },
//     "devDependencies": {
//       "react-scripts": "latest"
//     }
//   }