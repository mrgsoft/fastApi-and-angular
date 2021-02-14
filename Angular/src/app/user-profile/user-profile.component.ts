import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { jobsModel } from 'models/jobModel';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})


export class UserProfileComponent implements OnInit {
  
  myJobForm: FormGroup;
  Result = [];
  hasFormError = false;
  private subscriptions: Subscription[] = [];
  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public ApiService:ApiService,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.myJobForm = this.fb.group({
      jobs_title: ['', Validators.compose([Validators.required])],
      jobs_description: ['', Validators.compose([Validators.required])],
      job_location: ['', Validators.compose([Validators.required])],
      jobs_ctc: ['', Validators.compose([Validators.required])]
    })



    const routeSubscription = this.activatedRoute.params.subscribe((params) => {
      const id = params.id; 
    });
    this.subscriptions.push(routeSubscription);


    // this.ApiService.getTypeRequest("/Jobs/").subscribe(res => {
    //   this.Result= res;
    //  });
  }

  // submit the form with category, task and ticket details
  onSubmit() {
    this.hasFormError = false;
    const controls = this.myJobForm.controls;
  
    /** check form */
    if (this.myJobForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.toastr.error('Please Fill Required Field');
      this.hasFormError = true;
      return;
    }
    console.log('create ticket controls' ,controls)
    this.prepareJobs();
  }

  prepareJobs() {
    let date: Date = new Date();  
    const controls = this.myJobForm.controls;
    const _myJobs = new jobsModel();
    _myJobs.jobs_title = controls.jobs_title.value;
    _myJobs.jobs_description = controls.jobs_description.value;
    _myJobs.job_location = controls.job_location.value;
    _myJobs.jobs_ctc = controls.jobs_ctc.value;
    _myJobs.created_date = date;
    _myJobs.job_status =  true;
    this.createJobs(_myJobs);
  }
  createJobs(_myJobs: jobsModel) {
    console.log('create ticket' ,_myJobs)
    this.ApiService.createJob(_myJobs).subscribe((res) => {
      if (!res) {
        this.toastr.error('Some Think went wrong please try again');
        //this.goBackWithId();
      } else {
        this.toastr.success('Job Added successfully');
        const message = res;
        this.router.navigate(['/job-list'], {relativeTo: this.activatedRoute});
        //this.layoutUtilsService.showError(message, '');
        //this.httpUtilService.loadingSubject.next(false);
        return;
      }
    });
  }
}
