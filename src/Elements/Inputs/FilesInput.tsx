import { IInputController, IconInputProps } from "./types";
import { ILabeledController, LabeledElement } from "../ElementsContainers";
import { useRef } from "react";
import { Icon, IconKey } from "@/Assets";
// import { FormBee, IFormHive, INestedFormHive, createHive } from "@/Libs/eze-services";
import { FormBee, IFormHive, INestedFormHive, createHive } from "@/Libs/eze-services";
import { ImageBase64 } from "@/Components";
import { Label } from "../Labels/Labels";
import { Popup, PopupMe, ScaleMe } from "@/Libs/eze-spark";
import { IconButton } from "../Buttons/Buttons";
import { Selector } from "../Selectors";
import { Wrapper } from "@/Containers";
import useCamera from "../Hooks/useCamera";

interface IImageInputController extends IInputController {
  multiple?: boolean;
  accept?: string;
  capture?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  icon?: IconKey;
  variant?: string;
}

export const Image = (props: IImageInputController) => <LabeledElement Element={ImageInput} {...props} />;
export const ImageController = (props: IImageInputController) => <ILabeledController Element={ImageInput} {...props} />;
export const ImageInput = ({
  type = "file",
  multiple = false,
  max = 2,
  value,
  setValue,
  icon = "camera-outline",
  variant = "big",
  onChange = setValue
    ? (e) => {
        const file = multiple ? e.target.files : e.target.files;
        if (max) {
          if (file.length > max) {
            alert(`You can only upload ${max} files`);
            return;
          }
        }
        const _value = multiple
          ? Array.from(file)
              .filter(({ name }) => {
                if (!value) return true;
                return value?.find((f: any) => f.file.name === name) ? false : true;
              })
              .map((file) => ({ file, src: URL.createObjectURL(file) }))
          : { file: file[0], src: URL.createObjectURL(file[0]) };
        setValue(multiple ? [...(_value as any), ...value] : _value);
      }
    : undefined,
  ...props
}: IconInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() => {
        inputRef.current?.click();
      }}
      className={"image-controller-container pointer image-contrller-" + variant}>
      {(!value || (multiple && value?.length < max)) && <Icon icon={icon} className="my-auto fill-white text-owl size:70px round-md p-xs pointer" />}
      {value &&
        (multiple ? (
          value.map((file: any) => (
            <ImageViewer
              removeMe={() => {
                setValue(value.filter((f: any) => f !== file));
                inputRef.current.value = "";
              }}
              src={file}
            />
          ))
        ) : (
          <MixedImageViewer
            src={value}
            variant="big"
            removeMe={() => {
              setValue(null);
              inputRef.current.value = "";
            }}
          />
        ))}
      <input type={type} multiple={multiple} onChange={onChange} {...props} ref={inputRef} />
    </div>
  );
};

// export const CustomImageController = (props: IImageInputController) => <ILabeldController Element={CustomImageInput} {...props} />;

// export const CustomImageInput = ({
//   type = "file",
//   multiple = false,
//   max = 2,
//   value,
//   setValue,
//   onChange = setValue
//     ? (e) => {
//         const file = multiple ? e.target.files : e.target.files;
//         if (max) {
//           if (file.length > max) {
//             alert(`You can only upload ${max} files`);
//             return;
//           }
//         }
//         const _value = multiple
//           ? Array.from(file)
//               .filter(({ name }) => {
//                 if (!value) return true;
//                 return value?.find((f: any) => f.file.name === name) ? false : true;
//               })
//               .map((file) => ({ file, src: URL.createObjectURL(file) }))
//           : { file: file[0], src: URL.createObjectURL(file[0]) };
//         setValue(multiple ? [...(_value as any), ...value] : _value);
//       }
//     : undefined,
//   ...props
// }: IconInputProps) => {
//   const inputRef = useRef<HTMLInputElement>(null);
//   return (
//     <div className="image-controller-container">
//       {(!value || (multiple && value?.length < max)) && (
//         <Icon
//           icon="add-outline"
//           className="my-auto bg-prim text-primary size:50px round-md p-xs pointer"
//           onClick={() => {
//             inputRef.current?.click();
//           }}
//         />
//       )}
//       {value &&
//         (multiple ? (
//           value.map((file: any) => (
//             <ImageViewer
//               removeMe={() => {
//                 setValue(value.filter((f: any) => f !== file));
//                 inputRef.current.value = "";
//               }}
//               src={file?.src}
//             />
//           ))
//         ) : (
//           <ImageViewer
//             src={value?.src}
//             removeMe={() => {
//               setValue(null);
//               inputRef.current.value = "";
//             }}
//           />
//         ))}
//       <input type={type} multiple={multiple} onChange={onChange} {...props} ref={inputRef} />
//     </div>
//   );
// };

export const ImageViewer = ({ src, removeMe, variant = "small" }: any) => (
  <div className="relative">
    <Icon
      onClick={removeMe}
      icon="trash-outline"
      className="absolute pointer bg-red fill-white size:25px round-md p-xs"
      style={{ bottom: "-5px", insetInlineStart: "-5px" }}
    />
    <img
      src={src.src}
      className={"image-controller-container pointer image-contrller-" + variant}
      onClick={({}) => {
        PopupMe(<img src={src.src} className="max-h:90% round-md max-w:90vw" />, {});
      }}
    />
  </div>
);
export const MixedImageViewer = ({ src, variant = "small", removeMe }: any) => {
  if (!src) return;
  let _src = src;
  if (_src.file) _src = src.src;
  else if (_src.url) _src = src.url;
  return (
    <div className="relative col">
      <Icon
        onClick={removeMe}
        icon="close-outline"
        className="absolute pointer bg-red fill-white size:22px round-md p-xs"
        style={{ top: "-4px", insetInlineStart: "-4px" }}
      />
      <img
        src={_src}
        className={"image-controller-container pointer image-contrller-" + variant}
        onClick={({ currentTarget }) => {
          PopupMe(
            <div className="h:50vh round-xl w:90vw max-w:720px m-auto round-md">
              <img
                src={_src}
                className="w-full h-full round-xl"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>,
            {
              placement: "top",
              overlay: true,
              childClass: "bg-king p-0",

              // target: currentTarget,
              // removeOnOutClick: true,
              // placement: "horizontal",
            }
          );
        }}
      />
    </div>
  );
};

// <ImageBase64
//   base64={src}
//   className={"image-controller-container pointer image-contrller-" + variant}
//   onClick={({ currentTarget }) => {
//     PopupMe(<ImageBase64 base64={src} className="max-h:90% round-md max-w:90vw" />, {});
//   }}
// />
export const ImageBase64Viewer = ({
  hive,
  id,
  className = "",
  varint = "default",
  ...props
}: {
  hive: IFormHive<any>;
  alt: string;
  className?: string;
  varint?: string;
  id: string;
}) => (
  <div className="col gap-xl">
    <Label label={id as any} />
    <FormBee
      hive={hive.getNestedHive(id)}
      Component={({ honey }) => (
        <ImageBase64
          base64={honey}
          className={`images-base64-${varint} ${className}`}
          onClick={({ currentTarget }) => {
            PopupMe(<ImageBase64 base64={honey} className="h:90% round-md" {...props} />, {});
            // ScaleMe(
            //   <div className="col gap-xl">
            //     <Label label={id as any} />
            //     <FormBee
            //       hive={hive.getNestedHive(id)}
            //       Component={({ honey }) => <ImageBase64 base64={honey} className={`images-base64-${varint} ${className}`} {...props} />}
            //     />
            //   </div>,
            //   {
            //     target: currentTarget.parentElement,
            //     placement: "fill",
            //     removeOnOutClick: true,
            //     childClass: "bg-red",
            //   }
            // );
          }}
          {...props}
        />
      )}
    />
  </div>
);

// images capture

// export const ImageCaptureController = (props: IImageInputController) => <IController Element={ImageCaptureLabeled} {...props} />;
// export const ImageCaptureLabeled = (props: IImageInputController) => <LabeledElement Element={ImageCaptureInput} {...props} />;
export const ImageCaptureController = (props: IImageInputController) => <ILabeledController Element={ImageCaptureInput} {...props} />;
export const ImageCaptureInput = ({
  type = "file",
  multiple = false,
  max = 2,
  value,
  setValue,
  icon = "camera-outline",
  variant = "big",
  online,
}: IconInputProps) =>
  online ? (
    <div
      onClick={() => {
        const id = "image_capture";
        PopupMe(ImageCapture, {
          id,
          componentProps: {
            setValue: (newPhoto) => {
              setValue(newPhoto);
            },
            close: () => {
              Popup.remove(id);
            },
          },
          animation: "slide-bottom",
          removeOnOutClick: false,
          childClass: "capture-popup",
        });
      }}
      className={"image-controller-container pointer image-contrller-" + variant}>
      <img src={value} />
    </div>
  ) : (
    <>
      <div
        onClick={() => {
          const id = "image_capture";
          PopupMe(ImageCapture, {
            id,
            componentProps: {
              setValue: (newPhoto) => {
                setValue(newPhoto);
              },
              close: () => {
                Popup.remove(id);
              },
            },
            animation: "slide-bottom",
            removeOnOutClick: false,
            childClass: "capture-popup",
          });
        }}
        className={"image-controller-container pointer image-contrller-" + variant}>
        {(!value || (multiple && value?.length < max)) && <Icon icon={icon} className="my-auto size:60px round-md p-xs pointer fill-white" />}
        {value &&
          (multiple ? (
            value.map((file: any) =>
              file ? (
                <ImageViewer
                  removeMe={() => {
                    setValue(value.filter((f: any) => f !== file));
                  }}
                  src={`data:image/png;base64,${file}`}
                />
              ) : (
                <div>
                  <p>Image</p>
                </div>
              )
            )
          ) : (
            <ImageViewer
              src={`data:image/png;base64,${value}`}
              removeMe={() => {
                setValue(null);
              }}
            />
          ))}
      </div>
    </>
  );

const photosHive = createHive([]);

const CaptureViewer = ({ src, alt }) => {
  return <img className="width:300px" src={src} alt={alt} />;
  return <img src={src.startsWith("data:image") ? src : `data:image/jpeg;base64,${src}`} alt={alt} />;
};

export const ImageCapture = ({ setValue, close }: IImageInputController) => {
  const { stream, stopSteam, takePhoto, availableCameras, setCameraSource, camerSource } = useCamera();

  const stop = () => {
    stopSteam();
    close?.();
  };

  return stream ? (
    <Wrapper className="col gap-xl">
      {stream && (
        <div className="capture-video-source">
          <video
            className="w-full round-md"
            ref={(video) => {
              if (!video) return;
              video.srcObject = stream;
            }}
            autoPlay
          />
        </div>
      )}
      {/* {availableCameras?.map(({ deviceId, label }) => (
        <div
          key={deviceId}
          onClick={() => {
            setCameraSource(deviceId);
          }}>
          {label}
        </div>
      ))} */}
      {availableCameras?.length && (
        <Selector
          value={camerSource}
          options={availableCameras.map(({ deviceId, label }) => ({ label, value: deviceId }))}
          setValue={(value) => setCameraSource(value)}
        />
      )}
      <div className="row justify-around">
        <IconButton
          icon="camera-outline"
          label="capture"
          // className="size:50px bg-owl round-md p-sm fill-primary pointer"
          onClick={() => {
            takePhoto((newPhoto) => {
              // console.log(Math.round(newPhoto.length / 1000) + "KB");
              // photosHive.setHoney((prev) => [newPhoto, ...prev]);
              // photosHive.setHoney([newPhoto]);
              stop();
              setValue(newPhoto);
            });
          }}
        />
        <IconButton
          icon="close-circle-outline"
          onClick={stop}
          label="close"
          containerClass="bg-red"
          // className="size:50px bg-owl round-md p-sm fill-red pointer"
        />
        {/* <Icon icon="alt-arrow-down-outline" onClick={start} /> */}
      </div>
      {/* <Bee
        hive={photosHive}
        Component={({ honey }) => {
          return (
            <div className="wrap">
              {honey.map((photo) => (
                <CaptureViewer src={photo} alt="photo" />
              ))}
            </div>
          );
        }}
      /> */}
    </Wrapper>
  ) : null;
};
