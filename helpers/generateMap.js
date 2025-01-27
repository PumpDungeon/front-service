/**
 * Run with:
 *   node dungeonHelper.js
 *
 * This will print a 10x10 grid (array of arrays) to the console,
 * with the following legend:
 *   2 = wall
 *   1 = corridor/path
 *   3 = start
 *   4 = end
 */

function generateMap() {
    const rows = 10;
    const cols = 10;

    // 1) Create a 10x10 grid of walls (2)
    let grid = Array.from({ length: rows }, () => Array(cols).fill(2));

    // Helper to check bounds
    function inBounds(r, c) {
        return r >= 0 && r < rows && c >= 0 && c < cols;
    }

    // 2) Carve out a perfect maze using DFS
    // We'll only carve "odd" cells for a classic maze structure.
    // Start from a random odd row, odd col
    let startRow = getRandomOdd(rows);
    let startCol = getRandomOdd(cols);
    grid[startRow][startCol] = 1; // mark as corridor

    let stack = [];
    stack.push([startRow, startCol]);

    while (stack.length > 0) {
        let [r, c] = stack[stack.length - 1]; // peek top

        // Find all possible neighbors (2 cells away in up/down/left/right)
        let neighbors = [];
        const directions = [
            [-2, 0],
            [2, 0],
            [0, -2],
            [0, 2]
        ];
        for (let [dr, dc] of directions) {
            let nr = r + dr;
            let nc = c + dc;
            if (inBounds(nr, nc) && grid[nr][nc] === 2) {
                neighbors.push([nr, nc]);
            }
        }

        if (neighbors.length > 0) {
            // Choose a random neighbor
            let [nr, nc] = neighbors[Math.floor(Math.random() * neighbors.length)];

            // Carve the corridor between (r,c) and (nr,nc)
            grid[nr][nc] = 1;

            // Also carve the wall in between
            let midR = (r + nr) / 2;
            let midC = (c + nc) / 2;
            grid[midR][midC] = 1;

            // Push neighbor to stack
            stack.push([nr, nc]);
        } else {
            // No carveable neighbors, backtrack
            stack.pop();
        }
    }

    // 3) Place start (3) and end (4) using BFS to find farthest cells
    //    a) find a random corridor cell (1) => call BFS => get farthest => that is start
    //    b) BFS again from start => farthest => that is end

    let corridorCells = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                corridorCells.push([r, c]);
            }
        }
    }

    if (corridorCells.length < 2) {
        // Edge case: if something went wrong and there's no corridor,
        // we just return the all-wall grid.
        return grid;
    }

    // pick a random corridor cell
    let [randR, randC] = corridorCells[Math.floor(Math.random() * corridorCells.length)];
    let farthest1 = bfsFarthest(randR, randC, grid);
    // Mark that as start (3)
    let [sr, sc] = farthest1;
    grid[sr][sc] = 3;

    // from the start, find the farthest cell -> end
    let farthest2 = bfsFarthest(sr, sc, grid);
    let [er, ec] = farthest2;
    grid[er][ec] = 4;

    return grid;


    // ---- Helper functions below ----

    function getRandomOdd(limit) {
        // Return a random odd number in [1..limit-2] if possible
        // ensure at least 1 and limit-2 are valid
        let possibleOdds = [];
        for (let i = 1; i < limit; i += 2) {
            possibleOdds.push(i);
        }
        return possibleOdds[Math.floor(Math.random() * possibleOdds.length)];
    }

    /**
     * BFS to find the farthest corridor cell from (startRow, startCol).
     * Returns [row, col] of the farthest cell found.
     */
    function bfsFarthest(startRow, startCol, grid) {
        let visited = Array.from({ length: rows }, () => Array(cols).fill(false));
        let queue = [];
        queue.push([startRow, startCol, 0]); // [row, col, dist]
        visited[startRow][startCol] = true;

        let farthestCell = [startRow, startCol];
        let maxDist = 0;

        while (queue.length > 0) {
            let [r, c, dist] = queue.shift();
            if (dist > maxDist) {
                maxDist = dist;
                farthestCell = [r, c];
            }
            // check neighbors
            const deltas = [
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1]
            ];
            for (let [dr, dc] of deltas) {
                let nr = r + dr;
                let nc = c + dc;
                if (inBounds(nr, nc) && !visited[nr][nc] && grid[nr][nc] === 1) {
                    visited[nr][nc] = true;
                    queue.push([nr, nc, dist + 1]);
                }
            }
        }

        return farthestCell;
    }
}

module.exports = { generateMap };
