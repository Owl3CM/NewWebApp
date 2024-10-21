// import "intl-tel-input/build/css/intlTelInput.css";
// import intlTelInput from "intl-tel-input";
import { Label } from "@/Elements";
import { GetLabel, ILang } from "@/Language";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FormBee } from "@/Libs/eze-services";

type PhoneNumberProps = {
  hive?: any;
  id?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  containerClass?: string;
};
const PhoneNumberController = ({ hive, id = "phone_number", ...props }: PhoneNumberProps) => {
  return <PhoneNumberInput hive={hive} id={id} {...props} />;
};

export default PhoneNumberController;

const PhoneNumberInput = ({ id, hive, label = id as ILang, customLabel, containerClass = "", ...props }: ControllerElementProps) => {
  return (
    <FormBee
      hive={hive.getNestedHive(id)}
      Component={({ honey, validate, error }) => {
        return (
          <div className={"labled-element " + containerClass}>
            <Label className="input-label" customLabel={customLabel} label={GetLabel(label)} />
            <div data-form-error={error} className="icon-input input-outline col">
              <PhoneInput
                placeholder="0790 000 0000"
                value={honey}
                onChange={validate}
                defaultCountry="IQ"
                style={{ letterSpacing: "20px", direction: "ltr" }}
                className="text-left"
                onInput={({ currentTarget }) => {
                  currentTarget.maxLength = currentTarget.value.startsWith("+") ? 17 : 13;
                }}
                {...props}
              />
            </div>
          </div>
        );
      }}
    />
  );
};

// function validatePhoneNumberFormat(number, countryCode) {
//   const isValid = phoneInput.isValidNumber(number);
//   console.log({ isValid, number });

//   // if (isValid) {
//   //   phoneInput.setNumber(number);
//   // }
//   // else {
//   //   phoneInput.setNumber("");
//   // }
// }

// const countriesWithoutLeadingZero = [
//   "us", // United States
//   "ca", // Canada
//   "gb", // United Kingdom
//   "au", // Australia
//   "cn", // China
//   "de", // Germany
//   "fr", // France
//   "in", // India
//   "jp", // Japan
//   "br", // Brazil
//   "it", // Italy
//   "ru", // Russia
//   "kr", // South Korea
//   "mx", // Mexico
//   "es", // Spain
//   "id", // Indonesia
//   "nl", // Netherlands
//   "tr", // Turkey
//   "sa", // Saudi Arabia
//   "se", // Sweden
//   "ch", // Switzerland
//   "no", // Norway
//   "pl", // Poland
//   "be", // Belgium
//   "at", // Austria
//   "gr", // Greece
//   "dk", // Denmark
//   "fi", // Finland
//   "ie", // Ireland
//   "pt", // Portugal
//   "nz", // New Zealand
//   "sg", // Singapore
//   "hk", // Hong Kong
//   "tw", // Taiwan
//   "th", // Thailand
//   "vn", // Vietnam
//   "ph", // Philippines
//   "eg", // Egypt
//   "ar", // Argentina
//   "za", // South Africa
// ];

// import { useEffect, useRef, useState } from "react";
// import "intl-tel-input/build/css/intlTelInput.css";
// import intlTelInput from "intl-tel-input";
// import { IconInputController, Label } from "@/Elements";
// import { Controller } from "@/Libs/eze-forms";
// import { GetLabel, ILang } from "@/Language";
// import { FormBee } from "@/Libs/eze-services";

// type PhoneNumberProps = {
//   hive?: any;
//   id?: string;
// };
// let phoneInput: any;
// const PhoneNumberController = ({ hive, id = "phone" }: PhoneNumberProps) => {
//   const phoneInputRef = useRef(null);
//   const [selectedCountry, setSelectedCountry] = useState("iq");

//   useEffect(() => {
//     phoneInput = intlTelInput(phoneInputRef.current, {
//       utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
//       initialCountry: selectedCountry,
//     });
//     setTimeout(() => {
//       const input = document.querySelector(".iti__search-input");
//       input?.setAttribute("placeholder", GetLabel("search"));
//       phoneInputRef.current?.focus();
//     }, 10);

//     phoneInputRef.current.addEventListener("countrychange", handleCountryChange);

//     function handleCountryChange() {
//       phoneInputRef.current.value = "";
//       const countryCode = phoneInput.getSelectedCountryData().iso2; // Get the ISO 2-letter country code
//       setSelectedCountry(countryCode);
//     }

//     return () => {
//       phoneInput.destroy();
//     };
//   }, [selectedCountry]);

//   useEffect(() => {
//     const fetchCountryFromIP = async () => {
//       try {
//         const response = await fetch("https://ipapi.co/json/");
//         const data = await response.json();
//         return data.country_code.toLowerCase(); // Get country code (e.g., "us", "gb", "fr")
//       } catch (error) {
//         console.error("Error fetching country:", error);
//         return null;
//       }
//     };

//     const updateDefaultCountry = async () => {
//       const detectedCountry = await fetchCountryFromIP();
//       if (detectedCountry && detectedCountry != selectedCountry) setSelectedCountry(detectedCountry);
//     };
//     updateDefaultCountry();

//     return () => {};
//   }, []);

//   return <PhoneNumberInput hive={hive} id={id} Element={IconInputController} phoneInputRef={phoneInputRef} selectedCountry={selectedCountry} />;
//   // return (
//   //   <div className="icon-input input-outline">
//   //     <input ref={phoneInputRef} type="tel" name="phone" className="input" />
//   //   </div>
//   // );
// };

// export default PhoneNumberController;

// const PhoneNumberInput = ({
//   id,
//   hive,
//   label = id as ILang,
//   inputClass = "",
//   customLabel,
//   Element,
//   phoneInputRef,
//   containerClass = "",
//   selectedCountry = "iq",
//   ...props
// }: ControllerElementProps) => (
//   <FormBee
//     hive={hive.getNestedHive(id)}
//     Component={({ honey, validate, error }) => (
//       <div className={"labled-element" + containerClass}>
//         <Label className="input-label" customLabel={customLabel} label={GetLabel(label)} />
//         <div data-form-error={error} className="icon-input input-outline col">
//           {/* <Icon icon="phone" className="input-icon" /> */}
//           <input
//             onKeyDown={(e) => {
//               return;
//               // check the length of the value and prevent the user from typing more than global max length
//               if (!/^\d+$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
//                 e.preventDefault();
//               }
//             }}
//             onInput={({ currentTarget }) => {
//               let { value } = currentTarget as any;
//               const startsWithZero = value.startsWith("0");
//               if (value) {
//                 if (value.includes("+")) {
//                   currentTarget.value = value.replace("+", "");
//                   document.querySelector(".iti__selected-flag")?.click();
//                   return;
//                 }
//                 if (countriesWithoutLeadingZero.includes(selectedCountry)) {
//                   if (startsWithZero) value = value.slice(1);
//                   currentTarget.value = value;
//                 } else if (!startsWithZero) {
//                   value = "0" + value;
//                   currentTarget.value = value;
//                 }
//               }
//               const code = phoneInput.getSelectedCountryData().dialCode;
//               const phone = "+" + code + value.replace(/^0+|\s/g, "");

//               // validate(phone);
//             }}
//             ref={phoneInputRef}
//             // value={honey}
//             type="tel"
//             className={`text-left mr-auto`}
//             style={{
//               letterSpacing: "1.8px",
//             }}
//             maxLength={13}
//             // placeholder={GetLabel(id)}
//             autoFocus
//             {...props}
//           />
//           {/* <input
//             onKeyDown={(e) => {
//               if (e.target.value.length >= 4 && e.key !== "Backspace" && e.key !== "Delete") {
//                 e.preventDefault();
//               }
//             }}
//             typeof="number"
//             type="tel"
//             className={`text-center w:60px pe:16px`}
//             style={{ borderRight: "solid 1px var(--shark-border)", letterSpacing: "1.8px" }}
//             placeholder="1234"
//             // placeholder={GetLabel(id)}
//           /> */}
//         </div>
//       </div>
//     )}
//   />
// );
// function validatePhoneNumberFormat(number, countryCode) {
//   const isValid = phoneInput.isValidNumber(number);
//   console.log({ isValid, number });

//   // if (isValid) {
//   //   phoneInput.setNumber(number);
//   // } else {
//   //   phoneInput.setNumber("");
//   // }
// }

// const countriesWithoutLeadingZero = [
//   "us", // United States
//   "ca", // Canada
//   "gb", // United Kingdom
//   "au", // Australia
//   "cn", // China
//   "de", // Germany
//   "fr", // France
//   "in", // India
//   "jp", // Japan
//   "br", // Brazil
//   "it", // Italy
//   "ru", // Russia
//   "kr", // South Korea
//   "mx", // Mexico
//   "es", // Spain
//   "id", // Indonesia
//   "nl", // Netherlands
//   "tr", // Turkey
//   "sa", // Saudi Arabia
//   "se", // Sweden
//   "ch", // Switzerland
//   "no", // Norway
//   "pl", // Poland
//   "be", // Belgium
//   "at", // Austria
//   "gr", // Greece
//   "dk", // Denmark
//   "fi", // Finland
//   "ie", // Ireland
//   "pt", // Portugal
//   "nz", // New Zealand
//   "sg", // Singapore
//   "hk", // Hong Kong
//   "tw", // Taiwan
//   "th", // Thailand
//   "vn", // Vietnam
//   "ph", // Philippines
//   "eg", // Egypt
//   "ar", // Argentina
//   "za", // South Africa
// ];
