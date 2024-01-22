import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {FacesPosAddComponent} from "./faces-pos-add/faces-pos-add.component"
import {IFaceInterface} from "../interfaces/face.interface";
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd/table";
import {InstituteEnum} from "../enums/institute.enum";
import {RequestService} from "../services/request.service";
import {BehaviorSubject, switchMap, tap} from "rxjs";
import {FacesPosEditComponent} from "./faces-pos-edit/faces-pos-edit.component";
import {PermissionEnum} from "../moders/enums/permission.enum";
import {AuthService} from "../../data/modules/auth/services/auth.service";
import {instituteFilterModel} from "../models/filter.models";
import {ModerInfoModel} from "../moders/interfaces/moder-info.model";
import {PosFaceDataService} from "./services/pos-face-data.service";
import {takeUntil} from "rxjs/operators";
import {NzDestroyService} from "ng-zorro-antd/core/services";
import {FacePosInterface} from "./models/face-pos.interface";
import {FileModel, FileModelToFileSrc} from "../finansial-assistance-list/models/file.model";
import {getMimeTipes} from "../../data/modules/files/heplers";

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<IFaceInterface> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<IFaceInterface> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'face-pos',
  templateUrl: './faces-pos.component.html',
  styleUrls: ['./faces-pos.component.css'],
  providers: [NzDestroyService]
})
export class FacesPosComponent implements OnInit {

  public searchValue = '';
  public instituteEnum = InstituteEnum;
  public permissionEnum = PermissionEnum;

  public faceList$: BehaviorSubject<FacePosInterface[]> = new BehaviorSubject<FacePosInterface[]>([]);

  public instituteFilter: NzTableFilterList = instituteFilterModel;

  public instituteFilterFn = (list: InstituteEnum[], item: ModerInfoModel): boolean => list
    .some((institute: InstituteEnum) => item.institute.indexOf(institute) !== -1);

  public isHavePermission(value: PermissionEnum): boolean {
    return this._authService.isHavePermission(value)
  }

  public isRoot(): boolean {
    return this._authService.isRoot();
  }

  constructor(
    private _router: Router,
    private _destroy$: NzDestroyService,
    private _modal: NzModalService,
    private _posFaceDataService: PosFaceDataService,
    private _authService: AuthService,
  ) {
    this._posFaceDataService.getPosFaceList()
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(
      (data: FacePosInterface[]) => this.faceList$.next(data)
    )
  }

  ngOnInit() {
  }

  public navigateToFacePosDetail(id: number): void {
    this._router.navigateByUrl(`cabinet/faces-pos/?id=${id}`).then()
  }

  public mapPhoto(photo: FileModel): string {
    return FileModelToFileSrc(photo);
  }

  public deleteStudent(id: string): void {
    this._posFaceDataService.deletePosFace(id).pipe(
      switchMap((data) => {
        return this._posFaceDataService.getPosFaceList()
      }),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  public createAddFaceModal(): void {
    const modal: NzModalRef = this._modal.create({
      nzTitle: 'Добавить лицо POS',
      nzContent: FacesPosAddComponent
    });
  }

  public createEditFaceModal(id: string): void {
    this._posFaceDataService.getPosFaceById(id)
      .pipe(
        switchMap((facePosModel:FacePosInterface) => {
          const modal: NzModalRef = this._modal.create({
            nzTitle: 'Изменить данные лица POS',
            nzContent: FacesPosEditComponent,
            nzComponentParams: {
              face: facePosModel,
            },
          });

          return modal.afterClose
        })
      )
  }
}
