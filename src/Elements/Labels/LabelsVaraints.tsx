import { IconLabelState, IconLabelVariant } from "./types";
import { CardsContainer, Grid } from "@/Containers";
import { IconLabel, Label } from "./Labels";

type Props = {};
const states = ["idle", "error", "success", "warning", "info", "disabled"] as IconLabelState[];
const variants = ["nice", "info", "test"] as IconLabelVariant[];

const LabelsVaraints = (props: Props) => {
  return <Grid> {variants.map(LabelBuilder)}</Grid>;
};

export default LabelsVaraints;

const LabelBuilder = (variant) => {
  return (
    <div className="border-dashed border-shark border-thick col gap-lg card p-xl">
      <h2 className="text-red text-center">{variant}</h2>
      <p>
        <Label label="address" />
      </p>
      {states.map((state) => (
        <IconLabel iconPosition={variant === "info" ? "top" : "start"} key={variant} icon="notifications" customLabel={state} variant={variant} state={state}>
          <span className="text-orange">192,983 $</span>
        </IconLabel>
      ))}
    </div>
  );
};
