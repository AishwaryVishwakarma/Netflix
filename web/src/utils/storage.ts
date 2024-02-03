// Clear multiple items from storages ( local or session )
export function clearStorage(
  [...args]: Array<string>,
  storageName: Storage
): void {
  if (typeof window !== 'undefined') {
    args.forEach((key): void => storageName.removeItem(key));
  }
}

// Get multiple items from storages ( local or session )
export function getStorage(
  [...args]: Array<string>,
  storageName: Storage
): Array<string | null> {
  if (typeof window !== 'undefined') {
    return args.map((key): string | null => storageName.getItem(key));
  }

  return [];
}

// Set multiple items to storages ( local or session)
export function setStorage(
  arg: Record<string, string>,
  storageName: Storage
): void {
  if (typeof window !== 'undefined') {
    Object.keys(arg).forEach((key): void => storageName.setItem(key, arg[key]));
  }
}
