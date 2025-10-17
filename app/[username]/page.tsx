import { PublicProfile } from "@/components/public/profile";
import { LinkItem, linksAPI, userAPI, UserProfile } from "@/lib/api/endpoints";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function PublicProfilePage({ params }: PageProps) {
  try {
    const [userResponse, linksResponse] = await Promise.all([
      userAPI.getPublicProfile(params.username),
      linksAPI.getPublicLinks(params.username),
    ]);

    const user = userResponse.data as UserProfile;
    const links = linksResponse.data as LinkItem[];

    return <PublicProfile user={user} links={links} />;
  } catch {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const response = await userAPI.getPublicProfile(params.username);
    const user = response.data as UserProfile;

    return {
      title: `${user.name} - Insightly`,
      description: user.bio || `Connect with ${user.name} on Insightly`,
    };
  } catch {
    return {
      title: "Profile Not Found - Insightly",
    };
  }
}
