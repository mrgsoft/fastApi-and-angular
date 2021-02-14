import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  Result = {};
  constructor(public ApiService:ApiService) { }

  ngOnInit(): void {
    this.ApiService.getJobCandidateRequest().subscribe(res => {
      this.Result= res;
     });
  }

}
