import SignUpPage from "./pages/SignUpPage";
import axios from 'axios';

axios.defaults.proxy.host = "http://localhost:8080"
function App() {
  return <SignUpPage />;
}

export default App;
