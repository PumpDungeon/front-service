import {useEffect, useState} from "react";

export const Map = () => {

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

    const handleKeyDown =  async (event) => {
        if (event.key === 'ArrowUp') {
            setY(y - 1);
            await movePlayer();
        }
        if (event.key === 'ArrowDown') {
            setY(y + 1);
            await movePlayer();
        }
        if (event.key === 'ArrowLeft') {
            setX(x - 1);
            await movePlayer();
        }
        if (event.key === 'ArrowRight') {
            setX(x + 1);
            await movePlayer();
        }
    };

    const initListener = () => {
        document.addEventListener('keydown', handleKeyDown);
        setIsListening(true);
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

        setTimeout(() => {
            console.log("newPosition : ", x, y);
        });
    }, [map]);

    useEffect( () => {
        fetchMap();
        createPlayer();
        updatePlayer();

        if(!isListening){
            initListener();
        }
    }, []);

    const getCellClass = (value) => {
        switch (value) {
            case 1:
                return 'cell path';
            case 2:
                return 'cell wall';
            case 3:
                return 'cell start';
            case 4:
                return 'cell end';
            default:
                return 'cell';
        }
    };

    return (
        <>
            <div className="player-info">
                <label>❤️ Pv : {player.pv}</label>
                <label>🪙 Gold : {player.gold}</label>
            </div>
            <div className="grid">
                {map.flatMap((row, rowIndex) =>
                    row.map((cell, cellIndex) => (
                        <div
                            className={getCellClass(cell)}
                            key={`cell-${rowIndex}-${cellIndex}`}
                        >
                            {cell === 3 && <span className="player">{hero}</span>}
                            {cell === 4 && <span className="end">🏁</span>}
                        </div>
                    ))
                )}
            </div>
            <div className="hero-select">
                  <span onClick={() => setHero("🐐")}
                        className={hero === "🐐" ? "hero-icon selected-hero" : "hero-icon"}>🐐</span>
                <span onClick={() => setHero("🦽")}
                      className={hero === "🦽" ? "hero-icon selected-hero" : "hero-icon"}>🦽</span>
                <span onClick={() => setHero("🏎️")}
                      className={hero === "🏎️" ? "hero-icon selected-hero" : "hero-icon"}>🏎️</span>
                <span onClick={() => setHero("🐀")}
                      className={hero === "🐀" ? "hero-icon selected-hero" : "hero-icon"}>🐀</span>
            </div>
        </>
    )
}