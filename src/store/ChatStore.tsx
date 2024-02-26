/* eslint-disable no-param-reassign */
import { action, Action, createContextStore } from "easy-peasy";

type Chat = [
  role: string,
  query: string,
  response?: string,
  chatHistory?: any[]
];
type tokenUsage = {
  completionTokens: number;
  promptTokens: number;
  totalTokens: number;
};

export interface StoreModelChat {
  query: string;
  setQuery: Action<StoreModelChat, string>;

  response: string;
  setResponse: Action<StoreModelChat, string>;

  loading: boolean;
  setLoading: Action<StoreModelChat, boolean>;

  chat: Chat[];
  setChat: Action<StoreModelChat, Chat[]>;
  addQueryToChat: Action<StoreModelChat, Chat[]>;

  tokens: tokenUsage;
  setTokens: Action<StoreModelChat, tokenUsage>;
}

const ChatStore = createContextStore<StoreModelChat>({
  query: "",
  setQuery: action((state, payload) => {
    state.query = payload;
  }),

  response: "",
  setResponse: action((state, payload) => {
    state.response = payload;
  }),

  loading: false,
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),

  chat: [],
  setChat: action((state, payload) => {
    state.chat = payload;
    localStorage.setItem("chatHistory", JSON.stringify(state.chat));
  }),
  addQueryToChat: action((state, payload) => {
    state.chat.push(...payload);
    localStorage.setItem("chatHistory", JSON.stringify(state.chat));
  }),

  tokens: {
    completionTokens: 0,
    promptTokens: 0,
    totalTokens: 0,
  },
  setTokens: action((state, payload) => {
    state.tokens = payload;
  }),
});

export default ChatStore;
