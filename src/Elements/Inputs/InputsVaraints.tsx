import { InputState, IconInputVariant } from "./types";
import { CardsContainer, Grid } from "@/Containers";
import { IconInput } from "./Inputs";

type Props = {};
const states = ["idle", "error", "success"] as InputState[];
const variants = ["default", "bordered", "ghost", "search"] as IconInputVariant[];

const InputsVaraints = (props: Props) => {
  return <Grid>{variants.map(InputBuilder)}</Grid>;
};

export default InputsVaraints;

const InputBuilder = (variant) => {
  return (
    <div className="border-goat border-dashed border-thick col gap-lg card p-xl">
      <h2 className="text-red text-center">{variant}</h2>
      {states.map((state) => (
        <IconInput iconPosition="end" key={variant} icon="add-outline" label={state} variant={variant} state={state} />
      ))}
    </div>
  );
};
