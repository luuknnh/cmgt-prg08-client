import { useEffect } from "react";

import ChatStore from "../store/ChatStore";
import BotResponse from "./BotResponse";
import Loader from "./common/Loader";
import Tokens from "./common/Tokens";
import UserQuery from "./UserQuery";

const apiUrl = import.meta.env.VITE_API_URL;

function Chat() {
  const query = ChatStore.useStoreState((state) => state.query);
  const setQuery = ChatStore.useStoreActions((actions) => actions.setQuery);

  const setResponse = ChatStore.useStoreActions(
    (actions) => actions.setResponse
  );
  const loading = ChatStore.useStoreState((state) => state.loading);
  const setLoading = ChatStore.useStoreActions((actions) => actions.setLoading);

  const chat = ChatStore.useStoreState((state) => state.chat);
  const setChat = ChatStore.useStoreActions((actions) => actions.setChat);
  const addQueryToChat = ChatStore.useStoreActions(
    (actions) => actions.addQueryToChat
  );

  const setTokens = ChatStore.useStoreActions((actions) => actions.setTokens);

  useEffect(() => {
    const storedChat = localStorage.getItem("chatHistory");
    if (storedChat) {
      setChat(JSON.parse(storedChat));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chat));
  }, [chat]);

  const sendQuery = async () => {
    try {
      addQueryToChat([["human", query]]);
      //   setLoading(true);
      const response = await fetch(`${apiUrl}/dnd/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          chatHistory: chat,
        }),
      });
      const data = await response.json();
      console.log(data);
      setResponse(data.response);
      setTokens(data.llmOutput.tokenUsage);

      setTimeout(() => {
        setLoading(false);
        setChat(data.chatHistory);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center ">
      <Tokens />

      <div className="max-w-lg w-full bg-white shadow-md rounded-md p-6">
        <div
          id="chat-window"
          className=" overflow-auto mb-4 flex flex-col items-start"
        >
          {chat.map((item, index) => {
            if (item[0] === "human") {
              return <UserQuery key={index} query={item[1]} />;
            } else if (item[0] === "ai") {
              return <BotResponse key={index} response={item[1]} />;
            } else if (loading) {
              return <Loader />;
            } else {
              return null;
            }
          })}
          {/* {query && <UserQuery query={query} />}

          {loading ? <Loader /> : <BotResponse response={response} />} */}
        </div>
        <div className="flex">
          <input
            id="message-input"
            type="text"
            placeholder="Ask your message here"
            className="flex-grow rounded-l-md border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
            onClick={() => {
              sendQuery();
            }}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
