import { BehaviorSubject } from "rxjs";

export default class FormService {

  private constructor() { }
  static instance: FormService;

  static initialize() {
    if (!FormService.instance) {
      FormService.instance = new FormService();
    }

    return FormService.instance;
  }

  public readonly $action = new BehaviorSubject('entrar');

}