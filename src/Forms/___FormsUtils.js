export function CraftNestFromKeys(inputObject) {
  const result = {};
  Object.entries(inputObject).map(([key, value]) => {
    const rest = key.split(":");
    let curr = result;
    rest.forEach((_key, _i) => {
      if (_i === rest.length - 1) curr[_key] = value;
      if (curr[_key] === undefined) curr[_key] = {};
      curr = curr[_key];
    });
  });
  return result;
}

export function ComposeKeysFromStruct(inputObject) {
  const result = {};
  const transform = (obj, parents) => {
    Object.entries(obj).map(([key, value]) => {
      if (typeof value === "object") {
        if (parents) parents += ":";
        transform(value, parents + key);
      } else {
        result[parents ? parents + ":" + key : key] = value;
      }
    });
  };
  transform(inputObject, "");
  return result;
}
