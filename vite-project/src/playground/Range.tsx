import { hope } from "@hope-ui/solid";
import { createRenderEffect, createSignal } from "solid-js";

function triggerEvent(name: string, targetElement: HTMLInputElement) {
  // For some reason, bubbles is needed to *really* dispatch input events
  const event = new Event(name, { bubbles: true });
  targetElement.dispatchEvent(event);
}

type SliderMinPropsType = {
  hiddenInput: HTMLInputElement;
  min: number;
  max: number;
  maxValue: () => number;
  value: () => number;
  setValue: (a: number) => number;
  width: number;
  step: number;
};

function SliderMin(props: SliderMinPropsType) {
  let sliderValue: number, input: HTMLInputElement;

  function convertValueToSliderValue(value: number) {
    return props.max + props.min - value;
  }

  function convertSliderValueToValue(sliderValue: number) {
    return props.max + props.min - sliderValue;
  }

  function handleInput(event: Event) {
    const sliderValue = (event.target as HTMLInputElement).valueAsNumber;
    const value = convertSliderValueToValue(sliderValue);
    if (value > props.maxValue()) {
      input.value = convertValueToSliderValue(props.maxValue());
      return;
    }
    props.setValue(value);
    triggerEvent("input", props.hiddenInput);
  }

  createRenderEffect(() => {
    sliderValue = convertValueToSliderValue(props.value());
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <input
        ref={input}
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        // Without "?? props.min" (or "?? props.max"), it always uses 100
        // instead of sliderValue: Why?
        value={sliderValue ?? props.min}
        style={{
          direction: "rtl",
          width: `${props.width}px`,
          background: "transparent",
        }}
        onInput={(event: Event) => handleInput(event)}
        onChange={() => triggerEvent("change", props.hiddenInput)}
      />
    </div>
  );
}

type SliderMaxPropsType = {
  hiddenInput: HTMLInputElement;
  min: number;
  max: number;
  minValue: () => number;
  value: () => number;
  setValue: (a: number) => number;
  width: number;
  step: number;
};

function SliderMax(props: SliderMaxPropsType) {
  let input: HTMLInputElement,
    sliderValue: number,
    clipper: HTMLDivElement,
    middlePoint: number;

  function convertValueToSliderValue(value: number) {
    return value;
  }

  function convertSliderValueToValue(sliderValue: number) {
    return sliderValue;
  }

  function handleInput(event: Event) {
    const sliderValue = (event.target as HTMLInputElement).valueAsNumber;
    const value = convertSliderValueToValue(sliderValue);
    if (value < props.minValue()) {
      input.value = convertValueToSliderValue(props.minValue());
      return;
    }
    props.setValue(value);
    triggerEvent("input", props.hiddenInput);
  }

  createRenderEffect(() => {
    sliderValue = convertValueToSliderValue(props.value());
    const meanValue = (props.minValue() + props.value()) / 2;
    const ratio = (meanValue - props.min) / (props.max - props.min);
    middlePoint = ratio * props.width;
    if (clipper) {
      clipper.style.marginLeft = `${middlePoint}px`;
      clipper.style.width = `${props.width - middlePoint}px`;
    }
  });

  return (
    <div
      ref={clipper}
      style={{
        "margin-left": `${middlePoint}px`,
        width: `${props.width - middlePoint}px`,
        "overflow-x": "clip",
        position: "absolute",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 0,
        }}
      >
        <input
          ref={input}
          type="range"
          min={props.min}
          max={props.max}
          step={props.step}
          value={sliderValue}
          style={{
            direction: "ltr",
            width: `${props.width}px`,
            background: "transparent",
          }}
          onInput={(event: Event) => handleInput(event)}
          onChange={() => triggerEvent("change", props.hiddenInput)}
        />
      </div>
    </div>
  );
}

type RangePropsType = {
  name: string;
  onChange?: (input) => void;
  onInput?: (input) => void;
  width: number;
  min: number;
  max: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
};

export function Range(props: RangePropsType) {
  const [hiddenInput, setHiddenInput] = createSignal<HTMLInputElement>(null);
  const [minValue, setMinValue] = createSignal<number>(null);
  const [maxValue, setMaxValue] = createSignal<number>(null);

  createRenderEffect(() => {
    setMinValue(props.minValue ?? props.min);
    setMaxValue(props.maxValue ?? props.max);
  });

  return (
    <>
      <hope.div style={{ position: "relative", height: "32px" }}>
        <SliderMin
          hiddenInput={hiddenInput()}
          min={props.min}
          max={props.max}
          value={minValue}
          setValue={setMinValue}
          width={props.width}
          maxValue={maxValue}
          step={props.step}
        />
        <SliderMax
          hiddenInput={hiddenInput()}
          min={props.min}
          max={props.max}
          value={maxValue}
          setValue={setMaxValue}
          width={props.width}
          minValue={minValue}
          step={props.step}
        />
      </hope.div>
      <input
        ref={setHiddenInput}
        name={props.name}
        type="hidden"
        value={JSON.stringify([minValue(), maxValue()])}
        onChange={(e) => props.onChange?.(e)}
        onInput={(e) => props.onInput?.(e)}
      />
    </>
  );
}
