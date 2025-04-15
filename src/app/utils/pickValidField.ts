const pickValidQueryFields = <
  T extends Record<string, unknown>,
  K extends keyof T
>(
  obj: T,
  keys: K[]
) => {
  const filteredObj: Partial<T> = {};

  for (const key of keys)
    if (obj && Object.hasOwnProperty.call(obj, key))
      filteredObj[key] = obj[key];

  return filteredObj;
};

export default pickValidQueryFields;
