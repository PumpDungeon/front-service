import './App.css'
import {Map} from "./map/index.jsx";
import {useEffect, useState} from "react";
import {HeroSelect} from "./hero-select/index.jsx";
import {InfoDisplay} from "./info-display/index.jsx";

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
                    gold: 0
                })
            }
        );
        const data = await response.json();
        setPlayer(data.player);
    }

    const movePlayer = async (x,y) => {
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
        if(data.possible) {
            setX(data.position.x);
            setY(data.position.y);
            if(data.fight) {
                setFight();
            }
        }
        console.log("movePlayer : ",data);
    }

    const setFight = async () => {
        console.log('Fight !');
        const response = await fetch('/api/fight/fight',
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
            console.log('updatePlayer : ', playerData);
            setPlayer(playerData);
        };
        return () => ws.close();
    }

    const handleKeyUp = (e) => {
        console.log('keyup', x, y);
        switch (e.key) {
            case 'ArrowUp':
                movePlayer(x, y - 1);
                break;
            case 'ArrowDown':
                movePlayer(x, y + 1);
                break;
            case 'ArrowLeft':
                movePlayer(x - 1, y);
                break;
            case 'ArrowRight':
                movePlayer(x + 1, y);
                break;
        }
    }

    useEffect(() => {
        if (map.length === 0) return;
        const newPosition = map.reduce((acc, row, rowIndex) => {
            const colIndex = row.indexOf(3);
            if (colIndex !== -1) {
                acc = { x: colIndex, y: rowIndex };
            }
            return acc;
        }, { x: 0, y: 0 });

        setX(newPosition.x);
        setY(newPosition.y);
    },[map]);

    useEffect( () => {
        fetchMap();
        createPlayer();
        updatePlayer();
    }, []);

    useEffect(() => {
        document.addEventListener("keyup", handleKeyUp);

        return () => document.removeEventListener("keyup", handleKeyUp);
    });

    return (
        <div>
            {x} - {y};
            <InfoDisplay player={player}/>
            <Map hero={hero} map={map} x={x} y={y}/>
            <HeroSelect setHero={setHero} hero={hero} />
        </div>
    )
}

export default App
