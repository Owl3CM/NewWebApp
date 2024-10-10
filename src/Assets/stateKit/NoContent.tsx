import React from "react";
import { GetLabel, ILang, Lang } from "@/Language";

interface Props {
  label: ILang;
}

const NoContent = ({ label = "noContent" }: Props) => {
  return (
    <div>
      <div className="flex col-span-full col items-center justify-center m-auto">
        {/* <Lottie className="max-w-xl" animationData={noData} /> */}
        <p className="font-bold text-2x text-owl py-6x">{GetLabel(label)}</p>
      </div>
    </div>
  );
};

export default React.memo(NoContent);
