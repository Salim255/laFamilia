export class Chat {
  constructor(
    public id: number,
    public type: string,
    public created_at: Date,
    public updated_at: Date,
    public messages: any,
    public chatUser: any,
    public users: any,
    public fakeChat: boolean,
  ) {}

  get currentChatId() {
    return this.id;
  }
}
