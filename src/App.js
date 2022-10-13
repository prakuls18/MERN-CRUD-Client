import './App.css';
import {useState, useEffect} from 'react'
import Axios from 'axios'

function App() {

  const [foodName, setFoodName] = useState('');
  const [amount, setAmount] = useState(0)
  const [newFoodNumber, setNewFoodNumber] = useState(0);
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get("https://mern-crud-grocery-list.herokuapp.com/read").then((response) =>  {
      setFoodList(response.data)
    });
  }, []);

  const addToList = () => {
    Axios.post("https://mern-crud-grocery-list.herokuapp.com/insert", 
    {
      foodName: foodName, 
      amount: amount
    })
  };

  const updateFoodNumber = (id) => {
    Axios.put("https://mern-crud-grocery-list.herokuapp.com/update",
    {
      id: id,
      newFoodNumber: newFoodNumber
    }).then(() => {
      setFoodList(foodList.map((val) => {
        return val._id === id
        ? {_id: id, foodName: val.foodName, amount: newFoodNumber} 
        : val;
      }))
    })
}

  const deleteFood = (id) => {
    Axios.delete(`https://mern-crud-grocery-list.herokuapp.com/delete/${id}`).then(() => {
      setFoodList(foodList.filter((val) => {
        return val._id !== id;
      }))
    })
  }

  return (
    <div className="App">
      <h1 id='title'>
        CRUD App with MERN Stack
      </h1>
      <h2 id='description'>
        Description: <br />
        Hi everyone! This is a basic CRUD application that uses the MERN (MongoDB, Express, React, and Node) stack to 
        keep track of your groceries' information. It allows you to create, read, update, and delete whatever information you want (hence, CRUD)!
      </h2> 
        <div className="inputarea">
        <label id='foodname'>Food Name:</label>
        <input type="text" onChange={(event) => {setFoodName(event.target.value)}}/>
        <label id='amountneeded'>Amount Needed:</label>
        <input type="number" onChange={(event) => {setAmount(event.target.value)}}/>
        <button id='addButton' onClick={addToList}><span>Add To List</span></button>
        <h1>Food List:</h1>
        {foodList.map((val, key) => {
          return (
          <div className='dataContainer'>
            <div className='foodList' key={key}> 
              <h1 id='groceryList'> 
                {val.foodName}: {val.amount} 
              </h1>
              <div className='buttonContainer'>
                <input type="number" id='numberInput' placeholder = "Update number of items here!" onChange={(event) => {setNewFoodNumber(event.target.value)}}></input>
                <button id='change' onClick={() => updateFoodNumber(val._id)}><span>Update!</span></button>
                <button id='delete' onClick={() => deleteFood(val._id)}><span>Delete!</span></button>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
