export interface DocumentUploadInput {
  vehicleId: string;
  filename: string;
  mimeType: string;
  size: number;
}

export function validateDocumentUpload(input: DocumentUploadInput) {
  const allowed = [
    'application/pdf',
    'image/jpeg',
    'image/png'
  ];

  return allowed.includes(input.mimeType);
}
