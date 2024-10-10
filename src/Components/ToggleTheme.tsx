import { Theme } from "../../Moon.Types";
import { Button } from "@/Elements";
import ToggleThemeBtn from "@/Elements/Custom/ToggleThemeBtn";

const ToggleTheme = () => {
  return (
    <div className="row-center text-owl gap-xl ms-auto">
      <ToggleThemeBtn />
    </div>
  );
};

export default ToggleTheme;
