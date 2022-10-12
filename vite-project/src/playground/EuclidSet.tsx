import { Box, Button, Center, SimpleGrid, Text, VStack } from "@hope-ui/solid";
import { createSignal } from "solid-js";
import { NumberField } from "./NumberField";
import { xgc_IsPrimeTo, xgc_maxFactorable } from "./XGC";

export function EuclidSet() {
  const [classNumber, setClassNumber] = createSignal(1);
  const [modulusNumber, setModulusNumber] = createSignal(2);
  const [limitNumber, setLimitNumber] = createSignal(30);

  type Triad = {
    classValue?: number;
    modulusValue?: number;
    limitValue?: number;
  };
  const maxSievedNumber = ({
    classValue,
    modulusValue,
    limitValue,
  }: Triad = {}) =>
    (classValue || classNumber()) +
    (modulusValue || modulusNumber()) * (limitValue || limitNumber());

  const [classFieldError, setClassFieldError] = createSignal("");
  const validateClassField = (field: HTMLInputElement) => {
    const value = Math.abs(Math.floor(field.valueAsNumber));
    let error = "";
    if (!(1 <= value && value <= modulusNumber() - 1))
      error = `${value} is out of range`;
    if (!xgc_IsPrimeTo(value, modulusNumber()))
      error = `${value} is not prime to ${modulusNumber()}`;
    const max = maxSievedNumber({ classValue: value });
    if (!(max <= xgc_maxFactorable)) error = `${max} > ${xgc_maxFactorable}`;
    setClassFieldError(error);
    return value;
  };

  const [modulusFieldError, setModulusFieldError] = createSignal("");
  const validateModulusField = (field: HTMLInputElement) => {
    const value = Math.abs(Math.floor(field.valueAsNumber));
    let error = "";
    if (!(2 <= value)) error = `${value} is out of range`;
    const max = maxSievedNumber({ modulusValue: value });
    if (!(max <= xgc_maxFactorable)) error = `${max} > ${xgc_maxFactorable}`;
    setModulusFieldError(error);
    return value;
  };

  const [limitFieldError, setLimitFieldError] = createSignal("");
  const validateLimitField = (field: HTMLInputElement) => {
    const value = Math.abs(Math.floor(field.valueAsNumber));
    let error = "";
    if (!(1 <= value)) error = `${value} is out of range`;
    const max = maxSievedNumber({ limitValue: value });
    if (!(max <= xgc_maxFactorable)) error = `${max} > ${xgc_maxFactorable}`;
    setLimitFieldError(error);
    return value;
  };

  return (
    <SimpleGrid columns={4} columnGap="20px" rowGap="10px">
      <Box bg="$neutral3" p="$2">
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
              An integer such that <code>0&lt;C&lt;M</code>,{" "}
              <code>GCD(C,M)=1</code>
            </>
          }
          value={classNumber}
          setValue={setClassNumber}
          validate={validateClassField}
          error={classFieldError}
        />
      </Box>
      <Box bg="$neutral3" p="$2">
        <NumberField
          id="modulus"
          label={
            <>
              Modulus <code>M</code>
            </>
          }
          min="2"
          helper={
            <>
              An integer greater than <code>2</code>
            </>
          }
          value={modulusNumber}
          setValue={setModulusNumber}
          validate={validateModulusField}
          error={modulusFieldError}
        />
      </Box>
      <Box bg="$neutral3" p="$2">
        <NumberField
          id="limit"
          label={
            <>
              Limit <code>L</code>
            </>
          }
          min="1"
          helper={
            <>
              An integer greater than <code>0</code>. The last sieved number is{" "}
              <code>C+M*L={maxSievedNumber()}</code>
            </>
          }
          value={limitNumber}
          setValue={setLimitNumber}
          validate={validateLimitField}
          error={limitFieldError}
        />
      </Box>
      <Center bg="$neutral3">
        <VStack>
          <Button colorScheme="primary">Sieve Numbers</Button>
          <Text size="xs" color="$blackAlpha8" mt="$4">
            the max factorable number is {xgc_maxFactorable}
          </Text>
        </VStack>
      </Center>
    </SimpleGrid>
  );
}
