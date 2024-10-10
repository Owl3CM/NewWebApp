import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Queryable, createHive, useHoney } from "@/Libs/eze-services";

const hive = createHive(false);

const Test = () => {
  const navigate = useNavigate();
  const pathParams = useParams();
  const location = useLocation();
  Queryable.Create({ navigate, location, pathParams });
  hive.setHoney(true);
  return <></>;
};
const QueryableSubscribe = () => !useHoney(hive) && <Test />;
export default QueryableSubscribe;
