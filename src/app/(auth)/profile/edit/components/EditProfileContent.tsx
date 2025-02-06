"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useApp } from "@/contexts/AppContext";
import { Session } from "next-auth";
import { useProfile } from "@/hooks/useProfile";
import { useSkills } from "@/hooks/useSkills";
import { useTerritories } from "@/hooks/useTerritories";
import { useLanguage } from "@/hooks/useLanguage";
import { useAffiliation } from "@/hooks/useAffiliation";
import { useWikimediaProject } from "@/hooks/useWikimediaProject";
import { useAvatars } from "@/hooks/useAvatars";
import EditProfileHeader from "./EditProfileHeader";
import EditProfileForm from "./EditProfileForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Language } from "@/types/language";

interface EditProfileContentProps {
  session: Session;
}

export default function EditProfileContent({
  session,
}: EditProfileContentProps) {
  const router = useRouter();
  const { darkMode } = useTheme();
  const { isMobile } = useApp();
  const token = session?.user?.token;
  const userId = session?.user?.id;

  const { profile, isLoading, error, updateProfile, refetch } = useProfile(
    token,
    Number(userId)
  );
  const { skills } = useSkills();
  const { territories } = useTerritories(token);
  const { languages } = useLanguage(token);
  const { affiliations } = useAffiliation(token);
  const { wikimediaProjects } = useWikimediaProject(token);
  const { avatars } = useAvatars();

  useEffect(() => {
    if (!token || !userId) {
      router.push("/");
    }
  }, [token, userId, router]);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar perfil</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <EditProfileHeader darkMode={darkMode} isMobile={isMobile} />
      <EditProfileForm
        profile={profile}
        updateProfile={updateProfile}
        refetch={async () => {
          await refetch();
        }}
        skills={skills}
        territories={territories}
        languages={(languages?.data || []) as Language[]}
        affiliations={affiliations}
        wikimediaProjects={wikimediaProjects}
        avatars={avatars || []}
        darkMode={darkMode}
        isMobile={isMobile}
      />
    </div>
  );
}
