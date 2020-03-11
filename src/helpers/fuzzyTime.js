import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/polyfill-locales';

const timeFormatter = new Intl.RelativeTimeFormat(undefined, { numeric: 'always', style: 'long' });
export default (now, unix) => {
  const other = (unix * 1000);

  const units = [
    { unit: 'day', value: 1000 * 60 * 60 * 24 },
    { unit: 'hour', value: 1000 * 60 * 60 },
    { unit: 'minute', value: 1000 * 60 },
    { unit: 'second', value: 1000 },
  ];
  const baseDiff = now - other;
  for(const unit of units) {
    if (baseDiff >= unit.value) {
      return timeFormatter.format(Math.round(baseDiff / -unit.value), unit.unit);
    }
  }
  return 'just now';
};

