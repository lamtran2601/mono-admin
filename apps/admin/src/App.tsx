import "antd/dist/antd.css";
import { Main } from "pages/main/Main";
import { HasuraProvider } from "hooks/HasuraProvider";

function App() {
  return (
    <HasuraProvider>
      <Main />
    </HasuraProvider>
  );
}

export default App;
