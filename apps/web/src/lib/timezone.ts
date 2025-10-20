export const formatInTimeZone = (
  isoDate: string,
  timeZone: string,
  options: Intl.DateTimeFormatOptions,
  locale = "en-US",
) => {
  return new Intl.DateTimeFormat(locale, { ...options, timeZone }).format(
    new Date(isoDate),
  );
};
