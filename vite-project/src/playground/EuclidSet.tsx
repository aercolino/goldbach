import {
  SimpleGrid,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
} from "@hope-ui/solid";
import { createSignal, createMemo, Show } from "solid-js";
import { xgc_IsPrimeTo } from "./XGC";

export function EuclidSet() {
  const [classNumber, setClassNumber] = createSignal(1);
  const [modulusNumber, setModulusNumber] = createSignal(2);
  const [limitNumber, setLimitNumber] = createSignal(30);
  const maxSievedNumber = ({
    c,
    m,
    l,
  }: { c?: number; m?: number; l?: number } = {}) =>
    (c || classNumber()) + (m || modulusNumber()) * (l || limitNumber());

  const [validClass, setValidClass] = createSignal(true);

  return (
    <>
      <SimpleGrid columns={4} columnGap="20px" rowGap="10px">
        <Box bg="$neutral3">
          <FormControl invalid={!validClass()}>
            <FormLabel for="class" width="$full">
              Class <code>C</code>
            </FormLabel>
            <Input
              id="class"
              type="number"
              width="$28"
              value={classNumber()}
              onChange={(e) => {
                const value = (e.target as HTMLInputElement).valueAsNumber;
                setValidClass(xgc_IsPrimeTo(value, modulusNumber()));
                setClassNumber(value);
              }}
              min="1"
              max={modulusNumber() - 1}
            />
            <Show
              when={!validClass()}
              fallback={
                <FormHelperText width="$full">
                  An integer such that <code>0 &lt; C &lt; M</code>, and{" "}
                  <code>GCD(C, M) = 1</code>
                </FormHelperText>
              }
            >
              <FormErrorMessage width="$full">
                {classNumber()} is not coprime with {modulusNumber()}
              </FormErrorMessage>
            </Show>
          </FormControl>
        </Box>
        <Box bg="$neutral3">
          <FormControl>
            <FormLabel for="modulus" width="$full">
              Modulus <code>M</code>
            </FormLabel>
            <Input
              id="modulus"
              type="number"
              width="$28"
              value={modulusNumber()}
              onChange={(e) =>
                setModulusNumber((e.target as HTMLInputElement).valueAsNumber)
              }
              min="2"
            />
            <FormHelperText width="$full">
              An integer greater than <code>1</code>
            </FormHelperText>
          </FormControl>
        </Box>
        <Box bg="$neutral3">
          <FormControl>
            <FormLabel for="limit" width="$full">
              Limit <code>L</code>
            </FormLabel>
            <Input
              id="limit"
              type="number"
              width="$28"
              value={limitNumber()}
              onChange={(e) =>
                setLimitNumber((e.target as HTMLInputElement).valueAsNumber)
              }
              min="1"
            />
            <FormHelperText width="$full">
              An integer greater than <code>0</code>. The last sieved number is{" "}
              <code>C + M * L = {maxSievedNumber()}</code>
            </FormHelperText>
          </FormControl>
        </Box>
        <Box bg="$neutral3" />
      </SimpleGrid>
    </>
  );
}
