import { action, makeAutoObservable } from 'mobx';
import { Models } from '../rapper';

export default class Admin {
  filmsData: Models['GET/admin/getfilms']['Res']['data'] = [];
  hallsData: Models['GET/admin/gethalls']['Res']['data'] = [];
  arrangementsData: Models['GET/admin/getarrangements']['Res']['data'] = [];
  usersData: Models['GET/admin/getusers']['Res']['data'] = [];
  constructor() {
    makeAutoObservable(this);
  }

  @action setFilmsData = (
    data: Models['GET/admin/getfilms']['Res']['data']
  ) => {
    this.filmsData = data;
  };

  @action setHallsData = (
    data: Models['GET/admin/gethalls']['Res']['data']
  ) => {
    this.hallsData = data;
  };

  @action setArrangementsData = (
    data: Models['GET/admin/getarrangements']['Res']['data']
  ) => {
    this.arrangementsData = data;
  };

  @action setUsersData = (
    data: Models['GET/admin/getusers']['Res']['data']
  ) => {
    this.usersData = data;
  };
}
