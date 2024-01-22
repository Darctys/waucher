

//Запрос на получение студентов
import {InstituteEnum} from "./cabinet/enums/institute.enum";
import {FinancialAssitanceStatusEnum} from "./cabinet/enums/financial-assitance-status.enum";

export interface requestStudents {
  // Институт
  institute: string,
  // Значение для посика в таблице
  searchValue: string,
  // Количество элементов на странице
  elementsPerPage: number,
  // Номер страницы
  pageNumber: number
}

//Ответ на получение студентов
export interface responseStudents {
  // Студенты
  students: any[],
  // Общее количество элементов в базе
  allItemsLength: number
}


//Запрос на получение предложение
export interface requestOffers {
  // Институт
  institute: string,
  // Значение для посика в таблице
  searchValue: string,
  // Количество элементов на странице
  elementsPerPage: number,
  // Номер страницы
  pageNumber: number
}

//Ответ на получение предложений
export interface responseOffers {
  // Предложения
  offers: any[],
  // Общее количество элементов в базе
  allItemsLength: number
}


//Запрос на получение лиц пос
export interface requestFaces {
  // Институт
  institute: string,
  // Значение для посика в таблице
  searchValue: string,
}

//Ответ на получение лиц пос
export interface responseFases {
  // Лица пос
  fases: any[],
}

//Запрос на получение форм
export interface requestForms {
  // Поиск только по названию формы
  searchValue: string,
  // Количество элементов на странице
  elementsPerPage: number,
  // Номер страницы
  pageNumber: number
}

//Ответ на получение форм
export interface responseForms {
  // Формы
  forms: any[],
  // Общее количество элементов в базе
  allItemsLength: number
}

//Мобилка
export interface login {
  posIdCard: string,
  password: string
}

// получение новостей
export interface news {
  // картинка
  icon: string,
  // Название
  title: string,
  // Описание
  description: string,
  // Когда опубликована
  createWhen: Date
}

// модель на создание матпомощи из мобилки
export interface AssistanceModel {
  // Причина
  reason: string,
  // Место подачи (университет или институт)
  submissionPlace: string;
  // Документы
  documents: string[];
}

// Админка

// Модель на создание новости
export interface news {
  // картинка
  icon: string,
  // Название
  title: string,
  // Описание
  description: string,
}

// Модель на получение новости
export interface news {
  // картинка
  icon: string,
  // Название
  title: string,
  // Описание
  description: string,
  // Когда опубликована
  createWhen: Date
}
// Модель материальной помощи в админке
export interface AssistanceModel {
  studentId: string;
  studentFullName: string;
  institute: InstituteEnum;
  id: string;
  reason: string;
  submissionPlace: string;
  documents: string[];
  // Новое, принято, отклонено
  status: FinancialAssitanceStatusEnum
}
