import { FC, useState, ChangeEvent, FocusEvent, useRef, KeyboardEvent, SetStateAction, Dispatch } from "react";
import { iTextInput } from "../TextInput/TextInput";
import { isValidArray, reg } from "../../helpers/common";
import "./EmailInput.scss";

interface iEmailInput extends iTextInput {
  setValue: Dispatch<SetStateAction<string>>;
  value?: string;
  removeAuto?: boolean;
};

const defaultDomains = [
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "hotmail.com",
  "hotmail.co.uk",
  "live.com",
  "msn.com",
  "comcast.net",
  "sbcglobal.net",
  "verizon.net",
  "facebook.com",
  "outlook.com",
  "att.net",
  "gmx.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
];


const regexps = {
  domain: reg(/@.*/),
  domainTwoCharts: reg("@{2,}"),
  spaces: reg(/\s/, "g"),
};
const keys = ["ArrowRight", "Tab"];
const at = "@";

export const EmailInput: FC<iEmailInput> = ({
  id,
  className = "",
  label,
  errors,
  setValue,
  ...props
}) => {
  const [showAutocomplete, setShowAutocomplete] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  const showInputError = isValidArray(errors);

  const getSuggestion = (value?: string) => {
    if (!value || regexps.domainTwoCharts.test(value)) return null;

    const [_, domainHint] = value?.split(at);
    const domain = defaultDomains.find(d => d.indexOf(domainHint) === 0);

    return showAutocomplete ? (at + (domain || domainHint || defaultDomains[0])) : null;
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props?.onChange?.(e);
    !e.target.value && setShowAutocomplete(true);
  };

  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    props?.onBlur?.(e);
    ref.current && ref.current.setAttribute("data-suffix", "");
  };

  const onFocusHandler = (e: FocusEvent<HTMLInputElement>) => {
    props?.onFocus?.(e);
    ref.current && ref.current.setAttribute("data-suffix", getSuggestion(props?.value) || "");
  };

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showAutocomplete || !props?.value) return;

    if (keys.includes(e.key)) {
      if (showAutocomplete) e.preventDefault();
      setValue(pv => pv?.replace(regexps.domain, "") + getSuggestion(props?.value));
      setShowAutocomplete(false);
    }
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(regexps.spaces, "");
  }

  return (
    <div className={`EmailInput ${className}`}>
      {label && <label className="EmailInput-label" htmlFor={id} >{label}</label>}

      <div
        className={`EmailInput-input-container ${showAutocomplete ? "active" : ""}`}
        data-suffix={getSuggestion(props?.value)}
        data-value={props?.value}
        ref={ref}
      >
        <input
          {...props}
          id={id}
          type="email"
          className={`EmailInput-input ${showInputError ? "error" : ""}`}
          onChange={changeHandler}
          onKeyDown={keyDownHandler}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          onInput={onInput}
          autoComplete="one-time-code"
        />
      </div>

      {errors?.map((err) => <span key={err} className="EmailInput-error">{err}</span>)}
    </div>
  );
};