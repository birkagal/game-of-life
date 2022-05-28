export const randomBoard = (numRows, numCols) => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        // returns a live cell 70% of the time
        rows.push(
            Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
        );
    }
    return rows;
};

export const emptyBoard = (numRows, numCols) => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
};
