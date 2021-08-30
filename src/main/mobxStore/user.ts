import { action, makeAutoObservable } from 'mobx';
import { Models } from '../rapper';
import customFetch from '../rapper/customFetch';

export interface ILoginFormData {
  userID: string;
  password: string;
  remember: boolean;
}
export default class User {
  token: string;
  character: 'user' | 'admin' | undefined;
  loginFormData: ILoginFormData;

  username: string;
  avatarURL: string;
  phone: string;
  email: string;
  address: string[];
  availableCities: Models['GET/user/getuserinfo']['Res']['data']['availableCities'];

  constructor() {
    makeAutoObservable(this);

    this.token = localStorage.getItem('token') || '';

    const formData = localStorage.getItem('loginFormData');
    if (formData) {
      this.loginFormData = JSON.parse(formData);
    } else {
      this.loginFormData = { password: '', userID: '', remember: false };
    }

    this.username = '';
    this.avatarURL = '';
    this.phone = '';
    this.email = '';
    this.address = ['', ''];
    this.availableCities = [];
    customFetch(this.token);
  }

  @action setToken = (token: string) => {
    this.token = token;
    localStorage.setItem('token', token);
    customFetch(token);
  };

  @action setLoginFormData = (data: ILoginFormData) => {
    if (data.remember) {
      localStorage.setItem('loginFormData', JSON.stringify(data));
    } else {
      localStorage.setItem(
        'loginFormData',
        JSON.stringify({
          userID: data.userID,
          password: '',
          remember: false,
        } as ILoginFormData)
      );
    }
    this.loginFormData = data;
  };

  @action setUserInfo = (
    data: Models['GET/user/getuserinfo']['Res']['data']
  ) => {
    this.username = data.username;
    this.avatarURL = data.avatarURL;
    this.phone = data.phone;
    this.email = data.email;
    this.address = data.address;
    this.character = data.character as 'user' | 'admin' | undefined;
    this.availableCities = data.availableCities;
  };
}
