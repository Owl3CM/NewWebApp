import { Button } from "@/Elements";
import { JsonBuilder } from "@/Libs/eze-utils";

const Error = ({ close, service, error = { Error: "not passed", retry: null } }) => {
  if (process.env.NODE_ENV === "production") return <></>;
  return (
    // <div className="fixed inset-0 col overflow-auto items-center justify-center" style={{ zIndex: 1000, paddingBlock: 100, pointerEvents: "none" }}>
    <div // className="col-center bg-king p-3x m-auto border-thick border-shark-border shadow-lg border-solid round-xl w:100% max-w:720px" style={{ maxWidth: 720, pointerEvents: "auto" }}
    >
      <div
        className="animate-bounce round-full bg-red row-center justify-center mx-auto"
        style={{ opacity: 0.3, width: 100, height: 100, boxShadow: " 0 0 10px var(--red)" }}>
        <p className="text-white text-center ">Error!</p>
      </div>
      <JsonBuilder json={{ ...error, retry: null }} className="col gap-2x bg-prim p-4x round-lg shadow-md" />
      <div className="mt-xl mx-auto row gap-lg">
        {error.retry && (
          <Button
            onClick={() => {
              console.log(service);
              if (error?.retry) {
                service.retry();
              } else if (service?.reload) {
                service.reload();
              } else {
                service?.setState("idle");
              }
            }}
            variant="primary"
            customLabel={"retry"}
          />
        )}
        <Button
          onClick={() => {
            service?.setState("idle");
            close?.();
          }}
          variant="primary"
          label={"close"}
        />
      </div>

      {/* <DefaultItemBuilder item={error.stack ? { message: error.message, stack: error.stack } : error} /> */}
    </div>
    //</div>
  );
};

export default Error;
