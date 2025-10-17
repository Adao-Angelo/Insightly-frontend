import { Button } from "@/components/ui/button";
import { ArrowRight, Link2, MessageSquare, Users } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center py-20 mb-20">
        <h1 className="text-5xl md:text-7xl font-bold text-content-primary mb-6">
          <span className="text-3xl font-bold mb-8 border-accent-orange border-b-2 pb-2 w-fit">
            Connect{" "}
          </span>
          with your
          <span className="text-accent-orange"> audience</span>
        </h1>
        <p className="text-xl md:text-2xl text-content-secondary mb-8 max-w-3xl mx-auto">
          Create your personalized link page, share all your content in one
          place, and receive valuable anonymous feedback from your followers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register">
            <Button>
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="secondary">See Demo</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 mb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className=" bg-accent-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Link2 className="h-8 w-8 text-accent-orange" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              All Your Links in One Place
            </h3>
            <p className="text-content-secondary">
              Share your social media, website, portfolio, and more with a
              beautiful, customizable page.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-accent-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-accent-orange" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Anonymous Feedback</h3>
            <p className="text-content-secondary">
              Receive honest, anonymous feedback from your audience to improve
              your content.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-accent-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-accent-orange" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Grow Your Audience</h3>
            <p className="text-content-secondary">
              Optimize your online presence and build stronger connections with
              your followers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 bg-background-secondary rounded-3xl shadow-sm">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to elevate your online presence?
        </h2>
        <p className="text-content-secondary mb-8 max-w-2xl mx-auto">
          Join thousands of creators who use Insightly to connect with their
          audience and grow their brand.
        </p>
        <Link
          href="/auth/register"
          className=" px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors inline-flex items-center"
        >
          <Button>Start Your Journey</Button>
        </Link>
      </section>
    </div>
  );
}
