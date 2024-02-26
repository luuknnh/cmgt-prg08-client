import { motion } from "framer-motion";

function UserQuery({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-slate-100 p-2 mb-2 rounded-md  text-right w-fit"
    >
      {query}
    </motion.div>
  );
}

export default UserQuery;
