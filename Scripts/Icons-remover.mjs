import fs from "fs";
const rootDir = "./svgs";

const deleteFunctions = [];
const names = process.argv.slice(2);
function removeSvg(dir = rootDir, groupName = "") {
  const files = fs.readdirSync(dir); //["next.svg"];

  files.forEach((file_Name) => {
    if (fs.lstatSync(`${dir}/${file_Name}`).isDirectory()) {
      removeSvg(`${dir}/${file_Name}`, "-" + groupName + file_Name);
      return;
    }
    let fileName = `${file_Name.split(".")[0]}`;
    if (names.includes(fileName)) {
      deleteFunctions.push({ oldName: `${dir}/${file_Name}` });
      return;
    }
  });
}
removeSvg();

deleteFunctions.forEach((o) => {
  fs.unlinkSync(o.oldName);
});
