import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  SimpleGrid,
} from "@hope-ui/solid";
import { createSignal } from "solid-js";
import { NumberField } from "./NumberField";
import { xgc_IsPrimeTo, xgc_maxFactorable } from "./XGC";

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
  const validateClass = (field: HTMLInputElement) => {
    setValidClass(xgc_IsPrimeTo(field.valueAsNumber, modulusNumber()));
    return field.valueAsNumber;
  };

  const [validModulus, setValidModulus] = createSignal(true);
  const validateModulus = (field: HTMLInputElement) => {
    setValidModulus(
      maxSievedNumber({ m: field.valueAsNumber }) <= xgc_maxFactorable
    );
    return field.valueAsNumber;
  };
  // const [validLimit, setValidLimit] = createSignal(true);
  // const validateLimit = (field: HTMLInputElement) => {
  //   setValidLimit(maxSievedNumber() <= xgc_maxFactorable);
  //   return field.valueAsNumber;
  // };

  return (
    <>
      <SimpleGrid columns={4} columnGap="20px" rowGap="10px">
        <Box bg="$neutral3">
          <NumberField
            id="class"
            label={
              <>
                Class <code>C</code>
              </>
            }
            min="1"
            max={modulusNumber() - 1}
            helper={
              <>
                An integer such that <code>0 &lt; C &lt; M</code>, and{" "}
                <code>GCD(C, M) = 1</code>
              </>
            }
            value={classNumber}
            setValue={setClassNumber}
            valid={validClass}
            validate={validateClass}
            error={
              <>
                {classNumber()} is not coprime with {modulusNumber()}
              </>
            }
          />
        </Box>
        <Box bg="$neutral3">
          <NumberField
            id="modulus"
            label={
              <>
                Modulus <code>M</code>
              </>
            }
            min="1"
            helper={
              <>
                An integer greater than <code>1</code>
              </>
            }
            value={modulusNumber}
            setValue={setModulusNumber}
            valid={validModulus}
            validate={validateModulus}
            error={
              <code>
                {maxSievedNumber()} &gt; {xgc_maxFactorable}
              </code>
            }
          />
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
        <Center bg="$neutral3">
          <Button colorScheme="primary">Sieve Numbers</Button>
        </Center>
      </SimpleGrid>
    </>
  );
}
