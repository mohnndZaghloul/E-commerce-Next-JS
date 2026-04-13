export type Product_TP = {
  id: string;
  title: string;
  price: number;
  rating: number;
  description: string;
  tags: string[];
  images: string[];
  createAt: Date;
  actions?: string;
};

export type ProductFormActionState_TP = {
  errors: {
    title?: string[];
    price?: string[];
    description?: string[];
    tags?: string[];
    images?: string[];
    general?: string[];
  };
  inputs: {
    title: string;
    price: string;
    description: string;
    tags: string;
    images: string[];
  };
  success?: boolean;
};

export type Customer_TP = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  image: string | null;
  actions?: string;
};

export type FormInput_TP = {
  name?: string;
  placeholder?: string;
  value?: string | string[];
  className?: string;
  minlength?: number;
  maxlength?: number;
  step?: string;
  type?: string;
  error?: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement, HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) => void;
  textarea?: boolean;
  accept?: string;
  multiple?: boolean;
};

export type ProductFormErrors = {
  title?: string[];
  price?: string[];
  description?: string[];
  tags?: string[];
  images?: string[];
  general?: string[];
};
