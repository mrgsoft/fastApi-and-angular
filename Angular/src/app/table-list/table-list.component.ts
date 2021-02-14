import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

   Result = {};

  constructor(public ApiService:ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.ApiService.getTypeRequest("/Jobs/").subscribe(res => {
    this.Result= res;
   });
  }
  editJob(jobId){
      this.router.navigate(['/add-jobs/edit',jobId], {relativeTo: this.activatedRoute});
    }
}
