import './App.css'
import {useEffect} from "react";
import React,{useState} from "react";

function App() {

    const [map, setMap] = useState([]);
    const [player, setPlayer] = useState({});
    const fetchMap = async () => {
        const response = await fetch( `http://localhost:3000/api/generate`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json();
        setMap(data.map);
    }

    const createPlayer = async () => {
        const response = await fetch( `http://localhost:3002/api/setPlayer`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pv: 100,
                    lvl: 1,
                    inventory: [
                        "item"
                    ],
                    gold: 100,
                    dps: 4
                })
            }
        );
        const data = await response.json();
        setPlayer(data.player);
    }

    const movePlayer = async () => {
        const response = await fetch( `http://localhost:3000/api/move`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    position: {"x": 1, "y": 2},
                    map
                })K
            }
        );
        const data = await response.json();
        console.log("movePlayer : ",data);
    }

    useEffect( () => {
        fetchMap();
        createPlayer();
    }, []);

    /*const handleClick = async () => {
        const response = await fetch(`http://localhost:3002/api/getPlayer`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json();
        console.log("data : ", data);
    }

     */

  return (
    <>
      <h1>Ma Page</h1>
        <button onClick={movePlayer}>Click Me</button>
    </>
  )
}

export default App
