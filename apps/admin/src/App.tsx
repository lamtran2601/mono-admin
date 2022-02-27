import "antd/dist/antd.css";
import { HasuraProvider } from "./hooks/hasura-provider";
import { Main } from "./pages/main/Main";

function App() {
  return (
    <HasuraProvider>
      <Main />
    </HasuraProvider>
  );
}

export default App;
