const year = new Date().getFullYear();
console.log(`Lycky Spa ready for ${year}`);

const VACATION_START = new Date('2026-11-20T00:00:00+01:00');
const VACATION_END = new Date('2026-11-28T00:00:00+01:00');
const VACATION_MESSAGE =
  'Semesterstängt från den 20 november till den 27 november – varmt välkommen tillbaka den 28 november!';

function isVacationBannerActive(now = new Date()) {
  return now >= VACATION_START && now < VACATION_END;
}

function mountVacationBanner() {
  const now = new Date();
  if (!isVacationBannerActive(now)) return;
  if (!document.body || document.querySelector('.vacation-banner')) return;

  const banner = document.createElement('div');
  banner.className = 'vacation-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Viktigt meddelande');

  const track = document.createElement('div');
  track.className = 'vacation-banner__track';

  const createGroup = (isClone) => {
    const group = document.createElement('div');
    group.className = 'vacation-banner__group';
    if (isClone) {
      group.setAttribute('aria-hidden', 'true');
    }

    for (let i = 0; i < 3; i += 1) {
      const item = document.createElement('span');
      item.className = 'vacation-banner__item';
      if (isClone || i > 0) {
        item.setAttribute('aria-hidden', 'true');
      }
      item.textContent = VACATION_MESSAGE;
      group.appendChild(item);

      const sep = document.createElement('span');
      sep.className = 'vacation-banner__sep';
      sep.setAttribute('aria-hidden', 'true');
      sep.textContent = '•';
      group.appendChild(sep);
    }

    return group;
  };

  track.appendChild(createGroup(false));
  track.appendChild(createGroup(true));
  banner.appendChild(track);
  document.body.prepend(banner);

  const msUntilEnd = VACATION_END.getTime() - now.getTime();
  if (msUntilEnd > 0 && msUntilEnd <= 2147483647) {
    setTimeout(() => {
      banner.remove();
    }, msUntilEnd);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountVacationBanner, { once: true });
} else {
  mountVacationBanner();
}
