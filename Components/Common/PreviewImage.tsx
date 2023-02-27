
function PreviewImage({ file }: any) {

  return (
      <img src={`data:image/png;base64,${file}`} alt="preview" width="150px" height="80px" />
  );
}

export default PreviewImage;
