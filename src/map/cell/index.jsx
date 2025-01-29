import {cellClassGetter} from "../../helpers/cellClassGetter.js";

export const Cell = ({
 rowIndex, cellIndex, type, hero
}) => {
    return (
        <div
            className={cellClassGetter(type)}
            key={`cell-${rowIndex}-${cellIndex}`}
        >
            {type === 3 && <span className="player">{hero}</span>}
            {type === 4 && <span className="end">🏁</span>}
        </div>
    )
}
