
function Error({errors} : any) {
  return (
    <p className="text-danger">{errors?.message}</p>
  )
}

export default Error