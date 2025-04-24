export default class DisjointSet {
    parent: number[][];
    rank: number[][];
    directions: string[][][];
    adjacents  = [
        [-1, 0], [1, 0], [0, -1], [0, 1], [-1, 1], [1, -1]
    ];

    constructor(size: number) {
        this.parent = Array.from({ length: size }, (_, row) =>
            Array.from({ length: size }, (_, col) => row * size + col)
        );
        this.rank = Array.from({ length: size }, () =>
            Array(size).fill(1)
        );

        this.directions = Array(size).fill(null).map((_, row) =>
            Array(size).fill(null).map((_, col) => {
                const cellDirections: string[] = [];
                if (row === 0) cellDirections.push('up');
                if (row === size - 1) cellDirections.push('down');
                if (col === 0) cellDirections.push('left');
                if (col === size - 1) cellDirections.push('right');
                return cellDirections;
            })
        );
    }

    find(row: number, col: number): number {
        const id = this.parent[row][col];
        const parentRow = Math.floor(id / this.parent.length);
        const parentCol = id % this.parent.length;

        if (id !== this.parent[parentRow][parentCol]) {
            const rootId = this.find(parentRow, parentCol);
            this.parent[row][col] = rootId;
        }
        return this.parent[row][col];
    }


    union(row1: number, col1: number, row2: number, col2: number): void {
        const root1 = this.find(row1, col1);
        const root2 = this.find(row2, col2);


        if (root1 !== root2) {
            const root1Row = Math.floor(root1 / this.parent.length);
            const root1Col = root1 % this.parent.length;
            const root2Row = Math.floor(root2 / this.parent.length);
            const root2Col = root2 % this.parent.length;

            if (this.rank[root1Row][root1Col] > this.rank[root2Row][root2Col]) {
                this.parent[root2Row][root2Col] = root1;
                this.directions[root1Row][root1Col] = Array.from(
                    new Set([...this.directions[root1Row][root1Col], ...this.directions[root2Row][root2Col]])
                );
            } else if (this.rank[root1Row][root1Col] < this.rank[root2Row][root2Col]) {
                this.parent[root1Row][root1Col] = root2;
                this.directions[root2Row][root2Col] = Array.from(
                    new Set([...this.directions[root1Row][root1Col], ...this.directions[root2Row][root2Col]])
                );
            } else {
                this.parent[root2Row][root2Col] = root1;
                this.rank[root1Row][root1Col]++;
                this.directions[root1Row][root1Col] = Array.from(
                    new Set([...this.directions[root1Row][root1Col], ...this.directions[root2Row][root2Col]])
                );
            }



        }
    }
}