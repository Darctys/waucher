import {Component, Injectable, OnInit} from "@angular/core";
import {FinancialAssistanceDataService} from "../services/financial-assistance-data.service";
import {ActivatedRoute} from "@angular/router";
import {NzDestroyService} from "ng-zorro-antd/core/services";
import {IFinancialAssistanceFullInfo} from "../models/financial-assistance.model";
import {switchMap, takeUntil} from "rxjs/operators";
import {IStudentFullInfo} from "../../students-list/models/student-full-info.interface";
import {StudentListDataService} from "../../students-list/services/student-list-data.service";
import {tap} from "rxjs";
import {DocumentModel} from "../models/document.model";
import {FileModel} from "../models/file.model";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {InstituteEnum} from "../../enums/institute.enum";
import {FinancialAssistanceStatusEnum} from "../../enums/financial-assitance-status.enum";


@Component({
  templateUrl: 'financial-assistance-detail.html',
  providers: [NzDestroyService]
})
export class FinancialAssistanceDetail implements OnInit {

  public financialAssistance!: IFinancialAssistanceFullInfo;
  public studentFullName!: string;
  public fileList!: NzUploadFile[]

  public instituteEnum = InstituteEnum;
  public stageEnum = FinancialAssistanceStatusEnum

  constructor(
    private _route: ActivatedRoute,
    private destroy$: NzDestroyService,
    private _financialAssistanceDataService: FinancialAssistanceDataService,
    private _studentListDataService: StudentListDataService,
  ) {
  }

  public ngOnInit() {
    const id: string = this._route.snapshot.queryParams['id']

    this._financialAssistanceDataService.getFinancialAssistanceById(id)
      .pipe(
        switchMap((financialAssistance: IFinancialAssistanceFullInfo) => {
          this.financialAssistance = financialAssistance;
          return this._studentListDataService.getStudentById(financialAssistance.studentId)
        }),
        tap((student: IStudentFullInfo) => this.studentFullName = student.fullName),
        takeUntil(this.destroy$)
      ).subscribe()
  }

  private makeFile(file: DocumentModel): void {
    const model: FileModel = new FileModel();


  }

}
