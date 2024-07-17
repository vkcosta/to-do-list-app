import { BehaviorSubject } from "rxjs";

//Ideia alternativa para mudar o layout do mesmo componente baseado no action
//Futuramente poderá ser modificado para trabalhar com rotas no react
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