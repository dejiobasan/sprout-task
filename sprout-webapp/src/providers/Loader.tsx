import { useSelector } from "react-redux";
import type { RootState } from "../redux/stores";
import { Spinner } from "@/components/ui/spinner";

const Loader = () => {
  const { loading } = useSelector((state: RootState) => state.loading);
  return loading ? <Spinner className="size-28 text-black" /> : null;
};

export default Loader;
