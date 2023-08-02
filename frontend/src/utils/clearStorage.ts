// Function to clear multiple items from storages ( local and session )

export default function clearStorage(
  [...args]: Array<string>,
  storageName: Storage
): void {
  if (typeof window !== 'undefined') {
    args.map((key): void => storageName.removeItem(key));
  }
}
