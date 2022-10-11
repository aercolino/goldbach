import { Box, Button, Center, SimpleGrid, Text, VStack } from "@hope-ui/solid";
import { createSignal } from "solid-js";
import { NumberField } from "./NumberField";
import { xgc_IsPrimeTo, xgc_maxFactorable } from "./XGC";

export function EuclidSet() {
  const [classNumber, setClassNumber] = createSignal(1);
  const [modulusNumber, setModulusNumber] = createSignal(2);
  const [limitNumber, setLimitNumber] = createSignal(30);

  const maxSievedNumber = ({
    classValue,
    modulusValue,
    limitValue,
  }: {
    classValue?: number;
    modulusValue?: number;
    limitValue?: number;
  } = {}) =>
    (classValue || classNumber()) +
    (modulusValue || modulusNumber()) * (limitValue || limitNumber());
  const maxErrorMessage = () => `${maxSievedNumber()} > ${xgc_maxFactorable}`;

  const [validClass, setValidClass] = createSignal(true);
  const isPrimeToModulus = (num: number) => xgc_IsPrimeTo(num, modulusNumber());
  const isLastFactorable = (num: number) =>
    maxSievedNumber({ classValue: num }) <= xgc_maxFactorable;
  const validateClass = (field: HTMLInputElement) => {
    const value = Math.round(field.valueAsNumber);
    setValidClass(isPrimeToModulus(value) && isLastFactorable(value));
    return value;
  };
  const classErrorMessage = () =>
    !isPrimeToModulus(classNumber())
      ? `${classNumber()} is not prime to ${modulusNumber()}`
      : maxErrorMessage();

  const [validModulus, setValidModulus] = createSignal(true);
  const validateModulus = (field: HTMLInputElement) => {
    const value = Math.round(field.valueAsNumber);
    setValidModulus(
      maxSievedNumber({ modulusValue: value }) <= xgc_maxFactorable
    );
    return value;
  };

  const [validLimit, setValidLimit] = createSignal(true);
  const validateLimit = (field: HTMLInputElement) => {
    const value = Math.round(field.valueAsNumber);
    setValidLimit(maxSievedNumber({ limitValue: value }) <= xgc_maxFactorable);
    return value;
  };

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
                An integer such that <code>0 &lt; C &lt; M</code>,{" "}
                <code>GCD(C, M) = 1</code>
              </>
            }
            value={classNumber}
            setValue={setClassNumber}
            valid={validClass}
            validate={validateClass}
            error={classErrorMessage()}
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
            min="2"
            helper={
              <>
                An integer greater than <code>2</code>
              </>
            }
            value={modulusNumber}
            setValue={setModulusNumber}
            valid={validModulus}
            validate={validateModulus}
            error={<code>{maxErrorMessage()}</code>}
          />
        </Box>
        <Box bg="$neutral3">
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
                An integer greater than <code>0</code>. The last sieved number
                is <code>C + M * L = {maxSievedNumber()}</code>
              </>
            }
            value={limitNumber}
            setValue={setLimitNumber}
            valid={validLimit}
            validate={validateLimit}
            error={<code>{maxErrorMessage()}</code>}
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
    </>
  );
}
