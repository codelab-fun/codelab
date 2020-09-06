export function resolveLengthOrdered(functionOrValue, data) {
  if (typeof functionOrValue === 'string') {
    return resolveOrderedByKey(functionOrValue, data);
  }
  return typeof functionOrValue === 'function'
    ? functionOrValue(data)
    : functionOrValue;
}

export function resolveFunctionOrvalue(functionOrValue, arg) {
  return typeof functionOrValue === 'function'
    ? functionOrValue(arg)
    : functionOrValue;
}

export function resolveFunctionKeyOrValue(val, data, resolve) {
  if (typeof val === 'string') {
    return resolve(val, data);
  }

  if (typeof val === 'function') {
    return val(data, resolve);
  }

  return val;
}

export function resolveOrderedByKey(key: string, data: any[]) {
  return Object.values(data).find(a => a.name === key).value;
}

export function resolveByKey(key: string, data: any) {
  return data[key];
}

export function strToBin(str) {
  return str
    .split('')
    .map(a => a.charCodeAt(0))
    .map(a => a.toString(2).padStart(8, 0))
    .join('');
}
