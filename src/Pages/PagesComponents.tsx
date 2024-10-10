import { Grid } from "@/Containers";
import { IconLink, Label } from "@/Elements";
import { GetLabel } from "@/Language";

export const PagesLinkGroup = ({ routes, label = "NO LABEL", full = false }) => {
  return full ? (
    <Grid size="xs">
      <Label customLabel={label} className="text-shark col-span-full text-center text-xl" />
      {routes
        .filter((route) => route.label)
        .map((route) => {
          if (route.path.includes(":")) route.path = route.path.replace("/:id", "/new");
          return <IconLink key={route.path} containerClass="p-xl" variant="outline" to={route.path} customLabel={GetLabel(route.label)} />;
        })}
    </Grid>
  ) : (
    <div className="col bg-prim round-md p-xl gap-xl self-start">
      <Label customLabel={label} className="text-shark" />
      {routes
        // .filter((route) => !route.path.includes(":"))
        .filter((route) => route.label)
        .map((route) => {
          return <IconLink key={route.path} containerClass="p-xl" variant="outline" to={route.path} customLabel={GetLabel(route.label)} />;
        })}
    </div>
  );
};
