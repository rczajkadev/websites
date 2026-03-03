const long_date_formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const short_date_formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});

export const formatDateLong = (value?: string | null) => {
  return value ? long_date_formatter.format(new Date(value)) : '';
};

export const formatDateShort = (value?: string | null) => {
  return value ? short_date_formatter.format(new Date(value)) : '';
};
