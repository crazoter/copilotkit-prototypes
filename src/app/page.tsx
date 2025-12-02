"use client";

// Home page with links to different demo experiences
import Link from "next/link";
import { useState } from "react";

interface DemoCard {
  id: string;
  href: string;
  emoji: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  shadowColor: string;
  textColor: string;
  features: string[];
  category: "basic" | "advanced";
}

const DEMO_CARDS: DemoCard[] = [
  {
    id: "basic-chat-sample",
    href: "/basic-chat-sample",
    emoji: "💬",
    title: "Basic Chat",
    description: "AI-powered chat with background customization.",
    gradientFrom: "from-cyan-600",
    gradientTo: "to-cyan-900",
    shadowColor: "shadow-cyan-500/50",
    textColor: "text-cyan-100",
    category: "basic",
    features: [
      "Interactive chat interface",
      "AI-powered suggestions",
      "Dynamic background control",
      "Clean and simple design",
    ],
  },
  {
    id: "loading-tasks-sample",
    href: "/loading-tasks-sample",
    emoji: "⚙️",
    title: "Loading Tasks (bugged)",
    description: "Task progress tracking with real-time step updates.",
    gradientFrom: "from-orange-600",
    gradientTo: "to-orange-900",
    shadowColor: "shadow-orange-500/50",
    textColor: "text-orange-100",
    category: "basic",
    features: [
      "Real-time task progress",
      "Step-by-step execution tracking",
      "Completion status visualization",
      "Dynamic progress bars",
    ],
  },
  {
    id: "sample-weather-agent",
    href: "/sample-weather-agent",
    emoji: "🪁",
    title: "Sample Agent",
    description: "Shared state, frontend actions, and generative UI.",
    gradientFrom: "from-indigo-600",
    gradientTo: "to-indigo-900",
    shadowColor: "shadow-indigo-500/50",
    textColor: "text-indigo-100",
    category: "basic",
    features: [
      "Theme color customization",
      "Proverb management with AI",
      "Shared state between agent and UI",
      "Generative UI rendering",
    ],
  },
  {
    id: "backend-tool-rendering-sample",
    href: "/backend-tool-rendering-sample",
    emoji: "🌤️",
    title: "Backend Tool Rendering",
    description: "Backend-driven tool rendering with weather data.",
    gradientFrom: "from-purple-600",
    gradientTo: "to-purple-900",
    shadowColor: "shadow-purple-500/50",
    textColor: "text-purple-100",
    category: "basic",
    features: [
      "Real-time weather lookup",
      "Dynamic color theming",
      "Backend-driven tool execution",
      "Interactive chat interface",
    ],
  },
  {
    id: "human-in-the-loop",
    href: "/human-in-the-loop",
    emoji: "👤",
    title: "Human in the Loop",
    description: "AI workflows with human approval and intervention.",
    gradientFrom: "from-green-600",
    gradientTo: "to-green-900",
    shadowColor: "shadow-green-500/50",
    textColor: "text-green-100",
    category: "basic",
    features: [
      "AI step execution with approval",
      "Human interruption handling",
      "Real-time status tracking",
      "Interactive decision making",
    ],
  },
  {
    id: "haiku-gen",
    href: "/haiku-gen",
    emoji: "🎨",
    title: "Haiku Generator",
    description: "AI-powered haiku creation with Japanese imagery.",
    gradientFrom: "from-rose-600",
    gradientTo: "to-rose-900",
    shadowColor: "shadow-rose-500/50",
    textColor: "text-rose-100",
    category: "advanced",
    features: [
      "Generate haikus in English and Japanese",
      "Beautiful carousel display",
      "AI-curated image selection",
      "Theme-based generation suggestions",
    ],
  },
  {
    id: "shared-state-recipe-maker",
    href: "/shared-state-recipe-maker",
    emoji: "👨‍🍳",
    title: "Recipe Maker",
    description: "AI recipe generation with shared agent-UI state.",
    gradientFrom: "from-amber-600",
    gradientTo: "to-amber-900",
    shadowColor: "shadow-amber-500/50",
    textColor: "text-amber-100",
    category: "advanced",
    features: [
      "Shared state between agent and UI",
      "Dynamic recipe generation",
      "Real-time ingredient management",
      "Interactive recipe customization",
    ],
  },
  {
    id: "predictive-state-md-editor",
    href: "/predictive-state-md-editor",
    emoji: "📝",
    title: "Markdown Editor",
    description: "Predictive AI assistance for markdown editing.",
    gradientFrom: "from-sky-600",
    gradientTo: "to-sky-900",
    shadowColor: "shadow-sky-500/50",
    textColor: "text-sky-100",
    category: "advanced",
    features: [
      "AI-powered content prediction",
      "Real-time markdown rendering",
      "Smart text suggestions",
      "Document formatting assistance",
    ],
  },
  {
    id: "sub-graphs-example",
    href: "/sub-graphs-example",
    emoji: "🔗",
    title: "Sub Graphs",
    description: "Complex workflows with nested graph structures.",
    gradientFrom: "from-violet-600",
    gradientTo: "to-violet-900",
    shadowColor: "shadow-violet-500/50",
    textColor: "text-violet-100",
    category: "advanced",
    features: [
      "Nested graph execution",
      "Complex workflow orchestration",
      "Sub-graph state management",
      "Advanced control flow",
    ],
  },
];

interface DemoCardComponentProps {
  card: DemoCard;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

const DemoCardComponent = ({ card, isHovered, onHover }: DemoCardComponentProps) => (
  <Link href={card.href} className="block h-full">
    <div
      className={`relative cursor-pointer transition-all duration-300 h-full`}
      onMouseEnter={() => onHover(card.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Card Container */}
      <div className={`relative rounded-xl overflow-hidden transition-all duration-300 w-80 h-80 ${
        isHovered ? `shadow-2xl ${card.shadowColor} scale-[1.02]` : "shadow-lg"
      }`}>
        {/* Background Gradients */}
        <div className={`absolute inset-0 bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo}`} />
        <div className="absolute inset-0 opacity-0 hover:opacity-20 bg-white transition-opacity duration-300" />
        
        <div className="relative p-6 h-full flex flex-col">
          {/* Header Section */}
          <div className="flex-shrink-0 mb-4">
            <div className="text-4xl mb-2">{card.emoji}</div>
            <h2 className="text-2xl font-bold text-white">
              {card.title}
            </h2>
          </div>
          
          {/* Content Area - Uses CSS Grid to stack Description and Features on top of each other */}
          <div className="flex-grow grid grid-cols-1 grid-rows-1 relative">
            
            {/* Description - Fades OUT on hover */}
            <div 
              className={`col-start-1 row-start-1 transition-opacity duration-300 ease-in-out ${card.textColor} text-sm ${
                isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {card.description}
            </div>

            {/* Features - Fades IN on hover */}
            <div 
              className={`col-start-1 row-start-1 transition-opacity duration-300 ease-in-out ${
                isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <h3 className="text-white font-semibold mb-2 text-sm">Features:</h3>
              <ul className={`space-y-1 ${card.textColor} text-xs`}>
                {card.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2 flex-shrink-0">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer / Button - Pinned to bottom */}
          <div className="mt-auto pt-4">
             <div className={`inline-block px-3 py-1 backdrop-blur-sm rounded text-white text-xs font-semibold transition-all duration-300 ${
               isHovered ? "bg-white/30 translate-x-1" : "bg-white/20"
             }`}>
                Try It Now →
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const basicCards = DEMO_CARDS.filter(card => card.category === "basic");
  const advancedCards = DEMO_CARDS.filter(card => card.category === "advanced");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-2">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 mt-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            CopilotKit Demos
          </h1>
          <p className="text-xl text-gray-300">
            Demos obtained from the internet
          </p>
        </div>

        {/* Basic Examples Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Basic Examples</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {basicCards.map((card) => (
              <DemoCardComponent
                key={card.id}
                card={card}
                isHovered={hoveredCard === card.id}
                onHover={setHoveredCard}
              />
            ))}
          </div>
        </div>

        {/* Advanced Examples Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Advanced Examples</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {advancedCards.map((card) => (
              <DemoCardComponent
                key={card.id}
                card={card}
                isHovered={hoveredCard === card.id}
                onHover={setHoveredCard}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-400 text-sm">POC</div>
      </div>
    </div>
  );
}
