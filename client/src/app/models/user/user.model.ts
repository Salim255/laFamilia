/* export class User {
  constructor(
    public userId: string,
    public created_at: string,
    public email: string,
    public first_name: string,
    public last_name: string,
    public photo: string,
  ) {}
}
 */

export class User {
  constructor(public id: number, private _token: string, private tokenExpirationDate: Date) {}

  get token() {
    if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
      return null;
    }

    return this._token;
  }

  get tokenDuration() {
    if (!this.token) {
      return 0;
    }

    return this.tokenExpirationDate.getTime() - new Date().getTime();
  }
}
