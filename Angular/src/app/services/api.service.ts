import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { map } from 'rxjs/operators'; 
import { Observable } from 'rxjs';
import { ApplyJobModel, CandidatesModel, jobsModel } from 'models/jobModel';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private REST_API_SERVER = "http://127.0.0.1:8000"; 
  constructor(private httpClient: HttpClient) { }

  public getTypeRequest(url): Observable<any>{ 
    console.log("Url " + this.REST_API_SERVER+url);
    return this.httpClient.get('http://127.0.0.1:8000/Jobs/').pipe(map(res => { 
      console.log(res);
      return res; 
    })); 
  }
  
  public getJobCandidateRequest(): Observable<any>{ 
    return this.httpClient.get('http://127.0.0.1:8000/GetAllCandidate/').pipe(map(res => { 
      console.log(res);
      return res; 
    })); 
  }


  // postTypeRequest(url, jobsModel) { 
  //   return this.httpClient.post(this.REST_API_SERVER+url, payload).pipe(map(res => { 
  //     return res; 
  //   })); 
  // }
  public createJob(jobs: jobsModel): Observable<any>{
    //let jsonstring = '{"' + "}'
    return this.httpClient.post(this.REST_API_SERVER + '/createjob/create/', jobs);
  }

  public createCandidate(candidate: CandidatesModel): Observable<any>{
    //let jsonstring = '{"' + "}'
    return this.httpClient.post(this.REST_API_SERVER + '/Candidate/create/', candidate);
  }

  public applyCandidateJob(candidate: ApplyJobModel): Observable<any>{
    //let jsonstring = '{"' + "}'
    return this.httpClient.post(this.REST_API_SERVER + '/JobApplication/create/', candidate);
  }

  putTypeRequest(url, payload) { 
    return this.httpClient.put(this.REST_API_SERVER+url, payload).pipe(map(res => { 
      return res; 
    })) 
  } 

}
