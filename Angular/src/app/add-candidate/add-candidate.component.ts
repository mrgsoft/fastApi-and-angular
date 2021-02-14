import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { CandidatesModel, jobsModel } from 'models/jobModel';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {
  
  myCandidateForm: FormGroup;
  Result = [];
  hasFormError = false;
  private subscriptions: Subscription[] = [];
  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public ApiService:ApiService,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.myCandidateForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      qualification: ['', Validators.compose([Validators.required])],
      current_ctc: ['', Validators.compose([Validators.required])],
      expected_ctc: ['', Validators.compose([Validators.required])],
      specialized_area: ['', Validators.compose([Validators.required])],
      user_id: [1],
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
    const controls = this.myCandidateForm.controls;
  
    /** check form */
    if (this.myCandidateForm.invalid) {
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
    const controls = this.myCandidateForm.controls;
    const _myJobs = new CandidatesModel();
    _myJobs.name = controls.name.value;
    _myJobs.qualification = controls.qualification.value;
    _myJobs.specialized_area = controls.specialized_area.value;
    _myJobs.current_ctc = controls.current_ctc.value;
    _myJobs.expected_ctc = controls.expected_ctc.value;
    _myJobs.user_id =  1;
    this.createJobs(_myJobs);
  }
  createJobs(_myCandidate: CandidatesModel) {
    this.ApiService.createCandidate(_myCandidate).subscribe((res) => {
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

