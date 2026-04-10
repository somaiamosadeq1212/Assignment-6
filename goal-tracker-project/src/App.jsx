import { SearchProvider } from "./context/SearchContext.jsx";
import AppRouter from "./router/AppRouter.jsx";

export default function App() {
  return (

    <SearchProvider>
      <AppRouter />
    </SearchProvider>

  );
}

