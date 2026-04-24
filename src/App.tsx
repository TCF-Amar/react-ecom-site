import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./app/routes/AppRoutes"
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App