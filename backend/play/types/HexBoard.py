from collections import deque
from typing import Tuple, List



class HexBoard:
    def __init__(self, board: List[List[int]]):
        self.size = len(board)  # Tamaño N del tablero (NxN)
        self.board = board

    def clone(self) -> 'HexBoard':
        """Devuelve una copia del tablero."""
        new_board = HexBoard(self.size)
        new_board.board = [row[:] for row in self.board]

        return new_board

    def place_piece(self, row: int, col: int, player_id: int) -> bool:
        if self.board[row][col] == 0:
            self.board[row][col] = player_id
            return True
        return False

    def get_possible_moves(self) -> list:
        moves = []
        for i in range(self.size):
            for j in range(self.size):
                if self.board[i][j] == 0:
                    moves.append((i, j))
        return moves

    def check_connection(self, player_id: int) -> bool:
        def on_visit(x, y):
            nonlocal left, right, up, down
            if x == 0:
                up = True
            if x == self.size - 1:
                down = True
            if y == 0:
                left = True
            if y == self.size - 1:
                right = True

        for i in range(self.size):
            left = False
            right = False
            up = False
            down = False

            #checkear izquierda derecha
            if player_id == 1:
                if self.board[i][0] == 1:
                    self.bfs_same_player((i, 0), player_id, on_visit)
                    if left and right:
                        return True
            else:
                if self.board[0][i] == 2:
                    self.bfs_same_player((0, i), player_id, on_visit)
                    if up and down:
                        return True


    def is_valid(self, pos: (int, int)) -> bool:
        return self.size > pos[0] >= 0 and self.size > pos[1] >= 0

    def check_merge_count(self, play: Tuple[int, int]):
        count = 0
        # Arriba
        if play[0] - 1 >= 0:
            if self.board[play[0] - 1][play[1]] == self.board[play[0]][play[1]]:
                count += 1
            # Arriba derecha
            if play[1] + 1 < self.size:
                if self.board[play[0] - 1][play[1] + 1] == self.board[play[0]][play[1]]:
                    count += 1
        # Izquierda
        if play[1] - 1 >= 0:
            if self.board[play[0]][play[1] - 1] == self.board[play[0]][play[1]]:
                count += 1

        # Derecha
        if play[1] + 1 < self.size:
            if self.board[play[0]][play[1] + 1] == self.board[play[0]][play[1]]:
                count += 1

        # Abajo
        if play[0] + 1 < self.size:
            if self.board[play[0] + 1][play[1]] == self.board[play[0]][play[1]]:
                count += 1

            # Abajo izquierda
            if play[1] - 1 >= 0:
                if self.board[play[0] + 1][play[1] - 1] == self.board[play[0]][play[1]]:
                    count += 1

        return count

    def evaluate(self, player_id: int) -> float:
        score = 100
        free_left = (0, 0)
        free_up = (0, 0)
        free_right = (0, self.size - 1)
        free_down = (self.size - 1, 0)

        for i in range(self.size):
            if self.board[i][0] == 0:
                free_left = (i, 0)
                break

        for i in range(self.size):
            if self.board[0][i] == 0:
                free_up = (0, i)
                break

        for i in range(self.size):
            if self.board[self.size - 1][i] == 0:
                free_down = (self.size - 1, i)
                break

        for i in range(self.size):
            if self.board[i][self.size - 1] == 0:
                free_right = (i, self.size - 1)
                break

        for i in range(self.size):
            for j in range(self.size):
                if self.board[i][j] == player_id:
                    if player_id == 1:
                        right_distance = ((i - free_right[0]) ** 2 + (j - free_right[1]) ** 2) ** 0.5
                        left_distance = ((i - free_left[0]) ** 2 + (j - free_left[1]) ** 2) ** 0.5
                        score -= right_distance + left_distance
                    else:
                        up_distance = ((i - free_up[0]) ** 2 + (j - free_up[1]) ** 2) ** 0.5
                        down_distance = ((i - free_down[0]) ** 2 + (j - free_down[1]) ** 2) ** 0.5
                        score -= up_distance + down_distance
                        # Puentes
                        # Arriba derecha
                    if player_id == 1 and self.is_valid((i - 1, j + 2)) and self.board[i][j] == self.board[i - 1][j + 2]:
                        score += 3

                    # Abajo izquierda
                    if  player_id == 2 and self.is_valid((i + 1, j - 2)) and self.board[i][j] == self.board[i + 1][j - 2]:
                        score += 3
                    # Abajo derecha
                    if self.is_valid((i + 1, j + 1)) and self.board[i][j] == self.board[i + 1][j + 1]:
                        score += 3



        if self.check_connection(player_id):
            score = 1000

        return score


    def evaluate2(self, player_id: int) -> float:
        score = 100
        free_left = (0, 0)
        free_up = (0, 0)
        free_right = (0, self.size - 1)
        free_down = (self.size - 1, 0)

        for i in range(self.size):
            if self.board[i][0] == player_id:
                r, _, _, _ = self.dfs_forest_extremes(self.board, player_id)
                free_left = r
            if self.board[i][0] == 0:
                free_left = (i, 0)
                break

        for i in range(self.size):
            if self.board[0][i] == 0:
                free_up = (0, i)
                break

        for i in range(self.size):
            if self.board[self.size - 1][i] == 0:
                free_down = (self.size - 1, i)
                break

        for i in range(self.size):
            if self.board[i][self.size - 1] == 0:
                free_right = (i, self.size - 1)
                break

        for i in range(self.size):
            for j in range(self.size):
                if self.board[i][j] == player_id:
                    if player_id == 1:
                        right_distance = ((i - free_right[0]) ** 2 + (j - free_right[1]) ** 2) ** 0.5
                        left_distance = ((i - free_left[0]) ** 2 + (j - free_left[1]) ** 2) ** 0.5
                        score -= right_distance + left_distance
                    else:
                        up_distance = ((i - free_up[0]) ** 2 + (j - free_up[1]) ** 2) ** 0.5
                        down_distance = ((i - free_down[0]) ** 2 + (j - free_down[1]) ** 2) ** 0.5
                        score -= up_distance + down_distance
                        # Puentes
                        # Arriba derecha
                    if player_id == 1 and self.is_valid((i - 1, j + 2)) and self.board[i][j] == self.board[i - 1][
                        j + 2]:
                        score += 3



                    # Abajo izquierda
                    if player_id == 2 and self.is_valid((i + 1, j - 2)) and self.board[i][j] == self.board[i + 1][
                        j - 2]:
                        score += 3
                    # Abajo derecha
                    if self.is_valid((i + 1, j + 1)) and self.board[i][j] == self.board[i + 1][j + 1]:
                        score += 3

                    #Verificar cierres de puente
                    # Arriba derecha, player abajo
                    if (self.is_valid((i - 1, j + 1)) and self.board[i][j] == self.board[i - 1][j + 1]
                            and self.is_valid((i, j - 1)) and self.board[i][j] == self.board[i][j - 1]
                        and self.is_valid((i - 1, j)) and self.board[i][j] != self.board[i - 1][j]):
                            score += 3

                    # Arriba izquierda, player abajo
                    if (self.is_valid((i - 1, j)) and self.board[i][j] == self.board[i - 1][j]
                            and self.is_valid((i, j + 1)) and self.board[i][j] == self.board[i][j + 1]
                            and self.is_valid((i - 1, j + 1)) and self.board[i][j] != self.board[i - 1][j + 1]):
                        score += 3

                    # Arriba derecha, player arriba
                    if (self.is_valid((i, j + 1)) and self.board[i][j] == self.board[i][j + 1]
                            and self.is_valid((i + 1, j - 1)) and self.board[i][j] == self.board[i + 1][j - 1]
                            and self.is_valid((i + 1, j)) and self.board[i][j] != self.board[i + 1][j]):
                        score += 3

                    # Arriba izquierda, player arriba
                    if (self.is_valid((i, j-1)) and self.board[i][j] == self.board[i][j-1]
                            and self.is_valid((i + 1, j)) and self.board[i][j] == self.board[i + 1][j]
                            and self.is_valid((i + 1, j - 1)) and self.board[i][j] != self.board[i + 1][j - 1]):
                        score += 3


        if self.check_connection(player_id):
            score = 1000

        return score

    def evaluate5(self, player_id: int) -> float:
        score = 100
        rightmost_dict, leftmost_dict, topmost_dict, bottommost_dict = self.dfs_forest_extremes(self.board, player_id)
        middle = self.size // 2
        free_left = min(
            [pos for pos in rightmost_dict.values() if pos[1] == 0],
            key=lambda pos: (pos[0], abs(pos[1] - middle)),
            default=(0, 0)
        )
        free_up = min(
            [pos for pos in bottommost_dict.values() if pos[0] == 0],
            key=lambda pos: (pos[1], abs(pos[0] - middle)),
            default=(0, 0)
        )
        free_right = min(
            [pos for pos in leftmost_dict.values() if pos[1] == self.size - 1],
            key=lambda pos: (pos[0], abs(pos[1] - middle)),
            default=(0, self.size - 1)
        )
        free_down = min(
            [pos for pos in topmost_dict.values() if pos[0] == self.size - 1],
            key=lambda pos: (pos[1], abs(pos[0] - middle)),
            default=(self.size - 1, 0)
        )


        directions = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, 1), (1, -1)]  # Hexagonal directions

        for i in range(self.size):
            for j in range(self.size):
                count = 0
                for dx, dy in directions:
                    nx, ny = i + dx, j + dy
                    if self.is_valid((nx, ny)) and self.board[nx][ny] == player_id:
                        count += 1

                if count > 3:
                    score -= 5 * count
                if self.board[i][j] == player_id:
                    if player_id == 1:
                        right_distance = ((i - free_right[0]) ** 2 + (j - free_right[1]) ** 2) ** 0.5
                        left_distance = ((i - free_left[0]) ** 2 + (j - free_left[1]) ** 2) ** 0.5
                        score = score - right_distance - left_distance
                    else:
                        up_distance = ((i - free_up[0]) ** 2 + (j - free_up[1]) ** 2) ** 0.5
                        down_distance = ((i - free_down[0]) ** 2 + (j - free_down[1]) ** 2) ** 0.5
                        score = score - up_distance - down_distance
                        # Puentes
                        # Arriba derecha
                    if self.is_valid((i - 1, j + 2)) and self.board[i][j] == self.board[i - 1][
                        j + 2]:
                        score += 5

                    # Abajo izquierda
                    if self.is_valid((i + 1, j - 2)) and self.board[i][j] == self.board[i + 1][j - 2]:
                        score += 5
                    # Abajo derecha
                    if self.is_valid((i + 1, j + 1)) and self.board[i][j] == self.board[i + 1][j + 1]:
                        score += 5

                    # Arriba izquierda
                    if self.is_valid((i - 1, j-1)) and self.board[i][j] == self.board[i - 1][j-1]:
                        score += 5



                    # Verificar cierres de puente
                    # Arriba derecha, player abajo
                    if (self.is_valid((i - 1, j + 1)) and self.board[i][j] == self.board[i - 1][j + 1]
                            and self.is_valid((i, j - 1)) and self.board[i][j] == self.board[i][j - 1]
                            and self.is_valid((i - 1, j)) and self.board[i][j] != self.board[i - 1][j] != 0):
                        score += 20

                    # Arriba izquierda, player abajo
                    if (self.is_valid((i - 1, j)) and self.board[i][j] == self.board[i - 1][j]
                            and self.is_valid((i, j + 1)) and self.board[i][j] == self.board[i][j + 1]
                            and self.is_valid((i - 1, j + 1)) and self.board[i][j] != self.board[i - 1][j + 1] != 0):
                        score += 20

                    # Arriba derecha, player arriba
                    if (self.is_valid((i, j + 1)) and self.board[i][j] == self.board[i][j + 1]
                            and self.is_valid((i + 1, j - 1)) and self.board[i][j] == self.board[i + 1][j - 1]
                            and self.is_valid((i + 1, j)) and self.board[i][j] != self.board[i + 1][j] != 0):
                        score += 20

                    # Arriba izquierda, player arriba
                    if (self.is_valid((i, j - 1)) and self.board[i][j] == self.board[i][j - 1]
                            and self.is_valid((i + 1, j)) and self.board[i][j] == self.board[i + 1][j]
                            and self.is_valid((i + 1, j - 1)) and self.board[i][j] != self.board[i + 1][j - 1] != 0):
                        score += 20

                    count += self.check_merge_count((i, j)) * 2

                    if j <= self.size // 2:
                        # Bloquear dereha
                        if self.is_valid((i, j - 2)) and self.board[i][j - 2] != 0 != player_id:
                            score += 30
                        if self.is_valid((i + 1, j - 2)) and self.board[i + 1][j - 2] != 0 != player_id:
                            score += 20

                    else:
                        # Bloquear izquierda
                        if self.is_valid((i, j + 2)) and self.board[i][j + 2] != 0 != player_id:
                            score += 30
                        if self.is_valid((i - 1, j + 2)) and self.board[i - 1][j + 2] != 0 != player_id:
                            score += 20




        return score

    def evaluate4(self, player_id: int) -> float:
        score = 100

        rightmost_dict, leftmost_dict, topmost_dict, bottommost_dict = self.dfs_forest_extremes(self.board, player_id)

        middle = self.size // 2
        free_left = min(
            [pos for pos in rightmost_dict.values() if pos[1] == 0],
            key=lambda pos: (pos[0], abs(pos[1] - middle)),
            default=(0, 0)
        )
        free_up = min(
            [pos for pos in bottommost_dict.values() if pos[0] == 0],
            key=lambda pos: (pos[1], abs(pos[0] - middle)),
            default=(0, 0)
        )
        free_right = min(
            [pos for pos in leftmost_dict.values() if pos[1] == self.size - 1],
            key=lambda pos: (pos[0], abs(pos[1] - middle)),
            default=(0, self.size - 1)
        )
        free_down = min(
            [pos for pos in topmost_dict.values() if pos[0] == self.size - 1],
            key=lambda pos: (pos[1], abs(pos[0] - middle)),
            default=(self.size - 1, 0)
        )

        directions = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, 1), (1, -1)]  # Hexagonal directions

        for i in range(self.size):
            for j in range(self.size):
                count = 0
                for dx, dy in directions:
                    nx, ny = i + dx, j + dy
                    if self.is_valid((nx, ny)) and self.board[nx][ny] == player_id:
                        count += 1

                if count > 3:
                    score -= 5 * count

                if self.board[i][j] == player_id:
                    if player_id == 1:
                        right_distance = ((i - free_right[0]) ** 2 + (j - free_right[1]) ** 2) ** 0.5
                        left_distance = ((i - free_left[0]) ** 2 + (j - free_left[1]) ** 2) ** 0.5
                        score = score - right_distance - left_distance
                    else:
                        up_distance = ((i - free_up[0]) ** 2 + (j - free_up[1]) ** 2) ** 0.5
                        down_distance = ((i - free_down[0]) ** 2 + (j - free_down[1]) ** 2) ** 0.5
                        score = score - (up_distance - down_distance)
                        # Puentes
                        # Arriba derecha
                    if player_id == 1 and self.is_valid((i - 1, j + 2)) and self.board[i][j] == self.board[i - 1][
                        j + 2]:
                        score += 3

                    # Abajo izquierda
                    if player_id == 2 and self.is_valid((i + 1, j - 2)) and self.board[i][j] == self.board[i + 1][
                        j - 2]:
                        score += 3
                    # Abajo derecha
                    if self.is_valid((i + 1, j + 1)) and self.board[i][j] == self.board[i + 1][j + 1]:
                        score += 3

                    # Verificar cierres de puente
                    # Arriba derecha, player abajo
                    if (self.is_valid((i - 1, j + 1)) and self.board[i][j] == self.board[i - 1][j + 1]
                            and self.is_valid((i, j - 1)) and self.board[i][j] == self.board[i][j - 1]
                            and self.is_valid((i - 1, j)) and (self.board[i][j] != self.board[i - 1][j] != 0)):
                        score += 10

                    # Arriba izquierda, player abajo
                    if (self.is_valid((i - 1, j)) and self.board[i][j] == self.board[i - 1][j]
                            and self.is_valid((i, j + 1)) and self.board[i][j] == self.board[i][j + 1]
                            and self.is_valid((i - 1, j + 1)) and (self.board[i][j] != self.board[i - 1][j + 1] != 0)):
                        score += 10

                    # Arriba derecha, player arriba
                    if (self.is_valid((i, j + 1)) and self.board[i][j] == self.board[i][j + 1]
                            and self.is_valid((i + 1, j - 1)) and self.board[i][j] == self.board[i + 1][j - 1]
                            and self.is_valid((i + 1, j)) and (self.board[i][j] != self.board[i + 1][j]) != 0):
                        score += 10

                    # Arriba izquierda, player arriba
                    if (self.is_valid((i, j - 1)) and self.board[i][j] == self.board[i][j - 1]
                            and self.is_valid((i + 1, j)) and self.board[i][j] == self.board[i + 1][j]
                            and self.is_valid((i + 1, j - 1)) and (self.board[i][j] != self.board[i + 1][j - 1] != 0)):
                        score += 10

                    self.check_merge_count((i, j)) + 1

                    if j <= self.size // 2:
                        #Bloquear dereha
                        if self.is_valid((i, j - 2)) and self.board[i][j - 2] != 0 != player_id:
                            score += 30
                        if self.is_valid((i + 1, j - 2)) and self.board[i+1][j - 2] != 0 != player_id:
                            score += 20

                    else:
                        #Bloquear izquierda
                        if self.is_valid((i, j + 2)) and self.board[i][j + 2] != 0 != player_id:
                            score += 30
                        if self.is_valid((i-1, j + 2)) and self.board[i-1][j + 2] != 0 != player_id:
                            score += 20

        return score

    def evaluate3(self, player_id):
        return 1

    def bridges(self):
        score = 0
        for i in range(self.size):
            for j in range(self.size):
                # Puentes
                # Arriba derecha
                if self.is_valid((i - 1, j + 2)) and self.board[i][j] == self.board[i - 1][j + 2]:
                    score += 3
                # Arriba izquierda
                if self.is_valid((i - 1, j - 1)) and self.board[i][j] == self.board[i - 1][j - 1]:
                    score += 3
                # Abajo izquierda
                if self.is_valid((i + 1, j - 2)) and self.board[i][j] == self.board[i + 1][j - 2]:
                    score += 3
                # Abajo derecha
                if self.is_valid((i + 1, j + 1)) and self.board[i][j] == self.board[i + 1][j + 1]:
                    score += 3

                score += self.check_merge_count((i, j)) + 1
        return score

    def bfs_same_player(self, start: Tuple[int, int], player_id: int, on_visit) -> List[Tuple[int, int]]:
        rows, cols = len(self.board), len(self.board[0])
        visited = set()
        queue = deque([start])
        result = []

        directions = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, 1), (1, -1)]  # Movimientos válidos en un tablero hexagonal

        while queue:
            x, y = queue.popleft()

            if (x, y) in visited:
                continue

            on_visit(x, y)

            visited.add((x, y))
            result.append((x, y))

            for dx, dy in directions:
                nx, ny = x + dx, y + dy
                if 0 <= nx < rows and 0 <= ny < cols and (nx, ny) not in visited and self.board[nx][ny] == player_id:
                    queue.append((nx, ny))

        return result

    def dfs_forest_extremes(self, board: List[List[int]], player_id: int) -> Tuple[
        dict, dict, dict, dict]:
        rows, cols = len(board), len(board[0])
        visited = set()
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, 1), (1, -1)]  # Hexagonal directions

        # Dictionaries to store the extremes for each node
        rightmost_dict = {}
        leftmost_dict = {}
        topmost_dict = {}
        bottommost_dict = {}

        def dfs(x: int, y: int, forest: List[Tuple[int, int]]):
            stack = [(x, y)]
            while stack:
                cx, cy = stack.pop()
                if (cx, cy) in visited:
                    continue
                visited.add((cx, cy))
                forest.append((cx, cy))
                for dx, dy in directions:
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < rows and 0 <= ny < cols and (nx, ny) not in visited and board[nx][ny] == player_id:
                        stack.append((nx, ny))

        for i in range(rows):
            for j in range(cols):
                if board[i][j] == player_id and (i, j) not in visited:
                    forest = []
                    dfs(i, j, forest)

                    # Calculate the extremes for the current forest
                    rightmost = max(forest, key=lambda pos: pos[1])
                    leftmost = min(forest, key=lambda pos: pos[1])
                    topmost = min(forest, key=lambda pos: pos[0])
                    bottommost = max(forest, key=lambda pos: pos[0])

                    # Update dictionaries for all nodes in the forest
                    for node in forest:
                        rightmost_dict[node] = rightmost
                        leftmost_dict[node] = leftmost
                        topmost_dict[node] = topmost
                        bottommost_dict[node] = bottommost

        return rightmost_dict, leftmost_dict, topmost_dict, bottommost_dict