type AnyObj = { [key: string]: any };

export function CraftNestFromKeys(inputObject: AnyObj) {
  const result = {};
  Object.entries(inputObject).map(([key, value]) => {
    if (Array.isArray(value)) {
      // this is for multiSelectorApi
      if (value.some((v) => v.item !== undefined && v.value !== undefined && v.label !== undefined)) value = value.map((v) => v.item);
    }
    const rest = key.split(":");
    let curr = result;
    rest.forEach((_key, _i) => {
      if (_i === rest.length - 1) {
        curr[_key] = value;
      } else if (curr[_key] === undefined) curr[_key] = {};
      curr = curr[_key];
    });
  });
  return result as AnyObj;
}

export function ComposeKeysFromStruct(inputObject: AnyObj, keysToOmit: string[] = []) {
  const result = {};
  const transform = (obj, parents) => {
    Object.entries(obj).map(([key, value]) => {
      if (Array.isArray(value)) {
        result[parents ? parents + ":" + key : key] = value;
        return;
      }
      if (typeof value === "object" && !keysToOmit.includes(key)) {
        transform(value, parents ? parents + ":" + key : key);
      } else {
        result[parents ? parents + ":" + key : key] = value;
      }
    });
  };
  transform(inputObject, "");
  return result as AnyObj;
}
