import { CraftNestFromKeys, ComposeKeysFromStruct } from "./FormsUtils.js";

const resultUser = {
  profile: {
    firstName: "Omar",
    lastName: "Alshaker",
  },
  age: "25",
  post: {
    title: "title",
    content: "content",
    tags: {
      first: "lol1",
      sec: "secLOL",
    },
  },
};

const inputUser = {
  "profile:firstName": "Omar",
  "profile:lastName": "Alshaker",
  age: "25",
  "post:title": "title",
  "post:content": "content",
  "post:tags:first": "lol1",
  "post:tags:sec": "secLOL",
};

// const str = ComposeKeysFromStruct(resultUser);
// console.log(JSON.stringify(str, null, 2));

// const obj = CraftNestFromKeys(str);
// console.log(JSON.stringify(obj, null, 2));

const obj = CraftNestFromKeys(inputUser);
console.log(JSON.stringify(obj, null, 2));

const str = ComposeKeysFromStruct(obj);
console.log(JSON.stringify(str, null, 2));

const preformance_test = () => {
  const start = Date.now();
  for (let i = 0; i < 1000; i++) {
    // CraftNestFromKeys(example);
    ComposeKeysFromStruct(exampleResult);
  }
  const end = Date.now();
  console.log(end - start, "ms");
};
// preformance_test();
