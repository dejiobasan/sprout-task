import { Spinner } from "@/components/ui/spinner";

const PageLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center flex-col space-y-4">
      <Spinner className="size-28 text-black" />
      <p className="text-sm font-medium text-black">Loading...</p>
    </div>
  );
};

export default PageLoader;
