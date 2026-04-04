import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Spinner } from "./components/ui/spinner";

const HomePage = lazy(() =>
  import("./pages").then((m) => ({ default: m.HomePage })),
);

const CreateTaskPage = lazy(() =>
  import("./pages").then((m) => ({ default: m.CreateTaskPage })),
);

const suspenseFallback = (
  <div className="flex h-screen w-full items-center justify-center flex-col space-y-4">
    <Spinner className="size-28 text-black" />
    <p className="text-sm font-medium text-black">Loading...</p>
  </div>
);

function App() {
  return (
    <Suspense fallback={suspenseFallback}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-task" element={<CreateTaskPage />} />
      </Routes>
      <Toaster position="top-right" />
    </Suspense>
  );
}

export default App;
