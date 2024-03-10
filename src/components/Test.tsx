import { useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

function Test() {
  useEffect(() => {
    fetch(`${apiUrl}/dnd/test`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.body;
      })
      .then((rs) => {
        const reader = rs.getReader();
        return new ReadableStream({
          async start(controller) {
            while (true) {
              const { done, value } = await reader.read();

              // When no more data needs to be consumed, break the reading
              if (done) {
                break;
              }

              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
            }

            // Close the stream
            controller.close();
            reader.releaseLock();
          },
        });
      })
      .then((stream) => new Response(stream))
      .then((response) => response.text())
      .then((text) => console.log(text))
      .catch((err) => console.log("Fetch error: ", err));
  }, []);

  return <div>hey</div>;
}

export default Test;
