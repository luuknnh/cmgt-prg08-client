import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

function BotResponse({ response }: { response: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-slate-800 p-4 mb-4 rounded-md text-white w-fit self-end"
    >
      <ReactMarkdown>{response}</ReactMarkdown>
    </motion.div>
  );
}

export default BotResponse;
