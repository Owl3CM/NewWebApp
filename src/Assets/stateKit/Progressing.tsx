import { ILang } from "@/Language";
import Loader from "./Loader";
import { Label } from "@/Elements";

interface Props {
  label: ILang;
  service: any;
}

const Progressing = ({ label = "processing" }: Props) => {
  return (
    <div className="processing-container">
      <div className="col-center m-auto bg-prim round-md p-3x min-w:200px col justify-center shadow-lg">
        <div className="mx-auto">
          <Loader />
        </div>
        <Label label={label} className="text-center" />
      </div>
    </div>
  );
};

export default Progressing;
