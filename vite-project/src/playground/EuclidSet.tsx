import {
  SimpleGrid,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@hope-ui/solid";
import { createSignal, createMemo } from "solid-js";

export function EuclidSet() {
  const [classNumber, setClassNumber] = createSignal(1);
  const [modulusNumber, setModulusNumber] = createSignal(2);
  const [limitNumber, setLimitNumber] = createSignal(30);
  const maxSievedNumber = createMemo(
    () => classNumber() + modulusNumber() * limitNumber()
  );

  return (
    <>
      <SimpleGrid columns={4} columnGap="20px" rowGap="10px">
        <Box bg="$neutral3">
          <FormControl>
            <FormLabel for="class" width="$full">
              Class <code>C</code>
            </FormLabel>
            <Input
              id="class"
              type="number"
              width="$28"
              value={classNumber()}
              min="1"
              max={modulusNumber() - 1}
              onChange={(e) =>
                setClassNumber(parseInt((e.target as HTMLInputElement).value))
              }
            />
            <FormHelperText>
              An integer such that <code>0 &lt; C &lt; M</code>, and coprime
              with <code>M</code>
            </FormHelperText>
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
                setModulusNumber(parseInt((e.target as HTMLInputElement).value))
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
                setLimitNumber(parseInt((e.target as HTMLInputElement).value))
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
