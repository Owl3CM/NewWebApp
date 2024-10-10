interface CollapsibleStyleProps extends React.CSSProperties {
  "--color"?: string;
}
interface Props {
  color?: string;
  title?: any;
  children?: any;
  style?: CollapsibleStyleProps;
  headerChild?: any;
}

const Collapsible = ({ color, title, children, headerChild, style = { "--color": color } }: Props) => {
  return (
    <div style={style}>
      <div className="collapsible-header">
        <span className="collapsible-btn" onClick={({ currentTarget }) => collapes(currentTarget.parentElement, color)}>
          {title}
        </span>
        {headerChild}
      </div>
      <div ref={(ref) => ref && (ref.style.maxHeight = `${ref.scrollHeight + 100}px`)} className="collapsible">
        {children}
      </div>
    </div>
  );
};

export default Collapsible;

function collapes(currentTarget: any, color?: string) {
  const collapsibleTable = currentTarget.nextElementSibling;
  const isCollapsed = collapsibleTable.getAttribute("collapsed") !== null;
  if (isCollapsed) {
    collapsibleTable.style.maxHeight = `${collapsibleTable.scrollHeight + 100}px`;
    collapsibleTable.style.borderColor = `${color}`;
  } else {
    collapsibleTable.style.maxHeight = 0;
    collapsibleTable.style.borderColor = "transparent";
  }
  collapsibleTable.toggleAttribute("collapsed");
}
