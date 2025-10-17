"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Link2, MessageSquare, Users } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* HERO SECTION */}
      <section className="text-center py-20 mb-20 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold text-content-primary mb-6"
        >
          <span className="text-3xl font-bold mb-8 border-accent-orange border-b-2 pb-2 w-fit inline-block">
            Connect{" "}
          </span>
          with your
          <span className="text-accent-orange"> audience</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-content-secondary mb-8 max-w-3xl mx-auto"
        >
          Create your personalized link page, share all your content in one
          place, and receive valuable anonymous feedback from your followers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/auth/register">
            <Button>
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="secondary">See Demo</Button>
          </Link>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 mb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Link2 className="h-8 w-8 text-accent-orange" />,
              title: "All Your Links in One Place",
              text: "Share your social media, website, portfolio, and more with a beautiful, customizable page.",
              delay: 0.2,
            },
            {
              icon: <MessageSquare className="h-8 w-8 text-accent-orange" />,
              title: "Anonymous Feedback",
              text: "Receive honest, anonymous feedback from your audience to improve your content.",
              delay: 0.4,
            },
            {
              icon: <Users className="h-8 w-8 text-accent-orange" />,
              title: "Grow Your Audience",
              text: "Optimize your online presence and build stronger connections with your followers.",
              delay: 0.6,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: feature.delay,
                duration: 0.7,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="text-center p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-accent-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-content-secondary">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center py-20 bg-background-secondary rounded-3xl shadow-sm"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to elevate your online presence?
        </h2>
        <p className="text-content-secondary mb-8 max-w-2xl mx-auto">
          Join thousands of creators who use Insightly to connect with their
          audience and grow their brand.
        </p>
        <Link href="/auth/register">
          <Button className="inline-flex items-center">
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </motion.section>
    </div>
  );
}
