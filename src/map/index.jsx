import {Cell} from "./cell/index.jsx";

export const Map = ({ hero, map, x, y }) => {
    return (
        <div className="grid">
            {map.flatMap((row, rowIndex) =>
                row.map((type, cellIndex) => (
                    <Cell type={type} cellIndex={cellIndex} rowIndex={rowIndex} hero={hero} x={x} y={y}/>
                ))
            )}
        </div>
    )
}
