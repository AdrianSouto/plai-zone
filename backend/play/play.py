from typing import List
from fastapi import APIRouter
from pydantic import BaseModel

from play.types.HexBoard import HexBoard
from play.types.PlayerAdrIAn import PlayerAdrIAn


class Item(BaseModel):
    matrix: List[List[int]]
    ai_player: int


router = APIRouter()


@router.post("/play/")
async def get_play(item: Item):
    board = HexBoard(item.matrix)
    ai = PlayerAdrIAn(item.ai_player)
    play = ai.play(board)
    return play