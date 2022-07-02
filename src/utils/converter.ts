import { CONVERTER } from 'config/constants';

export const byteToKilobyte = (
  byte: number = 0,
  fractionDigits: number = 0,
) => {
  return (byte * CONVERTER.BYTE_TO_KILOBYTE).toFixed(fractionDigits);
};
