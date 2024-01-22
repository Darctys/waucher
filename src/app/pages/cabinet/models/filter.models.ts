import {InstituteEnum} from "../enums/institute.enum";
import {FinancialAssistanceStatusEnum} from "../enums/financial-assitance-status.enum";

export const instituteFilterModel = [
  {text: 'ВУС', value: InstituteEnum.Vyc},
  {text: 'ИЕНиМ', value: InstituteEnum.Ienim},
  {text: 'ИНМТ', value: InstituteEnum.Inmit},
  {text: 'ИРИТ-РТФ', value: InstituteEnum.Rtf},
  {text: 'ИСА', value: InstituteEnum.Isa},
  {text: 'ИТОО', value: InstituteEnum.Itoo},
  {text: 'ИФКСиМП', value: InstituteEnum.Ifk},
  {text: 'ИнФО', value: InstituteEnum.Ifo},
  {text: 'ИНЭУ', value: InstituteEnum.Iey},
  {text: 'УГИ', value: InstituteEnum.Ygi},
  {text: 'УралЭНИН', value: InstituteEnum.Yei},
  {text: 'ФТИ', value: InstituteEnum.Fti},
  {text: 'ХТИ', value: InstituteEnum.Hti},
]

export const purposeFilterModel = [
  {text: 'Институт', value: 'Institute'},
  {text: 'Университет', value: 'University'},
]

export const stageFinancialAssistanceFilterModel = [
  {text: 'Новое', value: FinancialAssistanceStatusEnum.new},
  {text: 'Одобрено', value: FinancialAssistanceStatusEnum.approved},
  {text: 'Оплачено', value: FinancialAssistanceStatusEnum.paid},
  {text: 'Отклонено', value: FinancialAssistanceStatusEnum.canceled},
  {text: 'Просмотрено', value: FinancialAssistanceStatusEnum.checked},
]
