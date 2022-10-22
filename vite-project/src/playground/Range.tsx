import { hope } from "@hope-ui/solid";
import { createRenderEffect, createSignal } from "solid-js";

type SliderPropsType = {
  min: number;
  max: number;
  value: () => number;
  setValue: (a: number) => number;
  width: number;
};

function SliderMin(props: SliderPropsType) {
  let sliderMin, sliderMax, sliderValue, sliderWidth;
  createRenderEffect(() => {
    const min = props.min ?? 0;
    const max = props.max ?? 100;
    let value = props.value();
    if (!(min <= value && value <= max)) {
      value = min;
    }
    sliderMin = -100;
    sliderMax = 0;
    sliderValue = (-100 * value) / (max - min);
    sliderWidth = (sliderValue / 100) * props.width;
  });
  return (
    <hope.div>
      <hope.input
        w={sliderWidth}
        type="range"
        min={sliderMin}
        max={sliderMax}
        value={sliderValue}
        style={{
          direction: "rtl",
          border: "none",
          outline: "none",
          height: "2px",
        }}
      />
    </hope.div>
  );
}

function SliderMax(props: SliderPropsType) {
  let sliderMin, sliderMax, sliderValue, sliderWidth, sliderLeftMargin;
  createRenderEffect(() => {
    const min = props.min ?? 0;
    const max = props.max ?? 100;
    let value = props.value();
    if (!(min <= value && value <= max)) {
      value = max;
    }
    sliderMin = 0;
    sliderMax = 100;
    sliderValue = (100 * value) / (max - min);
    sliderLeftMargin = (sliderValue / 100) * props.width;
    sliderWidth = props.width - sliderLeftMargin;
  });

  return (
    <hope.div>
      <hope.input
        w={sliderWidth}
        ml={sliderLeftMargin}
        type="range"
        min={sliderMin}
        max={sliderMax}
        value={sliderValue}
        style={{
          direction: "ltr",
          border: "none",
          outline: "none",
          height: "2px",
        }}
      />
    </hope.div>
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
        />
        <SliderMax
          min={props.min}
          max={props.max}
          value={maxValue}
          setValue={setMaxValue}
          width={props.width}
        />
      </hope.div>
      <hope.div>
        Min: {minValue()} - Max: {maxValue()}
      </hope.div>
    </>
  );
}
