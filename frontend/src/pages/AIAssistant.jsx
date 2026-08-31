import { useState } from "react";

import Navbar from "../components/Navbar";
import api from "../services/api";

import "../styles/AIAssistant.css";


function AIAssistant() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);


  const askAgent = async (event) => {

    event.preventDefault();

    const question = message.trim();

    if (!question || loading) {
      return;
    }


    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: question,
      },
    ]);


    setMessage("");
    setLoading(true);


    try {

      const response = await api.post(
        "/agent/ask",
        {
          message: question,
        }
      );


      setMessages((prev) => [
        ...prev,
        {
          type: "agent",
          text: response.data.answer,
          mode: response.data.mode,
        },
      ]);

    } catch (error) {

      console.error(
        "AI Agent error:",
        error
      );


      let errorMessage =
        "Unable to get a response from the AI assistant.";


      if (error.response?.status === 401) {

        errorMessage =
          "Your login session has expired. Please login again.";
      }


      setMessages((prev) => [
        ...prev,
        {
          type: "agent",
          text: errorMessage,
          mode: "error",
        },
      ]);

    } finally {

      setLoading(false);

    }
  };


  const askExample = (question) => {

    setMessage(question);

  };


  return (

    <div className="ai-page">

      <Navbar />


      <main className="ai-container">


        {/* Header */}

        <div className="ai-header">

          <h1>
            AI Water & Risk Assistant
          </h1>

          <p>
            Ask questions about water demand,
            risk, priorities, optimization,
            and resource recommendations.
          </p>

        </div>


        {/* Example questions */}

        <section className="example-section">

          <h3>
            Try asking
          </h3>


          <div className="example-buttons">

            <button
              onClick={() =>
                askExample(
                  "Which zone has the highest unmet water demand?"
                )
              }
            >
              Highest unmet demand
            </button>


            <button
              onClick={() =>
                askExample(
                  "Which zone has the highest risk?"
                )
              }
            >
              Highest risk
            </button>


            <button
              onClick={() =>
                askExample(
                  "Which zone has the highest priority?"
                )
              }
            >
              Highest priority
            </button>


            <button
              onClick={() =>
                askExample(
                  "Tell me about Z04"
                )
              }
            >
              Tell me about Z04
            </button>

          </div>

        </section>


        {/* Chat box */}

        <section className="chat-card">


          <div className="chat-messages">

            {messages.length === 0 ? (

              <div className="chat-empty">

                <div className="chat-empty-icon">
                  AI
                </div>

                <h2>
                  How can I help?
                </h2>

                <p>
                  Ask me about the zones,
                  risk, water allocation,
                  or recommendations.
                </p>

              </div>

            ) : (

              messages.map(
                (item, index) => (

                  <div
                    key={index}
                    className={`chat-message ${item.type}`}
                  >

                    <div className="message-label">

                      {item.type === "user"
                        ? "You"
                        : "AI Assistant"
                      }

                    </div>


                    <div className="message-text">

                      {item.text}

                    </div>


                    {item.mode &&
                     item.type === "agent" && (

                      <div className="message-mode">

                        {item.mode === "ai"
                          ? "AI Agent"
                          : item.mode === "local_fallback"
                          ? "Local Decision Support"
                          : "System"
                        }

                      </div>

                    )}

                  </div>

                )
              )

            )}


            {loading && (

              <div className="chat-message agent">

                <div className="message-label">
                  AI Assistant
                </div>

                <div className="typing-indicator">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>

              </div>

            )}

          </div>


          {/* Input */}

          <form
            className="chat-input-area"
            onSubmit={askAgent}
          >

            <input
              type="text"
              value={message}
              onChange={(event) =>
                setMessage(
                  event.target.value
                )
              }
              placeholder="Ask about water demand, risk, or allocation..."
              disabled={loading}
            />


            <button
              type="submit"
              disabled={
                loading ||
                !message.trim()
              }
            >

              {loading
                ? "..."
                : "Ask"
              }

            </button>

          </form>

        </section>

      </main>

    </div>
  );
}


export default AIAssistant;