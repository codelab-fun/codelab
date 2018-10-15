export function resolveFunctionOrvalue(functionOrValue, arg) {
  return (typeof functionOrValue === 'function') ? functionOrValue(arg) : functionOrValue;
}
