type Props = {
  base64: string;
  className?: string;
  style?: { [key: string]: any };
  [key: string]: any;
};

const ImageBase64 = ({ base64, ...props }: Props) => {
  return <img src={`data:image/<image-type>;base64,${base64}`} {...props} />;
};

export default ImageBase64;
