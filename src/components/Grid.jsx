import { useState, useRef, useCallback, useEffect } from "react";
import { FiPause, FiPlay, FiXCircle, FiRefreshCcw } from "react-icons/fi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import useInterval from "../hooks/useInterval";
import Cell from "./Cell";
import { randomBoard, emptyBoard } from "./utils";

const SIMUL_BASE_SPEED = 600;
const SUMIL_STEP_SPEED = 100;

const Board = styled.div`
    display: grid;
    width: 85%;
    margin: 0 auto;
`;

const Grid = () => {
    const [cols, setCols] = useState(0);
    const [rows, setRows] = useState(33);
    const [grid, setGrid] = useState([]);
    const [speed, setSpeed] = useState(2);
    const [running, setRunning] = useState(false);
    const [dragged, setDragged] = useState(false);

    const runningRef = useRef(running);
    runningRef.current = running;

    const updateBoardDimensions = () => {
        setCols(Math.floor((window.innerWidth * 0.85) / 20));
        setRows(Math.floor((window.innerHeight * 0.65) / 20));
    };

    useEffect(() => {
        updateBoardDimensions();
        window.addEventListener("resize", updateBoardDimensions, false);
    }, []);

    useEffect(() => setGrid(randomBoard(rows, cols)), [cols, rows]);

    const runSimulation = useCallback((grid) => {
        if (!runningRef.current) {
            return;
        }
        const positions = [
            [0, 1],
            [0, -1],
            [1, -1],
            [-1, 1],
            [1, 1],
            [-1, -1],
            [1, 0],
            [-1, 0],
        ];

        let numRows = grid.length;
        let numCols = grid[0].length;

        let gridCopy = JSON.parse(JSON.stringify(grid));
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                let neighbors = 0;

                positions.forEach(([x, y]) => {
                    const newI = i + x;
                    const newJ = j + y;

                    if (
                        newI >= 0 &&
                        newI < numRows &&
                        newJ >= 0 &&
                        newJ < numCols
                    ) {
                        neighbors += grid[newI][newJ];
                    }
                });

                if (neighbors < 2 || neighbors > 3) {
                    gridCopy[i][j] = 0;
                } else if (grid[i][j] === 0 && neighbors === 3) {
                    gridCopy[i][j] = 1;
                }
            }
        }
        setGrid(gridCopy);
    }, []);

    const handleCellClick = (i, j) => {
        let newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[i][j] = grid[i][j] ? 0 : 1;
        setGrid(newGrid);
    };

    useInterval(() => {
        runSimulation(grid);
    }, SIMUL_BASE_SPEED - SUMIL_STEP_SPEED * speed);

    return (
        <>
            <Board
                onMouseDown={(e) => setDragged(true)}
                onMouseUp={(e) => setDragged(false)}
                onMouseLeave={(e) => setDragged(false)}
                className="board"
                style={{
                    gridTemplateColumns: `repeat(${cols}, 20px)`,
                }}
            >
                {grid.map((rows, i) =>
                    rows.map((col, j) => (
                        <Cell
                            key={`${i}-${j}`}
                            {...{
                                i,
                                j,
                                isAlive: grid[i][j],
                                dragged,
                                handleCellClick,
                            }}
                        />
                    ))
                )}
            </Board>
            <div className="buttons pt-5">
                <Button
                    variant="secondary"
                    className="button mx-2"
                    onClick={() => setRunning(!running)}
                >
                    {running ? <FiPause /> : <FiPlay />}{" "}
                    {running ? "Stop" : "Start"}
                </Button>
                <Button
                    variant="secondary"
                    className="button mx-2"
                    onClick={() => {
                        setGrid(emptyBoard(rows, cols));
                        setRunning(false);
                    }}
                >
                    <FiXCircle /> Clear
                </Button>
                <Button
                    variant="secondary"
                    className="button mx-2"
                    onClick={() => {
                        setGrid(randomBoard(rows, cols));
                        setRunning(false);
                    }}
                >
                    <FiRefreshCcw /> Random
                </Button>
            </div>
            <Form.Range
                className="mt-2"
                style={{ width: "20%" }}
                min={0}
                max={4}
                step={1}
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
            />
        </>
    );
};

export default Grid;
