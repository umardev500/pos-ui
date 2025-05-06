export function prettyLog(obj: any, label?: string) {
  const replacer = (_key: string, value: any) => (value === undefined ? 'undefined' : value);

  const json = JSON.stringify(obj, replacer, 2);

  if (label) {
    console.log(`📘 ${label}: \n${json}`);
  } else {
    console.log(`📘 ${json}`);
  }
}
