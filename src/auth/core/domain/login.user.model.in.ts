export class LoginUserModelIn {
  constructor(
    public readonly userName: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}