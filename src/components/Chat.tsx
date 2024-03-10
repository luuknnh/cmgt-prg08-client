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
      setQuery("");
      addQueryToChat([["human", query]]);
      setLoading(true);
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
        if (data.imageUrl !== null) {
          // ! voor Vercel andere manier van opslaan
          addQueryToChat([["ai", data.imageUrl]]);
          // addQueryToChat([["ai", data.imageUrl[0].url]]);
          console.log("image url saved");
        }
      }, 2000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setChat([]);
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center  flex-col ">
      <Tokens />

      <div className="max-w-4xl w-full bg-white shadow-md rounded-md p-6 relative">
        <div className="overflow-auto mb-4 flex flex-col items-start max-h-[750px]">
          {chat.map((item, index) => {
            switch (item[0]) {
              case "human":
                return <UserQuery key={index} query={item[1]} />;
              case "ai":
                return <BotResponse key={index} response={item[1]} />;
              default:
                return null;
            }
          })}
        </div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-md">
            <Loader />
          </div>
        )}
        <div className="flex">
          <textarea
            placeholder="Ask your message here"
            className="flex-grow rounded-l-md border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
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
      <button type="button" onClick={clearLocalStorage}>
        Clear Local Storage
      </button>
    </div>
  );
}

export default Chat;
