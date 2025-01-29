export const InfoDisplay = ({ player }) => {
    return (
        <div className="player-info">
            <label>❤️ Pv : {player.pv}</label>
            <label>🪙 Gold : {player.gold}</label>
        </div>
    )
}
