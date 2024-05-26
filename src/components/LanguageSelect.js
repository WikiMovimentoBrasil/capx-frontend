export default function LanguageSelect() {
  const options = process.env.NEXT_PUBLIC_LANGUAGES.split(",").map((lang) => ({ value: lang, label: lang }));

  return (
    <div className="my-auto"></div>
  )
}