export interface IUsuario {
  name: string,
  password: string
  ID: string,
}

export interface IUsuarioDAO {
  getUserByID(id: string): Promise<IUsuario>;
  createUser(usuario: IUsuario): Promise<IUsuario>;
  updateUser(id: string, usuario: IUsuario): Promise<IUsuario>;
  deleteUser(id: string): Promise<void>;
}
