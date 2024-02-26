import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

function BotResponse({ response }: { response: string }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isImageLoaded, setImageLoaded] = useState(true);
  const isImageUrl = (url: string) => {
    return url.includes("blob.core.windows.net");
  };

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-slate-800 p-4 mb-4 rounded-md text-white w-fit self-end"
    >
      {isImageUrl(response) ? (
        <>
          {isImageLoaded && (
            <motion.img
              src={response}
              alt="Bot response"
              className="max-w-md max-h-80 object-cover cursor-pointer"
              onClick={handleClick}
              onLoad={handleImageLoad}
              layoutId="image"
            />
          )}
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50"
                onClick={() => setModalOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src={response}
                  alt="Bot response"
                  className="max-w-full max-h-[90%] object-cover"
                  layoutId="image"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <ReactMarkdown>{response}</ReactMarkdown>
      )}
    </motion.div>
  );
}

export default BotResponse;
