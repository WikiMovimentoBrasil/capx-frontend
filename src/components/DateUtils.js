
export function localDate(date, locale = 'default') {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date ? new Intl.DateTimeFormat(locale, options).format(new Date(date)) : null;
}
