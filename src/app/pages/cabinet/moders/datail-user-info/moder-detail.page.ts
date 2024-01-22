import {Component, OnInit} from "@angular/core";
import {NzDestroyService} from "ng-zorro-antd/core/services";
import {ModerDataService} from "../services/moder-data.service";
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {ModerFullInfoModel} from "../interfaces/moder-full-info.model";
import {InstituteEnum} from "../../enums/institute.enum";
import {RoleEnum} from "../enums/role.enum";
import {PermissionEnum} from "../enums/permission.enum";


@Component({
  templateUrl: 'moder-detail.page.html',
  providers: [NzDestroyService]
})
export class ModerDetailPage implements OnInit {

  public moder!: ModerFullInfoModel;

  public isLoading: boolean = true;

  public instituteEnum = InstituteEnum;
  public roleEnum = RoleEnum;
  public permissionEnum = PermissionEnum;

  constructor(
    private _moderDataService: ModerDataService,
    private _route: ActivatedRoute,
    private _destroy$: NzDestroyService,

  ) {
  }

  public ngOnInit() {
    this.isLoading = true;
    const id: string = this._route.snapshot.params['id'];
    this._moderDataService.getModerById(id)
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe((moder: ModerFullInfoModel) => {
      this.moder = moder
      this.isLoading = false;
    })
  }

  public itHasPermission(value: PermissionEnum): boolean {
    return this.moder.permissions?.some((item: PermissionEnum) => item === value)
  }

}
