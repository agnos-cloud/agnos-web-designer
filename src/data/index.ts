export interface Repository<T> {
    get(id: string): T | Promise<T>;
    save(data: T): T | Promise<T>;
}
