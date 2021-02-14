from typing import List, Optional
from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
app = FastAPI()
@app.post("/")
class JobTable(BaseModel):
    jobs_title:str
    jobs_description:str
    job_location:str  
    jobs_ctc: float 
    created_date: Optional[datetime] = None
    job_status: Optional[bool] = True


class JobCreate(JobTable):
    pass

class Jobs(JobTable):
    jobs_id:int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    hashed_password: str


class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True


class CandidateBase(BaseModel):
    name:str
    qualification:str
    current_ctc:int
    expected_ctc:int
    specialized_area:str
    user_id:int


class CandidateCreate(CandidateBase):
    pass

class Candidate(CandidateBase):
    candidate_id: int

    class Config:
        orm_mode = True

class JobApplicationBase(BaseModel):
    candidate_id:int
    jobs_id:int
    applied_date:Optional[datetime] = None

class JobApplicationCreate(JobApplicationBase):
    pass
class JobApplication(JobApplicationBase):
    jobapplication_id: int

    class Config:
        orm_mode = True