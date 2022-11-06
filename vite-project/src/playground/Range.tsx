import { createRenderEffect, createSignal } from "solid-js";
import "./Range.css";

function triggerEvent(name: string, targetElement: HTMLInputElement) {
  // For some reason, bubbles is needed to *really* dispatch input events
  const event = new Event(name, { bubbles: true });
  targetElement.dispatchEvent(event);
}

const thumbWidth = 32; //FIXME this magic value should be computed (hard) or forcefully set in the CSS (easier)
const thumbHeight = 32;

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
          class="custom-range"
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
    const runnableWidth = props.width - thumbWidth;
    return (
      thumbWidth / 2 +
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
          class="custom-range"
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
      <div class="range" style={{ height: `${thumbHeight}px` }}>
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
