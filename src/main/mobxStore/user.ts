import { action, makeAutoObservable } from 'mobx';
import customFetch from '../rapper/customFetch';

export default class User {
  token: string;
  character: 'user' | 'admin' | undefined;

  constructor() {
    makeAutoObservable(this);

    this.token = localStorage.getItem('token') || '';
    customFetch(this.token);
  }

  @action setToken = (token: string) => {
    this.token = token;
    localStorage.setItem('token', token);
    customFetch(token);
  };
}
