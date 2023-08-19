/*
  <Range
    class="juan"
    name="Juan"
    min={50}
    minValue={60}
    maxValue={90}
    step={2}
    max={200}
    width={400}
    thumbWidth={32}
    thumbHeight={32}
    // onInput={(event: Event) => {
    //   console.log("Juan input", event.target.value);
    // }}
    onChange={(event: Event) => {
      console.log("Juan change", event.target.value);
    }}
  />
*/

import { createRenderEffect, createSignal, JSX } from "solid-js";
import "./Range.css";

function triggerEvent(name: string, targetElement: HTMLInputElement) {
  // For some reason, bubbles is needed to *really* dispatch input events
  const event = new Event(name, { bubbles: true });
  targetElement.dispatchEvent(event);
}

type SliderMinPropsType = {
  class: string;
  hiddenInput: HTMLInputElement;
  min: number;
  max: number;
  maxValue: () => number;
  value: () => number;
  setValue: (a: number) => number;
  width: number;
  step: number;
  noStyle: boolean;
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
      class="slider-min"
      style={{
        position: "absolute",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
        }}
      >
        <input
          ref={input}
          type="range"
          classList={{
            "custom-range": !props.noStyle,
            [props.class]: !!props.class,
          }}
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
    </div>
  );
}

type SliderMaxPropsType = {
  class: string;
  hiddenInput: HTMLInputElement;
  min: number;
  max: number;
  minValue: () => number;
  value: () => number;
  setValue: (a: number) => number;
  width: number;
  step: number;
  noStyle: boolean;
};

function SliderMax(props: SliderMaxPropsType) {
  let input: HTMLInputElement,
    sliderValue: number,
    clipper: HTMLDivElement,
    middleDistance: number;

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

  function distanceFromLeftEnd(value) {
    const runnableWidth = props.width - props.thumbWidth;
    return (
      props.thumbWidth / 2 +
      ((value - props.min) / (props.max - props.min)) * runnableWidth
    );
  }

  createRenderEffect(() => {
    const middleValue = (props.minValue() + props.value()) / 2;
    const sliderMiddleValue = convertValueToSliderValue(middleValue);
    middleDistance = distanceFromLeftEnd(sliderMiddleValue);
    sliderValue = convertValueToSliderValue(props.value());
    if (clipper) {
      clipper.style.marginLeft = `${middleDistance}px`;
      clipper.style.width = `${props.width - middleDistance}px`;
    }
  });

  return (
    <div
      class="slider-max"
      ref={clipper}
      style={{
        position: "absolute",
        "overflow-x": "clip",
        "margin-left": `${middleDistance}px`,
        width: `${props.width - middleDistance}px`,
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
          classList={{
            "custom-range": !props.noStyle,
            [props.class]: !!props.class,
          }}
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
  class: string;
  name: string;
  onChange?: (input) => void;
  onInput?: (input) => void;
  min: number;
  max: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  width: number;
  thumbWidth: number;
  thumbHeight: number;
  noStyle: boolean;
  style?: JSX.CSSProperties;
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
      <div
        class="range"
        style={{
          ...props.style,
          "min-height": `${props.thumbHeight}px`,
        }}
      >
        <SliderMin
          {...props}
          hiddenInput={hiddenInput()}
          value={minValue}
          setValue={setMinValue}
          maxValue={maxValue}
        />
        <SliderMax
          {...props}
          hiddenInput={hiddenInput()}
          value={maxValue}
          setValue={setMaxValue}
          minValue={minValue}
        />
      </div>
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
