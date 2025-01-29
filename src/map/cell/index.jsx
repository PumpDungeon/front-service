import { cellClassGetter } from "../../helpers/cellClassGetter.js";

const HeroImage = ({ hero }) => (
    hero === "akhy_remy" ? (
        <img src="/akhy_remy.png" alt="Akhy Remy" className="map-hero-image" />
    ) : (
        hero
    )
);

const CellContent = ({ hero, x, y, cellIndex, rowIndex }) => {
    if (x === cellIndex && y === rowIndex) {
        return <HeroImage hero={hero} />;
    }
    return null;
};

export const Cell = ({ rowIndex, cellIndex, type, hero, x, y }) => {
    return (
        <div className={cellClassGetter(type)} key={`cell-${rowIndex}-${cellIndex}`}>
            {type === 3 && <span className="start"><CellContent {...{ hero, x, y, cellIndex, rowIndex }} /></span>}
            {type === 1 && <span className="path"><CellContent {...{ hero, x, y, cellIndex, rowIndex }} /></span>}
            {type === 4 && <span className="end">🏁</span>}
        </div>
    );
};