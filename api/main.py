from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils import generate_description, generate_matching_mentors
from constants import Person, Order, Product
import csv


# Load mentors
mentors = {}

with open('mentors.csv', mode='r', newline='') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    
    for row in csv_reader:
        mentors[int(row['Index'])] = row

# for key, entry in mentors.items():
#     print(key, entry)


# Initialize FastAPI
app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/ok")
async def ok_endpoint():
    return {"message": "ok"}

@app.get("/hello")
async def hello_endpoint(name: str = 'World'):
    return {"message": f"Hello, {name}!"}

@app.get("/mentors")
async def mentors_endpoint(index: int):
    return mentors[index]


@app.post("/orders")
async def place_order(product: str, units: int):
    return {"message": f"Order for {units} units of {product} placed successfully."}

@app.post("/orders_pydantic")
async def place_order(order: Order):
    return {"message": f"Order for {order.units} units of {order.product} placed successfully."}

@app.post("/mentee")
async def submit_mentee(mentee: Person):
    primary_traits = ['RaceCulture']
    match_indexes = generate_matching_mentors(mentee, mentors, primary_traits)
    match_mentors = get_mentors_by_indexes(mentors, match_indexes)
    # print(match_indexes)
    # print(match_mentors)
    return match_mentors


@app.post("/test")
async def test(data):
    print(data)
    return data


@app.post("/product_description")
async def generate_product_description(product: Product):
    description = generate_description(f"Product name: {product.name}, Notes: {product.notes}")
    return {"product_description": description}


# Given a list of indexes, return a dict of mentors with those indexes and validate that the indexes are valid
def get_mentors_by_indexes(mentors, indexes):
    match_mentors = {}
    for index in indexes:
        if index in mentors:
            match_mentors[index] = mentors[index]
    return match_mentors