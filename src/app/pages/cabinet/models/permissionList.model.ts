export class PermissionListModel {

  public offersGet!: boolean;
  public offersSave!: boolean;
  public offersDelete!: boolean;

  public studentsGet!: boolean;
  public studentsSave!: boolean;
  public studentsDelete!: boolean;

  public facesGet!: boolean;
  public facesSave!: boolean;
  public facesDelete!: boolean;

  public applicationsGet!: boolean;
  public applicationsSave!: boolean;
  public applicationsDelete!: boolean;

  public assistantsGet!: boolean;
  public assistantsSave!: boolean;
  public assistantsDelete!: boolean;

  public assistanceStageNew!: boolean;
  public assistanceStageChecked!: boolean;
  public assistanceStageApproved!: boolean;
  public assistanceStagePaid!: boolean;
  public assistanceStageCanceled!: boolean;

  constructor() {
    this.applicationsDelete = false;
    this.applicationsSave = false;
    this.applicationsGet = false;
    this.assistantsDelete = false;
    this.assistantsSave = false;
    this.assistantsGet = false;
    this.facesDelete = false;
    this.facesGet = false;
    this.facesSave = false;
    this.offersDelete = false;
    this.offersGet = false;
    this.offersSave = false;
    this.studentsDelete = false;
    this.studentsGet = false;
    this.studentsSave = false;
    this.assistanceStageApproved = false;
    this.assistanceStageCanceled = false;
    this.assistanceStageChecked = false;
    this.assistanceStageNew = false;
    this.assistanceStagePaid = false;
  }
}
