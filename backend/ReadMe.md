# API Documentation

## Project Structure
---
## Endpoints

### 1. **POST** `/play/`
#### Description:
This endpoint calculates the next move for the AI player based on the provided game board and AI player ID.

#### Request Body:
- **matrix**: A 2D list of integers representing the game board.
- **ai_player**: An integer representing the AI player ID.

#### Example Request:
```json
{
  "matrix": [
    [1, 0, 2],
    [0, 1, 0],
    [2, 0, 1]
  ],
  "ai_player": 1
}