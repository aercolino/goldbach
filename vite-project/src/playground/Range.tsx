import { hope } from "@hope-ui/solid";
import { createRenderEffect, createSignal, createUniqueId } from "solid-js";

function triggerEvent(name: string, targetId: string) {
  const inputEvent = new Event(name, {
    bubbles: true,
    cancelable: true,
  });
  document.getElementById(targetId).dispatchEvent(inputEvent);
}

type SliderMinPropsType = {
  inputId: string;
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
    const sliderValue = parseInt((event.target as HTMLInputElement).value);
    const value = convertSliderValueToValue(sliderValue);
    if (value > props.maxValue()) {
      input.value = convertValueToSliderValue(props.maxValue());
      return;
    }
    props.setValue(value);
    triggerEvent("input", props.inputId);
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
        value={sliderValue}
        style={{
          direction: "rtl",
          border: "none",
          outline: "none",
          height: "2px",
          width: `${props.width}px`,
        }}
        onInput={(event: Event) => handleInput(event)}
        onChange={() => triggerEvent("change", props.inputId)}
      />
    </div>
  );
}

type SliderMaxPropsType = {
  inputId: string;
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
    const sliderValue = parseInt((event.target as HTMLInputElement).value);
    const value = convertSliderValueToValue(sliderValue);
    if (value < props.minValue()) {
      input.value = convertValueToSliderValue(props.minValue());
      return;
    }
    props.setValue(value);
    triggerEvent("input", props.inputId);
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
        height: "32px",
        "overflow-x": "clip",
        position: "absolute",
        top: 0,
        left: 0,
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
            border: "none",
            outline: "none",
            height: "2px",
            width: `${props.width}px`,
          }}
          onInput={(event: Event) => handleInput(event)}
          onChange={() => triggerEvent("change", props.inputId)}
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
  let minValue, setMinValue, maxValue, setMaxValue;
  const id = createUniqueId();
  createRenderEffect(() => {
    // eslint-disable-next-line solid/reactivity
    [minValue, setMinValue] = createSignal(props.minValue ?? props.min);
    // eslint-disable-next-line solid/reactivity
    [maxValue, setMaxValue] = createSignal(props.maxValue ?? props.max);
  });

  return (
    <>
      <hope.div style={{ position: "relative", height: "32px" }}>
        <SliderMin
          inputId={id}
          min={props.min}
          max={props.max}
          value={minValue}
          setValue={setMinValue}
          width={props.width}
          maxValue={maxValue}
          step={props.step}
        />
        <SliderMax
          inputId={id}
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
        id={id}
        name={props.name}
        type="hidden"
        value={JSON.stringify([minValue(), maxValue()])}
        onChange={(e) => props.onChange?.(e)}
        onInput={(e) => props.onInput?.(e)}
      />
    </>
  );
}