export class User {
    constructor(
      readonly id: number,
      readonly name: string,
      readonly last_name: string,
      readonly second_last_name: string,
      readonly username: string,
      readonly email: string,
      readonly password: string,
      readonly birthday: string, 
      readonly age: number, 
      readonly registered_at: string
    ) {}
  }
  