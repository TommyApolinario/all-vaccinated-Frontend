export interface IExistencia {
  id: number;
  name: string;
  description: string;
  lote: string;
  quantity: number;
  admissionDate: string;
  expirationDate: string;
  laboratory: {
    id: number;
    name: string;
    address: string;
    email: string;
  };
}
