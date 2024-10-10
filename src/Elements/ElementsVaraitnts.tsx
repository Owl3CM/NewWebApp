import React from "react";
import ButtonsVaraints from "./Buttons/ButtonsVaraints";
import InputsVaraints from "./Inputs/InputsVaraints";
import { Button } from "./Buttons/Buttons";
import LabelsVaraints from "./Labels/LabelsVaraints";
import { Wrapper } from "@/Containers";

type Props = {};

const El = {
  buttons: ButtonsVaraints,
  inputs: InputsVaraints,
  labels: LabelsVaraints,
};

const ElementsVariants = (props: Props) => {
  const [selected, setSelected] = React.useState(localStorage.getItem("selected-el-variant") || "buttons");
  const Component = El[selected];
  return (
    <Wrapper>
      <div className="row-center gap-lg">
        <h1>Elements Variants</h1>
        {Object.keys(El).map((key) => (
          <Button
            key={key}
            onClick={() => {
              localStorage.setItem("selected-el-variant", key);
              setSelected(key);
            }}
            customLabel={key}
            state={selected === key ? "active" : ""}
          />
        ))}
      </div>
      <Component />
    </Wrapper>
  );
};

export default ElementsVariants;
