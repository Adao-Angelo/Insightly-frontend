"use client";

import { Button } from "@/components/ui/button";
import { feedbackAPI } from "@/lib/api/endpoints";
import { Link2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

interface PublicUser {
  username: string;
  name: string;
  bio?: string;
}

interface PublicLink {
  id: string;
  title: string;
  url: string;
}

interface PublicProfileProps {
  user: PublicUser;
  links: PublicLink[];
}

export function PublicProfile({ user, links }: PublicProfileProps) {
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!feedback.trim() || feedback.length < 10) return;

    setSubmitting(true);
    try {
      await feedbackAPI.createFeedback(user.username, {
        content: feedback,
        isPublic: true,
      });
      setSubmitted(true);
      setFeedback("");
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center p-8 gap-8 justify-between">
        <h1 className="text-xl font-bold mb-8 border-accent-orange border-b-2 pb-2 w-fit">
          Hi: anonymous
        </h1>
      </div>

      <div className="max-w-lg mx-auto px-4">
        {/* Profile Header */}
        <div className="text-center mb-8 flex justify-center flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl  bg-background-secondary border-1  border-background-secondary flex items-center justify-center overflow-hidden">
            <div className="text-accent-orange text-2xl font-bold">
              {user?.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <h1 className="text-xl font-bold text-content-primary mb-2">
            {user.name}
          </h1>
          {user.bio && (
            <p className="text-content-secondary mb-4">{user.bio}</p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3 mb-8">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-background-secondary  gap-4 rounded-xl shadow-sm border border-border-primary hover:shadow-md transition-shadow"
            >
              <div className=" bg-accent-orange w-14 h-14 flex items-center justify-center rounded-sm p-2">
                <Link2 className="text-content-inverse" />
              </div>

              <div>
                <span className="font-medium text-content-primary">
                  {link.title}
                </span>
                <p className="text-sm text-content-secondary">{link.url}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Feedback Section */}
        <div className=" rounded-lg shadow-sm  ">
          <h1 className="text-xl font-bold mb-8 border-accent-orange border-b-2 pb-2 w-fit">
            Send us your anonymous feedback
          </h1>

          {submitted ? (
            <div className="text-center py-8 mb-20">
              <div className="text-accent-green font-medium mb-6">
                Thank you for your feedback!
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSubmitted(false)}
              >
                Send Another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmitFeedback}>
              <Textarea
                value={feedback}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFeedback(e.target.value)
                }
                placeholder="Share your thoughts... (minimum 10 characters)"
                className="w-full h-32 p-3  rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                minLength={10}
                maxLength={1000}
                required
              />
              <div className="flex justify-between items-center mt-6 mb-20">
                <span className="text-sm text-content-secondary">
                  {feedback.length}/1000
                </span>
                <Button
                  type="submit"
                  disabled={submitting || feedback.length < 10}
                >
                  {submitting ? "Sending..." : "Send Feedback"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
