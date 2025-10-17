"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { feedbackAPI } from "@/lib/api/endpoints";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare } from "lucide-react";

interface FeedbackItem {
  id: string;
  content: string;
  createdAt: string;
  isPublic: boolean;
}

interface FeedbackResponse {
  data: FeedbackItem[];
}

export function FeedbackList() {
  const { data: feedbacks, isLoading } = useQuery<FeedbackResponse>({
    queryKey: ["feedbacks"],
    queryFn: () =>
      feedbackAPI.getMyFeedbacks().then((res) => res.data as FeedbackResponse),
  });

  if (isLoading) {
    return (
      <div>
        <CardHeader>
          <CardTitle className="text-content-primary">
            Recent Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-20 bg-background-tertiary rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    );
  }

  return (
    <div>
      <CardHeader>
        <CardTitle className="text-content-primary">Recent Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feedbacks?.data?.map((feedback) => (
            <div
              key={feedback.id}
              className="p-4 rounded-xl bg-background-secondary transition-colors"
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-content-secondary">
                    {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {feedback.isPublic ? (
                  <div className="flex items-center space-x-1 text-content-inverse  font-bold bg-accent-orange p-2 rounded-full">
                    <span className="text-xs">Public</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-content-inverse  font-bold bg-accent-red p-2 rounded-full">
                    <span className="text-xs">Private</span>
                  </div>
                )}
              </div>
              <p className="text-content-primary  text-sm leading-relaxed">
                {feedback.content}
              </p>
            </div>
          ))}

          {feedbacks?.data?.length === 0 && (
            <div className="text-center py-12 text-content-secondary">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-accent-orange opacity-50" />
              <p className="text-lg font-medium mb-2 text-content-primary">
                No feedback yet
              </p>
              <p className="text-sm">Share your profile to receive feedback!</p>
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
}
