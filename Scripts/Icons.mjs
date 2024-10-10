import fs from "fs";
const rootDir = "./SVGs";
const dist = "./src/Assets/Icons/Svgs.tsx";

let CHILDREN = "";

const renameFunctions = [];

function buildSvgs(dir = rootDir, groupName = "") {
  const files = fs.readdirSync(dir); //["next.svg"];

  // console.log({ dir });
  files.forEach((file_Name) => {
    if (fs.lstatSync(`${dir}/${file_Name}`).isDirectory()) {
      buildSvgs(`${dir}/${file_Name}`, "-" + groupName + file_Name);
      return;
    }
    let fileName = cleanName(`${file_Name.split(".")[0]}`);
    if (!fileName.endsWith(`${groupName}`)) fileName = `${fileName}${groupName}`;
    fileName = convertFromCamelCaseAndSnakeCaseToCababCase(fileName);
    const oldName = `${dir}/${file_Name}`;
    const newName = `${dir}/${fileName}.svg`;
    if (oldName !== newName) renameFunctions.push({ oldName, newName });

    let svgAsString = fs.readFileSync(`${dir}/${file_Name}`, "utf8");
    const style = svgAsString.match(/<style[^>]*>([^<]*)<\/style>/)?.[1];
    if (style) {
      const classes = style.match(/\.cls-([0-9]+){fill:([^;]+);}/g);
      if (classes) {
        classes.forEach((cls) => {
          const [_, className, color] = cls.match(/\.cls-([0-9]+){fill:([^;]+);}/);
          console.log({ className, color });
          svgAsString = svgAsString.replace(new RegExp(`class="cls-${className}"`, "g"), `fill="${color}"`);
        });
      }
      //remove the style
      svgAsString = svgAsString.replace(/<style[^>]*>([^<]*)<\/style>/g, "");
    }
    const keepFillStyle = svgAsString.match(/<!-- keep-fill-style -->/);

    if (!svgAsString.startsWith("<!-- keep -->")) {
      // svgAsString = removeExtra(svgAsString);
      // remove the fill
      if (!style) {
        if (keepFillStyle) svgAsString = svgAsString.replace(/style="fill:([^"]*);"/g, 'fill="$1"');
        else svgAsString = svgAsString.replace(/fill="([^"]*)"/g, "");
      }
      // remove the class
      svgAsString = svgAsString.replace(/class="([^"]*)"/g, "");
      // remove the className
      svgAsString = svgAsString.replace(/className="([^"]*)"/g, "");
      // remove the style
      svgAsString = svgAsString.replace(/style="([^"]*)"/g, "");
      // remove the stroke
      svgAsString = svgAsString.replace(/stroke="([^"]*)"/g, "stroke='currentColor'");
      //remove opacity
      svgAsString = svgAsString.replace(/opacity="([^"]*)"/g, "");
      //remove id
      svgAsString = svgAsString.replace(/id="([^"]*)"/g, "");
      // remove this <?xml version="1.0"?>
      svgAsString = svgAsString.replace(/<\?xml.*\?>/g, "");
      // remove <metadata></metadata>
      svgAsString = svgAsString.replace(/<metadata[^>]*>.*<\/metadata>/g, "");
      // remove sketch:type=""
      svgAsString = svgAsString.replace(/sketch:type="[^"]*"/g, "");
    }

    // remove the comments
    svgAsString = svgAsString.replace(/<!--([^>]*)-->/g, "");

    // find all cabab case and replace it with camel case
    const matches = svgAsString.match(/-([a-z])/g);
    if (matches) {
      matches.forEach((match) => {
        svgAsString = svgAsString.replace(match, match.toUpperCase().replace("-", ""));
      });
    }

    const pathes = svgAsString.replace(/<svg[^>]*>/g, "").replace(/<\/svg>/g, "");
    const viewBox = svgAsString.match(/viewBox="([^"]*)"/)?.[1];

    let whiteSpaces = " ";
    let secondWhiteSpaces = " ";
    CHILDREN += `\n     "${fileName}": ${whiteSpaces} { viewBox:"${viewBox}",${secondWhiteSpaces} pathes :<>${pathes}</>},`;
  });
}
buildSvgs();

renameFunctions.forEach((o) => {
  fs.renameSync(o.oldName, o.newName);
});

let SvgsFile_Tsx = `export const Svgs = {${CHILDREN}\n};

export type IconKey = keyof typeof Svgs;
export default function GetIcon(icon: IconKey) {
  return Svgs[icon] as { viewBox: string; pathes: JSX.Element } | undefined;
}
export type SvgType = {
    viewBox?: string;
    pathes: React.ReactElement;
};


`;

fs.writeFileSync(dist, SvgsFile_Tsx);

function removeExtra(str) {
  const _toRmove = ["fill", "class", "className", "style", "stroke", "opacity", "id", "data-name"];
  _toRmove.forEach((o) => {
    str = str.replace(/${o}="([^"]*)"/g, "");
  });
  return str;
}

function convertToCababCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function convertFromCamelCaseAndSnakeCaseToCababCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "")
    .replace(/-svg-repo-com/g, "")
    .replace(/-icon/g, "");
}

function cleanName(str) {
  return str.replace("-svgrepo-com", "");
}
