export default abstract class ApiService {
    abstract get: <R = void>(url: string, query?: Record<string, string>) => Promise<R>;
  
    abstract post: <R = void, B = unknown>(
      url: string,
      body?: B,
      query?: Record<string, string>,
    ) => Promise<R>
}