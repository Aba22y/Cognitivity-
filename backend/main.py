from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class BookRequest(BaseModel):
    name: str

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/book")
async def add_book(book: BookRequest):
    print(f"Received book: {book.name}")
    return {"book": book.name}