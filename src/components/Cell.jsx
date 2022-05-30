import styled from "styled-components";

const COLOR_ALIVE = "#cacaca";
const COLOR_DEAD = "#000000";

const CellDiv = styled.div`
    width: 20px;
    height: 20px;
    border: 1px solid #181818;
`;

const Cell = (props) => {
    const { i, j, isAlive, dragged, handleCellClick } = props;
    return (
        <CellDiv
            onClick={(e) => handleCellClick(i, j)}
            onMouseEnter={(e) => dragged && handleCellClick(i, j)}
            style={{
                backgroundColor: isAlive ? COLOR_ALIVE : COLOR_DEAD,
            }}
        />
    );
};

export default Cell;
