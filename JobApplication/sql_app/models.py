from sqlalchemy import Boolean, Column, ForeignKey, Integer, String,DateTime,Float, Integer, Numeric, Text, text, Table
from sqlalchemy.orm import relationship, mapper
import sqlalchemy
from .database import Base


metadata = sqlalchemy.MetaData()


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)



class Job(Base):
    __tablename__ = "jobs"

    jobs_id = Column(Integer, primary_key=True, index=True)
    jobs_title = Column(String)
    jobs_description = Column(String)
    job_location = Column(String)
    jobs_ctc = Column(Float)
    job_status = Column(Boolean)
    created_date = Column(DateTime)
#     #t_jobuser = relationship("User", back_populates="t_jobs")
#     #t_jobappuser = relationship("User", back_populates="t_jobCandidate")


class Candidate(Base):
    __tablename__ = "Candidate"

    candidate_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    qualification = Column(String)
    current_ctc = Column(Integer)
    expected_ctc = Column(String)
    specialized_area = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    #t_jobapp = relationship("JobApplication",back_populates="t_Candidate")


class JobApplication(Base):
    __tablename__ = "JobApplication"
    jobapplication_id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("Candidate.candidate_id"))
    jobs_id = Column(Integer, ForeignKey("jobs.jobs_id"))
    applied_date = Column(DateTime)
    #t_Candidate = relationship("Candidate",back_populates="t_jobapp")
    #t_jobCandidate  = relationship("jobs",back_populates="t_jobappuser")