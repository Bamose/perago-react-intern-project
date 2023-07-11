import { MantineProvider } from "@mantine/core";
import { useForm } from "@mantine/form";
import "./App.css";
import "./index.css";
import { Nav } from "./components/Nav";
import { RegisterEmployee } from "./components/RegisterEmployee";
import { Provider } from 'react-redux';
import { Store } from "./components/Store"
function App() {
  return(
    <MantineProvider>
      <section>
    <div >
     <Nav />
     </div>
     </section>
     <section>
     <Provider store={Store}>
      <RegisterEmployee />
     </Provider>
     </section>
     
   
    </MantineProvider>
);
}

export default App;
