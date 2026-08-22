export interface OCRVehicleDocumentResult {
  rawText: string;
  date?: string;
  mileage?: number;
  amount?: number;
  items: string[];
}

export interface OCRProvider {
  extract(text: string): Promise<OCRVehicleDocumentResult>;
}
