import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { ApplyJobModel, CandidatesModel, jobsModel } from 'models/jobModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit {
  applyJobForm: FormGroup;
  Result: jobsModel[] = [];
  jobName = "";
  jobDescription = "";
  jobLocation = "";
  ctc = "";
  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public ApiService:ApiService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ApiService.getTypeRequest("/Jobs/").subscribe(res => {
      this.Result= res;
     });

     this.applyJobForm = this.fb.group({
      candidate_id: [1],
      jobs_id: ['', Validators.compose([Validators.required])],

    })
  }
  getValue(id:any){

    
    this.Result.forEach(function (value) {
      if(value.jobs_id==id.value){
       this.jobLocation = value.job_location;
       this.jobName = value.jobs_title;
      this.ctc = value.jobs_ctc;
      this.jobDescription = value.jobs_description;
      }
    }.bind(this));
    console.log("Test" + id.value);
  }

 // submit the form with category, task and ticket details
 onSubmit() {
  const controls = this.applyJobForm.controls;
  /** check form */
  if (this.applyJobForm.invalid) {
    Object.keys(controls).forEach((controlName) =>
      controls[controlName].markAsTouched()
    );
    this.toastr.error('Please Fill Required Field');
    return;
  }
  console.log('create ticket controls' ,controls)
  this.prepareModel();
}



prepareModel() {
  let date: Date = new Date();  
  const controls = this.applyJobForm.controls;
  const _myJobs = new ApplyJobModel();
  _myJobs.candidate_id = controls.candidate_id.value;
  _myJobs.jobs_id = controls.jobs_id.value;
  _myJobs.applied_date = new Date();
  this.applyJob(_myJobs);
}
applyJob(_myCandidate: ApplyJobModel) {
  this.ApiService.applyCandidateJob(_myCandidate).subscribe((res) => {
    if (!res) {
      this.toastr.error('Some Think went wrong please try again');
      //this.goBackWithId();
    } else {
      this.toastr.success('Candidate added successfully');
      const message = res;
      this.router.navigate(['/candidate-list'], {relativeTo: this.activatedRoute});
      return;
    }
  });
}
}
