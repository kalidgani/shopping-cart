export const debounce =  (func : Function) => {
    let timer : any;
    return function (...args : any) {
      const context = this;
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
          timer = null;
          func.apply(context, args)
      },1000);
    }
  }

  export const getProduct = async (page : number,limit : number,value : string) =>{
    const response = await fetch(`http://localhost:4000/products?_page=${page ? page : 1}&_limit=${limit ? limit : 5}&q=${value ? value : ''}`);
    const data = await response.json();
    return data
  }