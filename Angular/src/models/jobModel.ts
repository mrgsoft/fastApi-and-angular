export class jobsModel {
    jobs_id: number;
    jobs_title: string;
    jobs_description: string;
    job_location: string;
    jobs_ctc: number;
    job_status: Boolean;
    created_date:Date;
  }

  export class CandidatesModel {
    candidate_id: number;
    name: string;
    qualification: string;
    specialized_area: string;
    current_ctc: number;
    expected_ctc: string;
    user_id: number;
  }

  export class ApplyJobModel {
    candidate_id: number;
    applied_date:Date;
    jobs_id: number;
  }