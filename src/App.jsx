import './App.css'
import {Map} from "./map.jsx";
import {useState} from "react";

function App() {
    const [map, setMap] = useState([]);
    const [player, setPlayer] = useState({});
    const [hero, setHero] = useState("🐐");
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [ isListening , setIsListening ] = useState(false);

    const fetchMap = async () => {
        const response = await fetch( '/api/dungeon/generate',
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
        const response = await fetch('/api/player/setPlayer',
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
                    gold: 100
                })
            }
        );
        const data = await response.json();
        setPlayer(data.player);
    }

    const movePlayer = async () => {
        const response = await fetch('/api/dungeon/move',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    position: { x, y },
                    map
                })
            }
        );
        const data = await response.json();
        console.log("movePlayer : ",data);
    }

    const setFight = async () => {
        const response = await fetch('/api/fight/setFight',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    player
                })
            }
        );
        const data = await response.json();
    }

    const updatePlayer = async () => {
        const ws = new WebSocket('ws://localhost:3002');
        ws.onmessage = (event) => {
            const playerData = JSON.parse(event.data);
            setPlayer(playerData);
        };
        return () => ws.close();
    }

    return (
        <Map />
    )
}

export default App
