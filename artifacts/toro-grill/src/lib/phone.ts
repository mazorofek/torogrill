export function formatPhoneForWhatsApp(phone: string): string {
  let number = phone.replace(/[^\d+]/g, "");

  if (number.startsWith("+")) {
    number = number.slice(1);
  } else if (number.startsWith("00")) {
    number = number.slice(2);
  }

  number = number.replace(/\D/g, "");

  if (number.startsWith("9720")) {
    return `972${number.slice(4)}`;
  }

  if (number.startsWith("0")) {
    return `972${number.slice(1)}`;
  }

  return number;
}

export function formatPhoneForTel(phone: string): string {
  const normalized = formatPhoneForWhatsApp(phone);
  return normalized ? `+${normalized}` : phone;
}
