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

export interface editExistenceI {
  id: string;
  name: string;
  lote: string;
  admission_date: string;
  expiration_date: string;
}
