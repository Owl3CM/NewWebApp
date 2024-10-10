type RowFlexProps = {
  spans?: number[];
  children: any;
  className?: string;
};

const useFlex = false;

export const RowFlex = ({ spans = [1, 1, 1], children, className = "" }: RowFlexProps) => {
  let childrenLength = children.length - spans.length;
  spans.map((o) => (childrenLength += o));
  // const childrenLength = children.length;

  const gridTemplateColumns = children?.map((_, i) => {
    const val = spans?.[i] ?? 1;
    if (useFlex) return `${Math.round((val / childrenLength) * 100) / 100}`;
    else return `${Math.round((val / childrenLength) * 100)}%`;
  });

  return (
    <div className={`row gap-lg ${className}`}>
      {children.map((child, i) => (
        <div
          key={i}
          style={
            useFlex
              ? {
                  flexGrow: gridTemplateColumns[i],
                  flexBasis: 0,
                }
              : {
                  width: `${gridTemplateColumns[i]}`,
                }
          }>
          {child}
        </div>
      ))}
    </div>
  );
};

type GridProps = {
  children: any;
  cols?: number;
  rows?: number;
  min?: string;
  max?: string;
  className?: string;
  size?: "auto" | "xs" | "sm" | "md" | "lg" | "xl" | "2x" | "3x";
};

export const Grid = ({ children, size = "auto", cols, rows = 3, min, max = "1fr", className = "", ...props }: GridProps) => {
  let gridTemplateColumns;
  let gridType = "small";
  if (min) {
    gridTemplateColumns = `repeat(auto-fill, minmax(${min}, ${max}))`;
  } else {
    // this function detect the type of the grid to be small or medium or large or extra large
    // if (cols <= 4) {
    //   gridType = "small";
    // } else if (cols <= 8) {
    //   gridType = "medium";
    // } else if (cols <= 12) {
    //   gridType = "large";
    // } else {
    //   gridType = "extraLarge";
    // }
    if (cols <= 6) {
      gridType = "small";
    } else if (cols <= 12) {
      gridType = "medium";
    } else {
      gridType = "large";
    }
    if (cols) {
      gridTemplateColumns = "";
      for (let i = 0; i < cols; i++) {
        gridTemplateColumns += "1fr ";
      }
    }
  }

  // console.log(gridTemplateColumns);

  return (
    <div
      className={"items-end gap-xl grid-container " + className}
      // data-grid-type={gridType}
      data-grid-size={size}
      {...props}
      style={{ gridTemplateColumns }}>
      {children}
    </div>
  );
};

export const TestRow = () => {
  return (
    <RowFlex spans={[1, 5, 1]} className="bg-owl">
      <div className="p-lg bg-red"></div>
      <div className="p-lg bg-goat"></div>
      <div className="p-lg bg-red"></div>
    </RowFlex>
  );
};
