"use client";

interface WikidataSectionProps {
  isWikidataSelected: boolean;
  onWikidataClick: () => void;
  darkMode: boolean;
}

export default function WikidataSection({
  isWikidataSelected,
  onWikidataClick,
  darkMode,
}: WikidataSectionProps) {
  return (
    <div className="space-y-2">
      <h3
        className={`text-lg font-semibold ${
          darkMode ? "text-white" : "text-[#053749]"
        }`}
      >
        Item do Wikidata
      </h3>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="wikidata-consent"
          checked={isWikidataSelected}
          onChange={onWikidataClick}
          className="w-4 h-4 rounded border-gray-300 text-[#053749] focus:ring-[#053749]
            dark:border-gray-600 dark:focus:ring-white"
        />
        <label
          htmlFor="wikidata-consent"
          className={`text-sm ${darkMode ? "text-white" : "text-[#053749]"}`}
        >
          Eu autorizo a exibição do meu item no Wikidata no perfil do CapX (se
          existir).
        </label>
      </div>

      {isWikidataSelected && (
        <p
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Sua imagem do Wikidata será usada como foto de perfil.
        </p>
      )}
    </div>
  );
}
