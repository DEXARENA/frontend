
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldAlert, Lock, Trophy, Sparkles, Shield, Mail, Check, Wallet, Zap, Medal, Gift, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Successfully joined waitlist!",
        description: "We'll notify you when you're granted access.",
        variant: "default",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section with Line Patterns */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80" />
          <div className="absolute top-0 left-0 right-0 h-full">
            <div className="absolute top-20 -left-10 w-72 h-72 bg-neon-blue/20 rounded-full filter blur-3xl opacity-40" />
            <div className="absolute top-40 right-10 w-96 h-96 bg-neon-red/20 rounded-full filter blur-3xl opacity-30" />
            <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-neon-orange/20 rounded-full filter blur-3xl opacity-30" />
          </div>

          {/* Added Line Patterns */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
            <div className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-orange to-transparent"></div>
            <div className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-red to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
            <div className="absolute bottom-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-orange to-transparent"></div>
            <div className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-red to-transparent"></div>

            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-blue to-transparent"></div>
            <div className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-orange to-transparent"></div>
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-blue to-transparent"></div>
            <div className="absolute right-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-orange to-transparent"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-xs font-medium">
              <span className="mr-2">🚀</span> Beta Launch - Limited Spots Available
            </div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Trade. Duel. <span className="text-glow-blue">Dominate</span> the <span className="text-glow-orange">Crypto Arena</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The ultimate PvP prediction platform where skill meets zero-knowledge privacy.
              <br />Go head-to-head in high-stakes token duels and claim your rewards.
            </motion.p>

            <motion.div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm">⚡ Fast-paced duels</span>
              <span className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm">🔒 Zero-knowledge proofs</span>
              <span className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm">💰 Instant rewards</span>
              <span className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm">🏆 Weekly tournaments</span>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/arena">
                <Button className="text-lg py-6 px-8 bg-neon-blue hover:bg-neon-blue/80 shadow-lg shadow-neon-blue/20 transition-all duration-300 hover:scale-105 rounded-full">
                  Enter Arena <ArrowRight className="ml-2" />
                </Button>
              </Link>

              {/* Waitlist Form */}
              <form onSubmit={handleSubmitEmail} className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 rounded-full bg-neon-orange/10 border-neon-orange/30 text-white w-full sm:w-auto min-w-[200px]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="outline"
                  disabled={isSubmitting}
                  className="h-12 rounded-full border-neon-orange text-neon-orange hover:bg-neon-orange/10 transition-all duration-300"
                >
                  {isSubmitting ?
                    <span className="flex items-center">Processing <span className="ml-2 animate-pulse">...</span></span> :
                    'Join Waitlist'
                  }
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* How It Works Section - Updated with Animation and Style */}
      <section className="py-20 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80" />
          <div className="absolute top-0 left-0 right-0 h-full">
            <div className="absolute top-20 left-20 w-64 h-64 bg-neon-blue/20 rounded-full filter blur-3xl opacity-30" />
            <div className="absolute bottom-40 right-20 w-80 h-80 bg-neon-orange/20 rounded-full filter blur-3xl opacity-20" />
          </div>

          {/* Added Line Patterns */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
            <div className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-red to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
            <div className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-orange to-transparent"></div>

            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-blue to-transparent"></div>
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-blue to-transparent"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400">How DEXARENA Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Simple, fast, and transparent prediction battles with onchain verification
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <ShieldAlert size={42} className="text-neon-blue" />,
                title: "Select Your Duel",
                description: "Browse open challenges or create your own duel with custom parameters and assets to trade against."
              },
              {
                icon: <Lock size={42} className="text-neon-orange" />,
                title: "Make Your Prediction",
                description: "Secure your prediction with ZK privacy. No one sees your move until the reveal phase for maximum fairness."
              },
              {
                icon: <Trophy size={42} className="text-neon-red" />,
                title: "Claim Your Winnings",
                description: "When the timer ends, predictions are revealed, verified on-chain, and winners take the prize instantly."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-panel p-6 rounded-xl border-t border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="glass-panel rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">{item.title}</h3>
                <p className="text-gray-300 text-center">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Top Duels Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80" />
          <div className="absolute top-0 left-0 right-0 h-full">
            <div className="absolute bottom-20 left-40 w-72 h-72 bg-neon-red/20 rounded-full filter blur-3xl opacity-20" />
            <div className="absolute top-40 right-40 w-80 h-80 bg-neon-blue/20 rounded-full filter blur-3xl opacity-30" />
          </div>

          {/* Added Line Patterns */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-red to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-orange to-transparent"></div>

            <div className="absolute left-20 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-blue to-transparent"></div>
            <div className="absolute right-20 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-orange to-transparent"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400">Active Duels</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Jump into the hottest prediction battles happening right now
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "ETH UP vs DOWN",
                stake: "0.5 ETH",
                timeLeft: 180,
                players: 2,
                hot: true,
                tag: "TRENDING"
              },
              {
                title: "SOL vs AVAX",
                stake: "200 USDC",
                timeLeft: 300,
                players: 1,
                tag: "HIGH STAKES"
              },
              {
                title: "BTC 30K Break?",
                stake: "0.1 ETH",
                timeLeft: 600,
                players: 2,
                tag: "POPULAR"
              },
            ].map((duel, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`glass-panel p-6 rounded-lg ${duel.hot ? 'neon-border-red' : 'border border-white/10'}`}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{duel.title}</h3>
                  <div className="flex items-center gap-1 px-2 py-1 rounded bg-neon-orange/20 text-neon-orange text-xs">
                    <Clock size={12} />
                    <div>
                      <div className="text-[10px] opacity-80">Duel ends in</div>
                      {Math.floor(duel.timeLeft / 60)}:{(duel.timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>

                {duel.tag && (
                  <div className="mb-3 inline-block px-2 py-0.5 bg-gray-800 text-gray-300 text-xs rounded-full">
                    {duel.tag}
                  </div>
                )}

                <div className="flex items-center gap-2 mb-4">
                  {Array(2).fill(0).map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 ${i < duel.players ? 'bg-gray-700 border-neon-blue' : 'bg-gray-900 border-gray-700'}`}
                    />
                  ))}
                  <span className="text-sm text-gray-400">{duel.players}/2 Players</span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-400">Stake</div>
                    <div className="font-bold text-white">{duel.stake}</div>
                  </div>

                  <Link to="/arena">
                    <Button size="sm" className="bg-neon-blue hover:bg-neon-blue/80 rounded-full">
                      Join Duel
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/arena">
              <Button className="bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue border border-neon-blue/30 rounded-full">
                View All Duels <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent" />
          <div className="absolute top-20 left-1/3 w-72 h-72 bg-neon-blue/20 rounded-full filter blur-3xl opacity-20" />
          <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-neon-red/10 rounded-full filter blur-3xl opacity-20" />

          {/* Added Line Patterns */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
            <div className="absolute bottom-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-orange to-transparent"></div>

            <div className="absolute left-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-red to-transparent"></div>
            <div className="absolute right-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-blue to-transparent"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400">What Traders Say</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Real feedback from our community of traders and duelists
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                quote: "The adrenaline rush from these prediction duels is unmatched. ZK privacy means no one can front-run my strategy!",
                author: "zkWarrior",
                title: "Top 10 Player",
                highlight: "adrenaline rush"
              },
              {
                quote: "I've tried other prediction platforms, but none have the same level of fair play and excitement as DEXARENA.",
                author: "0xDigit",
                title: "Weekly Champion",
                highlight: "fair play"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-panel p-8 rounded-xl shadow-lg border-t border-white/10"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="text-xl italic mb-6 text-gray-200" dangerouslySetInnerHTML={{
                  __html: testimonial.quote.replace(
                    testimonial.highlight,
                    `<span class="text-neon-blue font-semibold">${testimonial.highlight}</span>`
                  )
                }} />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center">
                    <Sparkles size={20} className="text-neon-blue" />
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-16 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80" />
          <div className="absolute top-0 left-0 right-0 h-full">
            <div className="absolute top-20 right-20 w-64 h-64 bg-neon-orange/20 rounded-full filter blur-3xl opacity-30" />
            <div className="absolute bottom-40 left-20 w-80 h-80 bg-neon-blue/20 rounded-full filter blur-3xl opacity-20" />
          </div>

          {/* Added Line Patterns */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
            <div className="absolute top-40 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-red to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
            <div className="absolute bottom-40 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-orange to-transparent"></div>

            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-blue to-transparent"></div>
            <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-orange to-transparent"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400">Top Duelists</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The best prediction duelists competing for glory and rewards
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-panel rounded-lg overflow-hidden shadow-lg border-t border-white/10">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="font-bold text-xl">Weekly Leaderboard</div>
                <Link to="/leaderboard">
                  <Button variant="link" className="text-neon-blue">
                    View Full Rankings
                  </Button>
                </Link>
              </div>

              <div>
                {[
                  { rank: 1, name: "zkWarrior", wins: 42, earnings: "15.8 ETH" },
                  { rank: 2, name: "0xDigit", wins: 37, earnings: "12.3 ETH" },
                  { rank: 3, name: "CryptoSeer", wins: 29, earnings: "9.1 ETH" },
                ].map((player, index) => (
                  <motion.div
                    key={index}
                    className="px-6 py-4 border-b border-white/5 flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full mr-4 ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                      index === 1 ? 'bg-gray-300/20 text-gray-300' :
                      'bg-amber-600/20 text-amber-600'
                    }`}>
                      {index === 0 ? <Trophy size={16} /> : player.rank}
                    </div>
                    <div className="flex-1 font-medium">{player.name}</div>
                    <div className="px-3">
                      <div className="text-sm text-gray-400">Wins</div>
                      <div className="font-bold">{player.wins}</div>
                    </div>
                    <div className="px-3 text-right">
                      <div className="text-sm text-gray-400">Earnings</div>
                      <div className="font-bold text-glow-blue">{player.earnings}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-neon-orange/5 to-transparent" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-neon-orange/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-blue/10 rounded-full filter blur-3xl" />

          {/* Added Line Patterns */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-orange to-transparent"></div>
            <div className="absolute bottom-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>

            <div className="absolute left-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-orange to-transparent"></div>
            <div className="absolute right-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-blue to-transparent"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-neon-blue/20 text-neon-blue text-sm font-medium py-1 px-4 rounded-full inline-block mb-4">
              <Zap size={16} className="inline mr-1" /> Get Started Now
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400">Ready to Dominate the Arena?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of traders in fast-paced crypto prediction duels with instant rewards
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link to="/arena">
                  <Button className="text-lg py-6 px-10 bg-gradient-to-r from-neon-blue to-neon-blue/80 hover:from-neon-blue/90 hover:to-neon-blue/70 shadow-lg shadow-neon-blue/20 transition-all duration-300 rounded-full">
                    Enter Arena Now <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Button
                  className="text-lg py-6 px-10 bg-transparent border border-white/20 hover:bg-white/5 hover:border-white/30 transition-all duration-300 rounded-full"
                  onClick={() => {
                    // Show wallet options (mock)
                    toast({
                      title: "Connect Wallet",
                      description: "This would open a wallet connection modal in production.",
                      variant: "default",
                    });
                  }}
                >
                  <Wallet className="mr-2" /> Connect Wallet
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - New */}
      <section className="py-20 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80" />
          <div className="absolute top-0 left-0 right-0 h-full">
            <div className="absolute top-40 left-40 w-80 h-80 bg-neon-red/10 rounded-full filter blur-3xl opacity-20" />
            <div className="absolute bottom-20 right-40 w-72 h-72 bg-neon-blue/10 rounded-full filter blur-3xl opacity-30" />
          </div>

          {/* Added Line Patterns */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
            <div className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-red to-transparent"></div>

            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-red to-transparent"></div>
            <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-blue to-transparent"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400">Why Choose DEXARENA</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of crypto prediction battles
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Zap size={32} className="text-neon-blue" />,
                title: "Lightning Fast",
                description: "Quick battles with instant results and payouts",
              },
              {
                icon: <Lock size={32} className="text-neon-orange" />,
                title: "Zero-Knowledge Privacy",
                description: "Your predictions stay private until reveal time",
              },
              {
                icon: <Medal size={32} className="text-neon-red" />,
                title: "Skill-Based Rewards",
                description: "Earn rewards based on your prediction skills",
              },
              {
                icon: <Gift size={32} className="text-neon-blue" />,
                title: "Weekly Tournaments",
                description: "Compete for larger prizes in special events",
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-panel p-6 rounded-lg text-center border-t border-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="rounded-full w-16 h-16 bg-black/30 border border-white/5 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold flex items-center mb-6 md:mb-0">
              <Shield size={24} className="text-neon-blue mr-2" />
              <span className="text-glow-blue">DEX</span>
              <span className="text-glow-orange">ARENA</span>
            </div>

            <div className="text-gray-400 text-sm">
              © 2025 DEXARENA. All rights reserved.
            </div>

            <div className="flex gap-6 mt-6 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Discord</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
