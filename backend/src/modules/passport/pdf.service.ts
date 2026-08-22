export class PassportPdfService {
  async generate(data: unknown) {
    return {
      format: 'pdf',
      status: 'prepared',
      data,
    };
  }
}

export const passportPdfService = new PassportPdfService();
