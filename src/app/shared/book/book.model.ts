export class Book {
  constructor(
    public title: string,
    public author: string,
    public genre: string,
    public coverImg: string,
    public firstPublishYear?: number,
    public isbn?: string
  ) {}
}
