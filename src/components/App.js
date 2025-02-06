import React, { useState } from 'react';
import { BookOpen, Brain, Target, Layout } from 'lucide-react';
import '../App.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-container">
      <div className="navbar-logo">ChainTask</div>
      <div className="navbar-links">
        <button className="button">Features</button>
        <button className="button">Learning Paths</button>
        <button className="button">About</button>
        <button className="button button-primary">Get Started</button>
      </div>
    </div>
  </nav>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="feature-card">
    <div className="icon-container">
      <Icon size={24} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const App = () => {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = 'fatso :)';
  const BASE_URL = "https://api.aimlapi.com/v1/chat/completions";


  const fetchAIResponse = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    setAiResponse('');

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistralai/Mistral-7B-Instruct-v0.2",
          messages: [
            { role: "system", content: "You are a helpful learning path agent that gives feedback, tips" },
            { role: "user", content: userInput },
          ],
          temperature: 0.7,
          max_tokens: 256,
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        setAiResponse(data.choices[0].message?.content || "No response from AI.");
      } else {
        setAiResponse("Unexpected response format.");
      }
    } catch (error) {
      console.error("API call error:", error);
      setAiResponse("Error fetching response.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchAIResponse();
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Advanced AI technology adapts to your learning style and pace."
    },
    {
      icon: Target,
      title: "Custom Learning Paths",
      description: "Expertly curated paths tailored to your goals and interests."
    },
    {
      icon: Layout,
      title: "Interactive Platform",
      description: "Engage with dynamic content and receive real-time feedback."
    },
    {
      icon: BookOpen,
      title: "Comprehensive Resources",
      description: "Access a vast library of learning materials and exercises."
    }
  ];

  return (
    <div>
      <Navbar />
      <main className="main-container">
        <section className="hero">
          <h1>Your Personal AI Learning Journey</h1>
          <p>
            Welcome to Chaintask – where every learning journey is uniquely yours. 
            Our platform seamlessly integrates advanced AI with expertly curated learning paths.
          </p>
        </section>

        <div className="chat-container">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="chat-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="What would you like to learn today?"
              />
              <button type="submit" className="button">
                Start Learning
              </button>
            </div>
          </form>

          {loading ? (
            <div className="loading">Creating your learning path...</div>
          ) : (
            aiResponse && (
              <div className="response-container">{aiResponse}</div>
            )
          )}
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;