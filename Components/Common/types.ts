type variation = {
  variant: number;
  price: number;
  stock: number;
  productImage: string;
};

export type formValue = {
  id: string;
  productName: string;
  description: string;
  category: string;
  status: string;
  price: number;
  comparePrice: number;
  costPerItem: number;
  taxRate: number;
  variation: variation[];
  error?:string;
};

 type productList = {
    id: string;
    productName: string;
    description: string;
    category: string;
    status: string;
    price: number;
    variation: variation[];
  };

  export type product = {
    product : productList
  }

 export type login = {
    email : string;
    password : string;
  };

  export type activeUser = {
    email : string;
  }


