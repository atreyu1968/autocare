export enum VehicleDocumentType {
  FACTURA = 'FACTURA',
  ITV = 'ITV',
  SEGURO = 'SEGURO',
  MANUAL = 'MANUAL',
  FOTO = 'FOTO',
  INFORME = 'INFORME',
  PRESUPUESTO = 'PRESUPUESTO'
}

export interface VehicleDocumentMetadata {
  vehicleId: string;
  type: VehicleDocumentType;
  filename: string;
  mimeType: string;
  storagePath: string;
}
