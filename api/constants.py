from pydantic import BaseModel

class Person(BaseModel):
    Index: int
    FullName: str
    Gender: str
    UniversityName: str
    UniversityLocation: str
    UniversityYear: str
    Major: str
    CountryofOrigin: str
    NativeLanguage: str
    RaceCulture: str
    InterestsHobbies: str
    MentalHealthCondition: str
    ExperiencewithMentalHealthSituation: str

class Order(BaseModel):
    product: str
    units: int

class Product(BaseModel):
    name: str
    notes: str