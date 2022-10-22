import { hope } from "@hope-ui/solid";
import { createRenderEffect, createSignal } from "solid-js";

type SliderMinPropsType = {
  min: number;
  max: number;
  maxValue: () => number;
  value: () => number;
  setValue: (a: number) => number;
  width: number;
};

function SliderMin(props: SliderMinPropsType) {
  let sliderValue: number, sliderWidth: number, inputRange: HTMLInputElement;

  function convertValueToSliderValue() {
    return (
      (100 * (props.maxValue() - props.value())) /
      (props.maxValue() - props.min)
    );
  }

  function convertSliderValueToValue(sliderValue) {
    return (
      props.maxValue() - (props.maxValue() - props.min) * (sliderValue / 100)
    );
  }

  createRenderEffect(() => {
    const density = props.width / (props.max - props.min);
    sliderWidth = (props.maxValue() - props.min) * density;
    if (inputRange) inputRange.style.width = `${sliderWidth}px`;
    sliderValue = convertValueToSliderValue();
  });
  return (
    <div>
      <input
        ref={inputRange}
        type="range"
        min={0}
        max={100}
        value={sliderValue}
        style={{
          direction: "rtl",
          border: "none",
          outline: "none",
          height: "2px",
          width: `${sliderWidth}px`,
        }}
        onInput={(event: Event) => {
          const sliderValue = (event.target as HTMLInputElement).value;
          const value = convertSliderValueToValue(sliderValue);
          return props.setValue(value);
        }}
      />
    </div>
  );
}

type SliderMaxPropsType = {
  min: number;
  max: number;
  minValue: () => number;
  value: () => number;
  setValue: (a: number) => number;
  width: number;
};

function SliderMax(props: SliderMaxPropsType) {
  let sliderValue: number, sliderWidth: number, sliderLeftMargin: number;

  function convertValueToSliderValue() {
    return (
      (100 * (props.value() - props.minValue())) /
      (props.max - props.minValue())
    );
  }

  function convertSliderValueToValue(sliderValue) {
    return (
      props.minValue() + (props.max - props.minValue()) * (sliderValue / 100)
    );
  }

  createRenderEffect(() => {
    const density = props.width / (props.max - props.min);
    sliderWidth = (props.max - props.minValue()) * density;
    sliderLeftMargin = (props.minValue() - props.min) * density;
    sliderValue = convertValueToSliderValue();
  });

  return (
    <div>
      <input
        type="range"
        min={0}
        max={100}
        value={sliderValue}
        style={{
          direction: "ltr",
          border: "none",
          outline: "none",
          height: "2px",
          width: `${sliderWidth}px`,
          "margin-left": `${sliderLeftMargin}px`,
        }}
        onInput={(event: Event) => {
          const sliderValue = (event.target as HTMLInputElement).value;
          const value = convertSliderValueToValue(sliderValue);
          return props.setValue(value);
        }}
      />
    </div>
  );
}

type RangePropsType = {
  width: number;
  min: number;
  max: number;
  minValue?: number;
  maxValue?: number;
};

export function Range(props: RangePropsType) {
  let minValue, setMinValue, maxValue, setMaxValue;
  createRenderEffect(() => {
    // eslint-disable-next-line solid/reactivity
    [minValue, setMinValue] = createSignal(props.minValue ?? props.min);
    // eslint-disable-next-line solid/reactivity
    [maxValue, setMaxValue] = createSignal(props.maxValue ?? props.max);
  });

  return (
    <>
      <hope.div style={{ position: "relative" }}>
        <SliderMin
          min={props.min}
          max={props.max}
          value={minValue}
          setValue={setMinValue}
          width={props.width}
          maxValue={maxValue}
        />
        <SliderMax
          min={props.min}
          max={props.max}
          value={maxValue}
          setValue={setMaxValue}
          width={props.width}
          minValue={minValue}
        />
      </hope.div>
      <hope.div>
        Min: {minValue()} - Max: {maxValue()}
      </hope.div>
    </>
  );
}
