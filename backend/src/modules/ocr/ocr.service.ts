import { OCRVehicleDocumentResult } from './ocr.types';

export class OCRService {
  async processText(text: string): Promise<OCRVehicleDocumentResult> {
    const mileage = text.match(/(\d{5,6})\s?(km|KM)?/i);
    const amount = text.match(/(\d+[,.]?\d*)\s?€/);

    return {
      rawText: text,
      mileage: mileage ? Number(mileage[1]) : undefined,
      amount: amount ? Number(amount[1].replace(',', '.')) : undefined,
      items: []
    };
  }
}

export const ocrService = new OCRService();
