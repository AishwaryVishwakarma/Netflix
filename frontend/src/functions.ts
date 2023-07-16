export function clearStorage(
  [...args]: Array<string>,
  storageName: Storage
): void {
  if (typeof window !== 'undefined') {
    args.map((key): void => storageName.removeItem(key));
  }
}
