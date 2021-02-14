from sqlalchemy.orm import Session
import logging
from . import models, schemas
logger = logging.getLogger("api")

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user




def get_Jobs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Job).offset(skip).limit(limit).all()

def get_Job(db: Session, jobs_id: int):
    return db.query(models.Job).filter(models.Job.jobs_id == jobs_id).first()

def  create_Job(db: Session, item: schemas.JobTable):
    print("THIS IS A DEBUG LOG" + item.jobs_title)
    db_job = models.Job(**item.dict())

    #db_job = models.jobsLink.insert().values(jobs_title= item.jobs_title,jobs_description=item.jobs_description,job_location=item.job_location,jobs_ctc=item.jobs_ctc,created_date=item.created_date,job_status=item.job_status)
    #db_job = models.Job(jobs_title= item.jobs_title,jobs_description=item.jobs_description,job_location=item.job_location,jobs_ctc=item.jobs_ctc,created_date=item.created_date,job_status=item.job_status)
    # jobs_id = db.execute(db_job)
    # return {"id": jobs_id}
    print(db_job)
    db.execute(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

# Delete Job
def delete_Job(db: Session, jobs_id: int):
    db_delete = models.Job.delete().where(models.Jobs.jobs_id == jobs_id)
    db.execute(db_delete)
    db.commit()
    db.refresh(db_delete)
    return db_delete

# Get Candidate List
def get_Candidates(db: Session, skip: int = 0, limit: int = 100):
    print("test")
    return db.query(models.Candidate).offset(skip).limit(limit).all()

# Get Candidate with Id
def get_Candidate(db: Session, candidate_id: int):
    return db.query(models.Candidate).filter(models.Candidate.candidate_id == candidate_id).first()

# Create Candidate
def create_Candidate(db: Session, item: schemas.CandidateBase):
    db_Candidate = models.Candidate(**item.dict())
    print(db_Candidate)
    db.add(db_Candidate)
    db.commit()
    db.refresh(db_Candidate)
    return db_Candidate

# Create Candidate
def delete_Candidate(db: Session, candidate_id: int):
    db_Candidatedelete = models.Candidate.delete().where(models.Candidate.candidate_id == candidate_id)
    db.execute(db_Candidatedelete)
    db.commit()
    db.refresh(db_Candidatedelete)
    return db_Candidatedelete

# Get JobApplications
def get_jobapplications(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.JobApplication).offset(skip).limit(limit).all()

# Get JobApplications with Id
def get_jobapplication(db: Session, jobapplication_id: int):
    return db.query(models.JobApplication).filter(models.JobApplication.jobapplication_id == jobapplication_id).first()

# Create JobApplication (Apply for job)
def create_jobapplication(db: Session, item: schemas.JobApplicationBase):
    db_jobapplication = models.JobApplication(**item.dict())
    db.add(db_jobapplication)
    db.commit()
    db.refresh(db_jobapplication)
    return db_jobapplication

# Create Candidate
def delete_Jobs(db: Session, jobs_id: int):
    db_delete = models.jobsLink.delete().where(models.Jobs.jobs_id == jobs_id)
    db.execute(db_delete)
    db.commit()
    db.refresh(db_delete)
    return db_delete