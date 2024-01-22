import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ISelect} from "../interfaces/ISelect";
import {InstituteEnum} from "../enums/institute.enum";
import {EducationTypeEnum} from "../enums/education-type.enum";
import {SubmissionPlaceEnum} from "../enums/submission-place.enum";
import {ISubmissionReason} from "../interfaces/submission-reason.interface";
import {BehaviorSubject, debounceTime, forkJoin, from, Observable, of, tap} from "rxjs";
import {NzDestroyService} from "ng-zorro-antd/core/services";
import {map, switchMap, takeUntil} from "rxjs/operators";
import {StudentListDataService} from "../students-list/services/student-list-data.service";
import {IStudent, mapStudentToSelectStudent, SelectStudent} from "../students-list/models/student.interface";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {IFinancialAssistanceFullInfo} from "../finansial-assistance-list/models/financial-assistance.model";
import {FinancialAssistanceStatusEnum} from "../enums/financial-assitance-status.enum";
import {FinancialAssistanceDataService} from "../finansial-assistance-list/services/financial-assistance-data.service";
import {DocumentModel} from "../finansial-assistance-list/models/document.model";
import {FileModel} from "../finansial-assistance-list/models/file.model";
import {fileReadAsBase64$} from "../../data/modules/files/heplers";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  templateUrl: 'financial-assistance.page.html',
  providers: [NzDestroyService]
})
export class FinancialAssistancePage implements OnInit{
  public validateForm!: FormGroup;

  public instituteList: ISelect[] = [
    {
      text: 'ИРИТ-РТФ',
      value: InstituteEnum.Rtf
    },
    {
      text: 'ИНФО',
      value: InstituteEnum.Ifo
    },
    {
      text: 'ИНМТ',
      value: InstituteEnum.Inmit
    },
    {
      text: 'ИСА',
      value: InstituteEnum.Isa
    },
    {
      text: 'ИНЭУ',
      value: InstituteEnum.Yei
    },
    {
      text: 'ФИЗ-ТЕХ',
      value: InstituteEnum.Fti
    },
    {
      text: 'МАТ-МЕХ',
      value: InstituteEnum.Ienim
    },
    {
      text: 'ИФКСиМП',
      value: InstituteEnum.Yei
    },
    {
      text: 'УГИ',
      value: InstituteEnum.Ygi
    },
    {
      text: 'ХИМ-ТЕХ',
      value: InstituteEnum.Hti
    },
    {
      text: 'УралЭНИН',
      value: InstituteEnum.Iey
    },
  ];

  public educateTypeList: ISelect[] = [
    {
      text: EducationTypeEnum.contract,
      value: EducationTypeEnum.contract
    },
    {
      text: EducationTypeEnum.budget,
      value: EducationTypeEnum.budget
    }
  ];

  public submissionPlaceList: ISelect[] = [
    {
      text: SubmissionPlaceEnum.university,
      value: 'University'
    },
    {
      text: SubmissionPlaceEnum.institute,
      value: 'Institute'
    }
  ];

  public submissionReasonList: ISubmissionReason[] = [
    {
      value: 'Студенты, прошедшие дорогостоящее лечение, санаторнокурортное лечение; вставшие на учет в мед.учреждениях на ранних сроках беременности',
      documents: 'Оригиналы чеков на покупку лекарств и/или оплату процедур, заключение врача (диагноз, курс лечения, рецепты)',
      contract: false,
      budget: true,
      university: false,
      institute: true,
    },
    {
      value: 'Студенты, нуждающиеся в материальной поддержке в связи с покупкой дорогостоящей зимней и демисезонной одежды и обуви',
      documents: 'Оригиналы кассовых и товарных чеков с QR-кодом',
      contract: false,
      budget: true,
      university: false,
      institute: true,
    },
    {
      value: 'Студенты, нуждающиеся в материальной поддержке в связи с дорогостоящим проездом до места постоянного проживания; проездом до места проживания родителей и близких родственников в чрезвычайных ситуациях',
      documents: 'Копия основной страницы паспорта, копия паспорта с регистрацией (для иностранных граждан дополнительно миграционную карту), оригиналы билетов (ржд/автобус), электронный билет + посадочный талон (самолёт)',
      contract: false,
      budget: true,
      university: false,
      institute: true,
    },
    {
      value: 'Студенты, которым необходима помощь в решении неотложных социальных проблем в чрезвычайных ситуациях (кражах личного имущества, разрушения или затопления жилья и т.п.)',
      documents: 'При предоставлении соответствующих документов',
      contract: false,
      budget: true,
      university: false,
      institute: true,
    },
    {
      value: 'Студенты из многодетных семей',
      documents: 'Удостоверение многодетной семьи',
      contract: false,
      budget: true,
      university: false,
      institute: true,
    },
    {
      value: 'Студенты, нуждающиеся в частичной компенсации оплаты съемного жилья, в случае нехватки мест в жилищном фонде университета',
      documents: 'Копия договора найма, справка о не поселении из деканата либо из личного кабинета с печатью',
      contract: false,
      budget: true,
      university: false,
      institute: true,
    },
    {
      value: 'Студенты, из числа детей сирот и детей, оставшихся без попечения родителей; признанных инвалидами; пострадавших в результате аварии на Чернобыльской АЭС и в других радиационных катастрофах, приравненных к ней; являющихся ветеранами или инвалидами боевых действий',
      documents: 'При предоставлении соответствующих документов',
      contract: false,
      budget: true,
      university: false,
      institute: true,
    },
    {
      value: 'Студенты, имеющие родителей инвалидов или пенсионеров',
      documents: 'Копия свидетельства о рождении, удостоверение инвалидности/ пенсионера родителя',
      contract: false,
      budget: true,
      university: false,
      institute: true,
    },
    {
      value: 'Студенты, вступившие в брак/имеющие детей/потерявшие близкого родственника',
      documents: 'Копия свидетельства о регистрации брака/рождении ребенка/ смерти+документ, подтверждающий родство',
      contract: false,
      budget: true,
      university: false,
      institute: true,
    },
    {
      value: 'Студенты, прошедшие дорогостоящее лечение',
      documents: 'Оригиналы чеков на покупку лекарств и/или оплату процедур, заключение врача (диагноз, курс лечения, рецепты) (Не возмещаются затраты за стоматологическое и офтальмологическое лечение)',
      contract: false,
      budget: true,
      university: true,
      institute: false,
    },
    {
      value: 'Студенты, нуждающиеся в материальной поддержке в связи с дорогостоящим проездом до места постоянного проживания; проездом до места проживания родителей и близких родственников в чрезвычайных ситуациях',
      documents: 'Копия основной страницы паспорта, копия паспорта с регистрацией (для иностранных граждан дополнительно миграционную карту), оригиналы билетов (ржд/автобус), электронный билет + посадочный талон (самолёт)',
      contract: false,
      budget: true,
      university: true,
      institute: false,
    },
    {
      value: 'Студентам, вступившие в брак в течение последних шести месяцев/имеющие детей/потерявшие близких родственников',
      documents: 'Копия свидетельства о регистрации брака/рождении ребенка/ смерти+документ, подтверждающий родство',
      contract: false,
      budget: true,
      university: true,
      institute: false,
    },
    {
      value: 'Студенты, нуждающиеся в материальной поддержке в связи с затруднительным материальным положением по иным причинам (доходы семьи ниже прожиточного минимума, развод родителей и т.п.) ',
      documents: 'При предоставлении соответствующих документов',
      contract: true,
      budget: false,
      university: true,
      institute: false,
    },
    {
      value: 'Студенты всех федеральных льготных категорий, из многодетных семей',
      documents: 'При предоставлении соответствующих документов',
      contract: true,
      budget: false,
      university: true,
      institute: false,
    },
    {
      value: 'Студенты, имеющие родителей инвалидов I или II группы или пенсионеров',
      documents: 'Свидетельство о рождении, удостоверение инвалидности/пенсионера родителя',
      contract: true,
      budget: false,
      university: true,
      institute: false,
    },
    {
      value: 'Студенты, прошедшие дорогостоящее лечение, санаторнокурортное лечение; вставшие на учет в мед.учреждениях на сроке беременности от 4х месяцев',
      documents: 'Оригиналы чеков на покупку лекарств и/или оплату процедур, заключение врача (диагноз, курс лечения, рецепты)',
      contract: true,
      budget: false,
      university: true,
      institute: false,
    },
    {
      value: 'Студенты, нуждающиеся в материальной поддержке в связи с дорогостоящим проездом до места жительства (прописки), а также до места жительства родителей (возмещается не более 50% стоимости проезда)',
      documents: 'Копия основной страницы паспорта, копия паспорта с регистрацией (для иностранных граждан дополнительно миграционную карту), оригиналы билетов (ржд/автобус), электронный билет + посадочный талон (самолёт)',
      contract: true,
      budget: false,
      university: true,
      institute: false,
    },
    {
      value: 'Студенты, проживающие в общежитии УрФУ',
      documents: 'Копия договора найма и ордера, оригинал чека об оплате',
      contract: true,
      budget: false,
      university: true,
      institute: false,
    },
    {
      value: 'Студентам, вступившие в брак в течение последних шести месяцев/имеющие детей/потерявшие близких родственников',
      documents: 'Копия свидетельства о регистрации брака/рождении ребенка/ смерти+документ, подтверждающий родство',
      contract: true,
      budget: false,
      university: true,
      institute: false,
    },
  ]

  public beforeUpload = (file: NzUploadFile): boolean => {
    this.documentList = this.documentList.concat(file);
    return false;
  };

  public reasonsList$: BehaviorSubject<ISubmissionReason[]> = new BehaviorSubject<ISubmissionReason[]>([])
  public searchFioChange$: BehaviorSubject<string> = new BehaviorSubject('');

  public optionList: SelectStudent[] = [];
  public isLoading: boolean = false;
  public selectedStudent!: SelectStudent;
  public validFileList: FileModel[] = []
  public documentList: NzUploadFile[] = [];

  constructor(
    private _fb: FormBuilder,
    private destroy$: NzDestroyService,
    private _studentListDataService: StudentListDataService,
    private _financialAssistanceDataService: FinancialAssistanceDataService,
    private _message: NzMessageService,
  ) {

  }
  public ngOnInit(): void {
    this.validateForm = this._fb.group({
      fio: [ null, [Validators.required]],
      institute: [ null, [Validators.required]],
      sourceFunding: [ null, [Validators.required]],
      submissionPlace: [ null, [Validators.required]],
      submissionReason: [ null, [Validators.required]],
      documents: [ null ]
    });
    this.validateForm.controls["sourceFunding"].valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
      next: (value: string) => {
        this.filterReasonsList();
        if(value === EducationTypeEnum.contract ){
          this.validateForm.controls["submissionPlace"].setValue('University')
          this.validateForm.controls["submissionPlace"].disable({emitEvent: true, onlySelf: true})
        } else {
          this.validateForm.controls["submissionPlace"].enable( {emitEvent: true, onlySelf: true})
        }
      }
    });
    this.validateForm.controls["submissionPlace"].valueChanges
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
      next: () => this.filterReasonsList()
    })
    this.searchStudent();
  }

  public filterReasonsList(): void {
    let isBudget: boolean;
    let isContract: boolean;
    let isInstitute: boolean;
    let isUniversity: boolean;
    if (this.validateForm.controls["sourceFunding"].value){
      isBudget = this.validateForm.controls["sourceFunding"].value === EducationTypeEnum.budget
      isContract = this.validateForm.controls["sourceFunding"].value === EducationTypeEnum.contract
    }
    if (this.validateForm.controls["submissionPlace"].value){
      isInstitute = this.validateForm.controls["submissionPlace"].value === 'Institute'
      isUniversity = this.validateForm.controls["submissionPlace"].value === 'University'
    }
    this.reasonsList$.next(this.submissionReasonList.filter((item: ISubmissionReason) =>
      (item.budget === isBudget || isBudget === undefined)
      && (item.contract === isContract || isContract === undefined)
      && (item.institute === isInstitute || isInstitute === undefined)
      && (item.university === isUniversity || isUniversity === undefined))
    )
  }

  public onStudentSearch(fio: string): void {
    this.isLoading = true;
    this.searchFioChange$.next(fio);
  }

  public searchStudent(): void {
    this.searchFioChange$
      .pipe(
        debounceTime(500),
        switchMap((value: string) => {
          return this._studentListDataService.getStudentList({
            FullName: value,
            PerPage: 10
          })
        }),
        map((studentList: IStudent[]) => studentList.map((studentList: IStudent) => mapStudentToSelectStudent(studentList))),
      ).subscribe((studentList: SelectStudent[]) => {
        this.optionList = studentList;
        this.isLoading = false;
    })
  }

  public sendApplication(): void {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

      return
    }+
    this.getDocuments().pipe(
      switchMap((fileList: FileModel[]) => {
        return this._financialAssistanceDataService.saveNewFinancialAssistance(this.toModel(fileList))
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next:() => this._message.success('Заявление успешно отправлено', {
        nzDuration: 3000
      }),
      error: (err: any) => {
        this._message.error(err.toString(), {
          nzDuration: 3000
        })
      }
    })
  }

  public toModel(fileList: FileModel[]): IFinancialAssistanceFullInfo{
    return {
      studentId: this.validateForm.value.fio,
      purpose: this.validateForm.value.submissionPlace,
      reason: this.validateForm.value.submissionReason.toString(),
      institute: this.validateForm.value.institute,
      stage: FinancialAssistanceStatusEnum.new,
      attachments: fileList
    }
  }

  private getDocuments(): Observable<FileModel[]> {
    return of(this.documentList)
      .pipe(
        switchMap((fileList: NzUploadFile[]) => {

          return forkJoin(
            fileList.map((file: NzUploadFile) => {
              const trueFile: FileModel = new FileModel();
              console.log(file)
              trueFile.type = `.${file.type!.split('/')[1]}`;
              trueFile.name = file.name;

              return fileReadAsBase64$(file as any)
                .pipe(
                  switchMap((value: string) => {
                    trueFile.content = value;

                    return of(trueFile)
                  })
                )
            })
          )
        }),
      )
  }
}
