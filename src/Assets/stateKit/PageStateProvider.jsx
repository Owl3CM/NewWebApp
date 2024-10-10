import React from "react";
import { memo } from "react";
import StateKit from "./StateKit";

const getGlobalProvider = (id) => {
  if (!id) return global;
  if (!global[id]) global[id] = {};
  return global[id];
};

const PageStateProvider = ({ id, provider }) => {
  const _provider = React.useMemo(() => provider || getGlobalProvider(id), []);

  [_provider.state, _provider.setState] = React.useState(_provider.state);

  return React.useMemo(() => {
    console.debug("PageStateProvider Render");
    // console.log("PageStateProvider", _provider.state);
    let PageState = getBuilder(_provider.state);

    return <PageState provider={_provider} />;
  }, [_provider.state]);
};

export default memo(PageStateProvider);
function getBuilder(state) {
  let _state;
  if (typeof state === "string") {
    _state = state;
  } else if (typeof state === "object") {
    _state = state.state;
  }
  return StateKit[_state];
}
