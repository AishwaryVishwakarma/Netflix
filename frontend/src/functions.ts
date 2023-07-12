export function clearLocalStorage([...args]: Array<string>): void {
  args.map((key): void => localStorage.removeItem(key));
}

export function clearSessionStorage([...args]: Array<string>): void {
  args.map((key): void => sessionStorage.removeItem(key));
}
