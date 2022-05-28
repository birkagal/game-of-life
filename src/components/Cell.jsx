const COLOR_ALIVE = "#cacaca";
const COLOR_DEAD = "#000000";

const Cell = (props) => {
    const { i, j, isAlive, dragged, handleCellClick } = props;
    return (
        <div
            className="cell"
            onClick={(e) => handleCellClick(i, j)}
            onMouseEnter={(e) => dragged && handleCellClick(i, j)}
            style={{
                backgroundColor: isAlive ? COLOR_ALIVE : COLOR_DEAD,
            }}
        />
    );
};

export default Cell;
