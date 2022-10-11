import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@hope-ui/solid";
import { Component, Show } from "solid-js";

type NumberFieldProps = {
  id: string;
  label: string;
  min: number;
  max: number;
  helper: string;
  value: () => number;
  setValue: (v: number) => number;
  valid: () => boolean;
  validate: (HTMLInputElement) => number;
  error: string;
};

export const NumberField: Component<NumberFieldProps> = (props) => {
  return (
    <FormControl invalid={!props.valid()}>
      <FormLabel for={props.id} width="$full">
        {props.label}
      </FormLabel>
      <Input
        id={props.id}
        type="number"
        width="$28"
        value={props.value()}
        onChange={(e) => {
          const value = props.validate(e.target);
          props.setValue(value);
        }}
        min={props.min}
        max={props.max}
      />
      <Show
        when={!props.valid()}
        fallback={<FormHelperText width="$full">{props.helper}</FormHelperText>}
      >
        <FormErrorMessage width="$full">{props.error}</FormErrorMessage>
      </Show>
    </FormControl>
  );
};
