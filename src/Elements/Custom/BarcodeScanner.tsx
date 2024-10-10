// import { BarcodeScanner as BC } from "react-barcode-scanner";
// import "react-barcode-scanner/polyfill";
type Props = {};

const BarcodeScanner = (props: Props) => {
  return (
    <div>test</div>
    // <BC
    //   onCapture={(barcode) => {
    //     console.log(barcode);
    //   }}
    //   //   options={{
    //   //     // formats: ["code_128"],
    //   //   }}
    // />
  );
};

export default BarcodeScanner;

// export const BarcodeScanner = ({ handleError, setValue }: { handleError?: (err) => void; setValue: (data?: { text: string }) => void }) => (
//   <Icon
//     icon="qr-outline"
//     className="bg-primary fill-white round-sm p-md"
//     onClick={() => {
//       const popupQrId = "qr-reader";
//       PopupMe(
//         <div className="h:300px w:300px">
//           <QrReader
//             onResult={(data) => {
//               if (data) {
//                 setValue(data.text);
//                 Popup.remove(popupQrId);
//               }
//             }}
//           />
//           <Button
//             label="cancel"
//             onClick={() => {
//               Popup.remove(popupQrId);
//             }}
//           />
//         </div>,
//         {
//           id: popupQrId,
//         }
//       );
//     }}
//   />
// );
