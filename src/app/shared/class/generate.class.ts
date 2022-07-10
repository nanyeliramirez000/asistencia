export default class Generate {
  constructor(current: string) {
    history.pushState('', 'Counter', this.randomString(current, 100));
  }

  randomString(current: string, num: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `${current}?${result}`;
  }
}
