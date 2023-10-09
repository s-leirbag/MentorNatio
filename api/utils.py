# utils.py
import openai
from constants import Person, Order, Product
import re
import json
from dotenv import load_dotenv
import os

load_dotenv()

# Set your OpenAI API key
openai.api_key = os.getenv("api_key")

def generate_description(input):
    return
    messages = [
        {"role": "user",
         "content": """As a Product Description Generator, Generate multi paragraph rich text product description with emojis from the information provided to you' \n"""},
    ]

    messages.append({"role": "user", "content": f"{input}"})
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    reply = completion.choices[0].message.content
    return reply


def generate_matching_mentors(mentee: Person, mentors: dict, primary_traits: list):
    mentee_str = json.dumps(filter_dict(mentee.model_dump(), primary_traits))
    mentors_str = json.dumps(filter_mentors(mentors, primary_traits))
    # print(primary_traits)
    # print(mentee_str)
    #   (mentors_str)

    # return [1, 2, 3]

    messages = [
        {"role": "user",
         "content": """Give ID #'s of the three mentors that match the mentee as best possible from the info provided. Output only the ID #'s with no words.\n"""},
        {"role": "user",
         "content": f"Traits for the mentee: {mentee_str}"},
        {"role": "user",
         "content": f"Traits for the mentors: {mentors_str}"},
    ]

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    reply = completion.choices[0].message.content

    matches = extract_numbers(reply)
    return matches


def filter_dict(input_dict: dict, keys_to_include):
    filtered_dict = {}
    for key in keys_to_include:
        if key in input_dict:
            filtered_dict[key] = input_dict[key]
    return filtered_dict


def filter_mentors(mentors: dict, keys_to_include):
    filtered_mentors = {}
    for index, mentor in mentors.items():
        filtered_mentors[index] = filter_dict(mentor, keys_to_include)
    return filtered_mentors


def extract_numbers(input):
    nums = re.findall(r'\d+', input)
    return [int(num) for num in nums]
