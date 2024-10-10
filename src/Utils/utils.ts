import { format, formatDistanceToNow, parseISO } from "date-fns";
import { arSA } from "date-fns/locale";

export const Utils = {
  getUUID: (): string => {
    const randomSegment = (): string => "xxxx".replace(/[x]/g, () => (crypto.getRandomValues(new Uint8Array(1))[0] % 16).toString(16));
    return `${Date.now()}-${randomSegment()}-${randomSegment()}-${randomSegment()}-${randomSegment()}`;
  },

  formatDate: (date: Date | string) => format(parseISO(date as any), "yyyy-MM-dd", { locale: arSA }),
  formatTime: (date: Date | string) => format(parseISO(date as any), "hh:mm a", { locale: arSA }),
  formatDateTime: (date: Date | string) => format(parseISO(date as any), "yyyy-MM-dd / hh:mm a", { locale: arSA }),
  formatDateTimeFromNow: (date: Date | string) => formatDistanceToNow(parseISO(date as any), { locale: arSA }),

  formatNumber: (number: number) => (number ? number.toLocaleString("en-US") : number) as string,
  getDayOfWeek: (date: Date | string) => format(parseISO(date as any), "EEEE", { locale: arSA }),

  formatTransactionAmount: (number: number) => Utils.formatNumber(Math.abs(number)),

  formatPrice: (price: number, currency: string = "") => {
    const _price = price.toFixed(2);
    return currency ? new Intl.NumberFormat("en-US", { style: "currency", currency }).format(parseFloat(_price)) : parseFloat(_price).toLocaleString("en-US");
  },

  formatPhoneNumber:
    document.documentElement.dir === "rtl"
      ? (phoneNumber: string) => phoneNumber.replace("+964", "0").replace(/(\d{4})(\d{3})(\d{4})/, "$3 $2 $1")
      : (phoneNumber: string) => phoneNumber.replace("+964", "0").replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3"),

  numberToEnglish: (number: string) => {
    return number.replace(/٠|١|٢|٣|٤|٥|٦|٧|٨|٩/g, (d) => (d.charCodeAt(0) - 1632).toString());
  },
};

export const GetFormattedDate = ({ date }: { date: string | Date }) => {
  const long = format(parseISO(date as any), "yyyy-MM-dd");
  const short = format(parseISO(date as any), "hh:mm a");
  return { short, long };
};

export const TimeToString = (date: string | Date) => {
  if (!date) return null;
  return formatDistanceToNow(parseISO(date as any), { locale: arSA, addSuffix: true }).replace(/٠|١|٢|٣|٤|٥|٦|٧|٨|٩/g, (d) =>
    (d.charCodeAt(0) - 1632).toString()
  );
};

export const StringToFormattedNumber = (value: any) => {
  return value
    ?.replace(/,/g, "")
    .replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
    .replace(/[^0-9]/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const listnToOutsideClick = ({ event, selector }: { event: () => void; selector: HTMLElement }) => {
  const outsideClickListener = (e: MouseEvent) => {
    if (!selector.contains(e.target as Node)) {
      event();
      removeClickListener();
    }
  };
  const removeClickListener = () => {
    document.removeEventListener("click", outsideClickListener);
  };
  document.addEventListener("click", outsideClickListener);
};

export const FormatInputAsNumber = {
  onKeyDown: (e) => {
    if (e.key === "e" || e.key === "E" || e.key === "." || (e.key === "0" && !e.currentTarget.value)) e.preventDefault();
  },
  onInput: ({ currentTarget }) => {
    try {
      currentTarget.value = StringToFormattedNumber(currentTarget.value);
    } catch (e) {
      console.log("error", e);
    }
  },
};

export function getTimeSpanQuery(keyFrom = "from", keyTo = "to") {
  if (!storedSpans) {
    const { today, yesterDay, lastWeek, lastMonth, lastYear } = getDates();
    storedSpans = {
      today: `${keyFrom}=${today}`,
      yesterDay: `${keyFrom}=${yesterDay}&${keyTo}=${today}`,
      lastWeek: `${keyFrom}=${lastWeek}&${keyTo}=${today}`,
      lastMonth: `${keyFrom}=${lastMonth}&${keyTo}=${today}`,
      lastYear: `${keyFrom}=${lastYear}&${keyTo}=${today}`,
    };
  }
  return storedSpans;
}

function getDates(now = new Date()) {
  // const timezoneOffsetPPPP = now.getTimezoneOffset() * 60000; // Offset in milliseconds
  const timezoneOffset = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const time = today.getTime(); // + timezoneOffset;

  const yesterDay = new Date(time - 24 * 60 * 60 * 1000).toISOString();
  const lastWeek = new Date(time - 7 * 24 * 60 * 60 * 1000).toISOString();
  const lastMonth = new Date(time - 30 * 24 * 60 * 60 * 1000).toISOString();
  const lastYear = new Date(time - 365 * 24 * 60 * 60 * 1000).toISOString();

  return {
    today: today.toISOString(),
    yesterDay,
    lastWeek,
    lastMonth,
    lastYear,
  };
}
let storedSpans = null as {
  today: string;
  lastWeek: string;
  lastMonth: string;
  lastYear: string;
  yesterDay: string;
};
