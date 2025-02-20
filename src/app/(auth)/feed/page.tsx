"use client";

import ProfileCard from "./components/Card";

export enum ProfileType {
  Learner = 'learner',
  Sharer = 'sharer',
}

export default function FeedPage() {
  // TODO: Its a temp mock here. Get actual data from API
  const profiles = [
    { username: "Learner 1", capacities: [], type: ProfileType.Learner, territory: "Brazil" },
    { username: "Sharer 1", type: ProfileType.Sharer, capacities: [61] },
    { username: "Org Sharer 2", capacities: [], type: ProfileType.Sharer, languages: ["português"], avatar: "https://upload.wikimedia.org/wikipedia/commons/4/45/Wiki_Movimento_Brasil_logo.svg" },
    { username: "Sharer 3", capacities: [41, 43, 59, 61, 135], type: ProfileType.Sharer, territory: "Brazil", languages: ["português", "inglês", "espanhol", "japonês", "francês"], avatar: "https://commons.wikimedia.org/wiki/Special:Redirect/file/CapX_-_Avatar_-_3.svg" },
    { username: "Sharer With A Huge Name To Test On Device 4", capacities: [41, 43, 59, 61, 135], type: ProfileType.Sharer, territory: "Brazil", languages: ["português", "inglês", "espanhol", "japonês", "francês"], avatar: "https://commons.wikimedia.org/wiki/Special:Redirect/file/CapX_-_Avatar_-_3.svg" }
  ];

  return (
    <div className="w-full flex flex-col items-center pt-24 md:pt-8">
      <div className="container mx-auto px-4">
        <div className="md:max-w-[1200px] w-full max-w-sm mx-auto space-y-6">
          {profiles.map((profile, index) => (
            <ProfileCard 
              key={index}
              username={profile.username}
              type={profile.type}
              capacities={profile.capacities}
              avatar={profile.avatar}
              languages={profile.languages}
              territory={profile.territory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
