import { ButtonState, IconButtonVariant } from "./types";
import { IconButton } from "./Buttons";
import { Grid } from "@/Containers";
import { Bee } from "@/Libs/eze-services";

type Props = {};
const states = ["", "idle", "disabled", "selected", "active", "loading", "error", "success", "warning", "info"] as ButtonState[];
const variants = ["primary", "ghost", "danger", "link"] as IconButtonVariant[];

const ButtonsVaraints = (props: Props) => {
  return <Grid>{variants.map(ButtonBuilder)}</Grid>;
};

export default ButtonsVaraints;

const ButtonBuilder = (variant) => {
  return (
    <div className="border-dashed border-shark border-thick col gap-lg card p-xl">
      <h2 className="text-red text-center">{variant}</h2>
      {states.map((state) => (
        <IconButton
          onClick={async ({ state, setState, e }) => {
            if (state !== "idle") return;
            setState("error");
          }}
          key={variant}
          icon="add-outline"
          customLabel={state}
          variant={variant}
          style={{ "--color": "#f0f" }}
          state={state}
        />
      ))}
    </div>
  );
};

const service = {
  button: "idle",
  setButton: (state) => {},
};

const TestState = () => {
  return (
    <>
      <div
        onClick={() => {
          service.setButton("success");
        }}>
        test
      </div>
      <Bee
        name="button"
        Component={({ button, setButton }) => (
          <IconButton
            onClick={async ({ state, setState, e }) => {
              setButton("error");
            }}
            icon="edit"
            customLabel={button}
            variant={"primary"}
            style={{ "--color": "#ff0" }}
            state={button}
          />
        )}
      />
    </>
  );
};
