'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { Loader2, Search, Lightbulb, PenTool, Image as ImageIcon, Send, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type AgentStatus = 'idle' | 'working' | 'completed' | 'error';

interface FactoryData {
  research: string;
  strategy: string;
  copy: string;
  visual: string;
}

export function AdsFactory() {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<AgentStatus>('idle');
  const [currentAgent, setCurrentAgent] = useState<number | null>(null);
  const [data, setData] = useState<FactoryData | null>(null);

  const agents = [
    { name: 'Market Researcher', icon: Search, key: 'research' },
    { name: 'Creative Strategist', icon: Lightbulb, key: 'strategy' },
    { name: 'Copywriter', icon: PenTool, key: 'copy' },
    { name: 'Visual Prompt Engineer', icon: ImageIcon, key: 'visual' },
  ];

  const handleGenerate = async () => {
    if (!prompt) return;

    setStatus('working');
    setData(null);
    setCurrentAgent(0);

    try {
      const response = await fetch('/api/factory/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error('Generation failed');

      const result = await response.json();
      setData(result);
      setStatus('completed');
      setCurrentAgent(null);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setCurrentAgent(null);
    }
  };

  return (
    <section id="ads-factory" className="py-24 relative overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="blue" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">Ads Factory</h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Our specialized AI agents collaborate to build your next high-converting social media campaign.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <Card className="lg:col-span-1 bg-black/40 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Start Production</CardTitle>
              <CardDescription>Describe your product or service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="e.g. A premium leather wallet with RFID protection..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={status === 'working'}
                />
                <button
                  onClick={handleGenerate}
                  disabled={status === 'working' || !prompt}
                  className="w-full py-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {status === 'working' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Agents Working...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Launch Campaign
                    </>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Control Room / Progress */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agents.map((agent, index) => {
                const AgentIcon = agent.icon;
                const isWorking = status === 'working' && (currentAgent === index || currentAgent === null);
                const isDone = data !== null;

                return (
                  <Card
                    key={agent.name}
                    className={`bg-black/40 border-white/10 backdrop-blur-xl transition-all duration-500 ${
                      isWorking ? 'ring-2 ring-blue-500/50 border-blue-500/30' : ''
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isWorking ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-neutral-400'}`}>
                            <AgentIcon className="w-5 h-5" />
                          </div>
                          <span className="font-medium text-white">{agent.name}</span>
                        </div>
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : isWorking ? (
                          <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                        ) : null}
                      </div>

                      <div className="h-24 overflow-y-auto custom-scrollbar">
                        {data ? (
                          <p className="text-sm text-neutral-400 leading-relaxed">
                            {data[agent.key as keyof FactoryData]}
                          </p>
                        ) : isWorking ? (
                          <div className="space-y-2 animate-pulse">
                            <div className="h-2 bg-white/5 rounded w-full" />
                            <div className="h-2 bg-white/5 rounded w-5/6" />
                            <div className="h-2 bg-white/5 rounded w-4/6" />
                          </div>
                        ) : (
                          <p className="text-sm text-neutral-600 italic">Waiting for input...</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Visual Preview */}
            <AnimatePresence>
              {data && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <Card className="bg-black/60 border-blue-500/30 backdrop-blur-2xl overflow-hidden">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
                        <span className="text-white text-sm font-medium">Preview_Ad_v1</span>
                      </div>
                      <div className="text-xs text-blue-400 font-mono">SOCIAL_MEDIA_MOCKUP</div>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Ad Mockup */}
                      <div className="bg-neutral-900 rounded-xl overflow-hidden border border-white/5 shadow-2xl">
                        <div className="aspect-square bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center p-8 text-center">
                          <div className="space-y-4">
                            <ImageIcon className="w-12 h-12 text-white/20 mx-auto" />
                            <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest">Visual Prompt Applied</p>
                            <p className="text-sm text-neutral-300 italic px-4">
                              "{data.visual.substring(0, 100)}..."
                            </p>
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex gap-4">
                            <div className="w-6 h-6 rounded-md bg-white/5" />
                            <div className="w-6 h-6 rounded-md bg-white/5" />
                            <div className="w-6 h-6 rounded-md bg-white/5" />
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 bg-white/10 rounded w-full" />
                            <div className="h-2 bg-white/5 rounded w-3/4" />
                          </div>
                        </div>
                      </div>

                      {/* Content Panel */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Final Caption</h4>
                          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                              {data.copy}
                            </p>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                          <p className="text-xs text-blue-300">
                            <strong>Note:</strong> The visual prompt is ready to be used with Midjourney or DALL-E for final asset creation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
