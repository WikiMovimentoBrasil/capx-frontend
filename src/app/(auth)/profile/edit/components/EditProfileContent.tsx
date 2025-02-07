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
import EditProfileForm from "./EditProfileForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Language } from "@/types/language";
import { Territory } from "@/types/territory";

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

  // Converter objetos em arrays
  const territoriesArray = Object.entries(territories || {}).map(
    ([id, territory]) => ({
      id: id,
      name: (territory as Territory).name,
    })
  );

  const languagesArray = Object.entries(languages || {}).map(([id, name]) => ({
    id: Number(id),
    language_name: name as string,
    language_code: id,
  }));

  const affiliationsArray = Object.entries(affiliations || {}).map(
    ([id, name]) => ({
      id: id,
      name: name as string,
    })
  );

  const wikimediaProjectsArray = Object.entries(wikimediaProjects || {}).map(
    ([id, name]) => ({
      id: id,
      name: name as string,
    })
  );

  useEffect(() => {
    if (!token || !userId) {
      router.push("/");
    }
  }, [token, userId, router]);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar perfil</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <EditProfileForm
        profile={profile}
        updateProfile={updateProfile}
        refetch={async () => {
          await refetch();
        }}
        skills={skills?.data || []}
        territories={territoriesArray}
        languages={languagesArray}
        affiliations={affiliationsArray}
        wikimediaProjects={wikimediaProjectsArray}
        avatars={avatars || []}
        darkMode={darkMode}
        isMobile={isMobile}
      />
    </div>
  );
}
