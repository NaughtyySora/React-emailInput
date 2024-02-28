import { EmailInput } from "./components/EmailInput/EmailInput";
import { useTextInput } from "./hooks/useTextInput";

function App() {
  const { inputProps, setValue } = useTextInput();
  return (
    <div className="App">
      <EmailInput setValue={setValue} {...inputProps} id="email-input" label="Email: " />
    </div>
  );
}

export default App;
