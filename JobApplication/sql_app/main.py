from typing import List
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI, HTTPException,status
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:4300",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Get Candidates
@app.get("/GetAllCandidate/", response_model=List[schemas.Candidate])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_Candidates(db, skip=skip, limit=limit)
    return items

# Get List of Jobs
@app.get("/Jobs/", response_model=List[schemas.Jobs])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_Jobs(db, skip=skip, limit=limit)
    return items


# Create User
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

# Get User List
@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

# Get User By Id
@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Create Jobs response_model=schemas.JobTable
@app.post("/createjob/create/", status_code=status.HTTP_201_CREATED )

def create_item_for_user(
     item: schemas.JobTable, db: Session = Depends(get_db)
):
    return crud.create_Job(db=db, item=item)



# Get Job By Id
@app.get("/Jobs/{jobs_id}", response_model=schemas.User)
def read_user(jobs_id: int, db: Session = Depends(get_db)):
    obj_return = crud.get_Job(db, jobs_id=jobs_id)
    if obj_return is None:
        raise HTTPException(status_code=404, detail="User not found")
    return obj_return

@app.delete("/getJobs/Jobs/{jobs_id}")
def read_item(jobs_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_Jobs(db, jobs_id)
    return {"job_deleted": deleted}


# Get Candidate by Id
@app.get("/Candidate/{candidate_id}", response_model=schemas.Candidate)
def read_Candidate(candidate_id: int, db: Session = Depends(get_db)):
    obj_return = crud.get_Candidate(db, candidate_id=candidate_id)
    if obj_return is None:
        raise HTTPException(status_code=404, detail="User not found")
    return obj_return

# Create Candidate
@app.post("/Candidate/create/", status_code=status.HTTP_201_CREATED )
def create_item_for_Candidate(
    item: schemas.CandidateBase, db: Session = Depends(get_db)
):
    return crud.create_Candidate(db=db, item=item)


@app.delete("/Candidate/delete/{candidate_id}")
def read_item(candidate_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_Candidate(db, candidate_id)
    return {"cat_deleted": deleted}



# Get JobApplication
@app.get("/JobApplication/", response_model=List[schemas.JobApplication])
def read_JobApplication(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_jobapplications(db, skip=skip, limit=limit)
    return items

# Get JobApplication by Id
@app.get("/JobApplication/{jobapplication_id}", response_model=schemas.JobApplication)
def read_JobApplication(jobapplication_id: int, db: Session = Depends(get_db)):
    obj_return = crud.get_jobapplication(db, jobapplication_id=jobapplication_id)
    if obj_return is None:
        raise HTTPException(status_code=404, detail="User not found")
    return obj_return

# Create JobApplication (Apply for Job)
@app.post("/JobApplication/create/", response_model=schemas.JobApplication)
def create_item_for_JobApplication(
    item: schemas.JobApplicationBase, db: Session = Depends(get_db)
):
    return crud.create_jobapplication(db=db, item=item)

