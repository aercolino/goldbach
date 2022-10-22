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
  let sliderMin: number,
    sliderMax: number,
    sliderValue: number,
    sliderWidth: number;
  createRenderEffect(() => {
    const min = props.min ?? 0;
    const max = props.max ?? 100;
    const density = props.width / (max - min);
    sliderWidth = (props.maxValue() - min) * density;
    sliderMin = 0;
    sliderMax = 100;
    sliderValue =
      (100 * (props.maxValue() - props.value())) / (props.maxValue() - min);
  });
  return (
    <hope.div>
      <hope.input
        type="range"
        min={sliderMin}
        max={sliderMax}
        value={sliderValue}
        style={{
          direction: "rtl",
          border: "none",
          outline: "none",
          height: "2px",
          width: `${sliderWidth}px`,
        }}
      />
    </hope.div>
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
  let sliderMin: number,
    sliderMax: number,
    sliderValue: number,
    sliderWidth: number,
    sliderLeftMargin: number;
  createRenderEffect(() => {
    const min = props.min ?? 0;
    const max = props.max ?? 100;
    const density = props.width / (max - min);
    sliderWidth = (max - props.minValue()) * density;
    sliderMin = 0;
    sliderMax = 100;
    sliderValue =
      (100 * (props.value() - props.minValue())) / (max - props.minValue());
    sliderLeftMargin = (props.minValue() - min) * density;
  });

  return (
    <hope.div>
      <hope.input
        type="range"
        min={sliderMin}
        max={sliderMax}
        value={sliderValue}
        style={{
          direction: "ltr",
          border: "none",
          outline: "none",
          height: "2px",
          width: `${sliderWidth}px`,
          "margin-left": `${sliderLeftMargin}px`,
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
