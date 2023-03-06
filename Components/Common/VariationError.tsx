export function VariantError({errors, i} : any) {
    return (
      <p className="text-danger">{errors?.[i]?.variant?.message}</p>
    )
  }
  
  export function PriceError({errors, i} : any) {
    return (
        <p className="text-danger">{errors?.[i]?.price?.message}</p>
    )
  }

  export function StockError({errors, i} : any) {
    return (
        <p className="text-danger">{errors?.[i]?.stock?.message}</p>
    )
  }