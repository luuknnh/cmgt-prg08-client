import ChatStore from "../../store/ChatStore";

type tokenUsage = {
  completionTokens: number;
  promptTokens: number;
  totalTokens: number;
};

function Tokens() {
  const tokens = ChatStore.useStoreState<tokenUsage>((state) => state.tokens);
  return (
    <div className="flex flex-row space-x-2">
      <div>
        <h2 className="">Tokens used</h2>
      </div>
      <div>
        <h4>Total Tokens: {tokens.totalTokens}</h4>
        <h4>Prompt Tokens: {tokens.promptTokens}</h4>
        <h4>Completion Tokens: {tokens.completionTokens}</h4>
      </div>
    </div>
  );
}

export default Tokens;
