import {cellClassGetter} from "../../helpers/cellClassGetter.js";

export const Cell = ({
 rowIndex, cellIndex, type, hero, x, y
}) => {
    return (
        <div
            className={cellClassGetter(type)}
            key={`cell-${rowIndex}-${cellIndex}`}
        >
            {type === 3 && <span className="start">{x === cellIndex && y === rowIndex ? hero : ""}</span>}
            {type === 1 && <span className="path">{x === cellIndex && y === rowIndex ? hero : ""}</span>}
            {type === 4 && <span className="end">🏁</span>}
        </div>
    )
}
