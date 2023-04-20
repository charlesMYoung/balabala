import React, { forwardRef, useEffect, useState } from "react";
import { Button } from "./button";
import tw, { css, styled } from "twin.macro";
import { Icon } from "./icon";
import { type FieldErrors } from "react-hook-form";

const InputLabel = styled.label(() => [
  tw`body-large absolute pointer-events-none top-4 left-3 text-on-surface-variant transition-all px-1`,
]);

const TextArea = styled.textarea(() => [
  tw`m-0 bg-transparent  outline-none placeholder-shown:placeholder:(text-transparent) 
    border-outline border absolute w-full p-6 rounded-md text-on-surface h-full box-border body-large`,
  css`
    &:not(:placeholder-shown) ~ .input-label,
    &:focus ~ .input-label {
      background: var(--md-sys-color-surface);
      color: var(--md-sys-color-primary);
      transform: scale(0.85) translate(-2px, -32px);
    }
    &:focus {
      border-width: 2px;
      border-color: var(--md-sys-color-primary) !important;
    }
  `,
]);

const InputContainer = tw.div`relative w-full h-full`;
const InputError = tw.div`body-small text-error mt-1 indent-3`;

type TextAreaProps = {
  value?: string;
  classNames?: string;
  errors?: FieldErrors;
  trailingIcon?: React.ReactNode;
  label?: string;
} & Pick<
  React.ComponentProps<"textarea">,
  "onChange" | "name" | "autoComplete" | "onBlur"
>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      classNames,
      autoComplete,
      name = "",
      onChange,
      errors,
      onBlur,
    }: TextAreaProps,
    ref
  ) => {
    const [value, setValue] = useState<string>("");

    const isShowClearButton = React.useMemo(() => {
      return value.length > 0;
    }, [value]);

    const onChangeHandle: React.ChangeEventHandler<HTMLTextAreaElement> = (
      event
    ) => {
      setValue(event.target.value);
      onChange && onChange(event);
    };

    const onClearHandle = () => {
      setValue("");
    };

    useEffect(() => {
      console.log("error", errors);
    }, [errors]);

    const errorMessage = () => {
      const [parentsName, indexName = -1, subName] = name.split(".") || "";
      if (!parentsName || !errors || !errors[parentsName]) {
        return false;
      }
      const indexNumber = indexName === -1 ? 0 : +indexName;
      const multipleMessage = errors[parentsName] as any;
      if (!subName) {
        return errors[parentsName]?.message;
      }
      return multipleMessage?.[indexNumber]?.[subName]?.message;
    };

    return (
      <div
        tw="cursor-text inline-flex flex-col w-full h-40"
        className={classNames || ""}
      >
        <InputContainer>
          <TextArea
            cols={25}
            rows={3}
            ref={ref}
            autoComplete={autoComplete}
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={onChangeHandle}
            placeholder={label}
            aria-invalid={errorMessage() ? "true" : "false"}
          />
          <InputLabel className="input-label">{label}</InputLabel>
          {isShowClearButton && (
            <div tw=" absolute  bottom-2 right-0">
              <Button
                onClick={onClearHandle}
                type="text"
                icon={
                  <Icon name="close-circle" tw="fill-on-surface-variant"></Icon>
                }
              ></Button>
            </div>
          )}
        </InputContainer>
        {errorMessage() && <InputError>{errorMessage()}</InputError>}
      </div>
    );
  }
);

Textarea.displayName = "TextArea";