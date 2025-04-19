from fastapi import FastAPI

import play.play

app = FastAPI()

# Incluir el router
app.include_router(play.play.router)