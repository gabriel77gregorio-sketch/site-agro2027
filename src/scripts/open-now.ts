import { site } from '../config/site';

type Hour = (typeof site.hours)[number];

export const hoursData = (): Hour[] => site.hours;

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const fmt = (hhmm: string) => hhmm.replace(':', 'h');

/** Hora e dia da semana atuais em Brasília, independente do fuso do visitante. */
function nowInSaoPaulo() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return {
    day: days.indexOf(get('weekday')),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

export interface OpenStatus {
  open: boolean;
  text: string;
}

export function getOpenStatus(hours: Hour[]): OpenStatus {
  const { day, minutes } = nowInSaoPaulo();
  const today = hours.find((h) => h.days.includes(day));

  if (today && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, text: `Aberto agora, fechamos às ${fmt(today.close)}` };
  }

  if (today && minutes < toMin(today.open)) {
    return { open: false, text: `Fechado agora. Abrimos hoje às ${fmt(today.open)}` };
  }

  const nomes = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  for (let i = 1; i <= 7; i++) {
    const next = hours.find((h) => h.days.includes((day + i) % 7));
    if (next) {
      const when = i === 1 ? 'amanhã' : nomes[(day + i) % 7];
      return { open: false, text: `Fechado agora. Abrimos ${when} às ${fmt(next.open)}` };
    }
  }
  return { open: false, text: '' };
}

/** Preenche o elemento com o status e marca data-open para o CSS desenhar a bolinha. */
export function renderOpenStatus(el: HTMLElement | null) {
  if (!el) return;
  const s = getOpenStatus(hoursData());
  el.textContent = s.text;
  el.dataset.open = String(s.open);
}
