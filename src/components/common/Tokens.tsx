import ChatStore from "../../store/ChatStore";

type tokenUsage = {
  completionTokens: number;
  promptTokens: number;
  totalTokens: number;
};

function Tokens() {
  const tokens = ChatStore.useStoreState<tokenUsage>((state) => state.tokens);
  return <div>{tokens.totalTokens}</div>;
}

export default Tokens;
