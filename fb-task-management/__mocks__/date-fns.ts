export const format = jest.fn((date: Date, formatStr: string) => {
  if (formatStr === "MMM d, yyyy") {
    return "Jan 1, 2024";
  }
  if (formatStr === "MMM d") {
    return "Jan 1";
  }
  return "Mocked Date";
});

export const isToday = jest.fn(() => false);
export const isTomorrow = jest.fn(() => false);
export const isPast = jest.fn(() => false);