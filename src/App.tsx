import "./App.css";

import Chat from "./components/Chat";
import ChatStore from "./store/ChatStore";

function App() {
  return (
    <>
      <ChatStore.Provider>
        <Chat />
      </ChatStore.Provider>
    </>
  );
}

export default App;
