export class LoginUserModelIn {
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}
}