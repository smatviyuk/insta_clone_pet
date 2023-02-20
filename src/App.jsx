import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import PageRoutes from "./components/PageRoutes";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Provider store={store}>
      <PageRoutes />
      <ToastContainer position="top-center" />
    </Provider>
  );
};

export default App;
