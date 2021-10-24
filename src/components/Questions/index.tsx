import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { useState, useEffect, useRef, FormEvent } from "react";

export function Question() {
  const nextClickHandler = (e: FormEvent) => {};

  return (
    <Card>
      <CardContent>

        <FormControl
          sx={{ m: 3 }}
          component="fieldset"
          // error={error}
          variant="standard"
        >
          <FormLabel component="legend"><Typography variant="h2">Question Here</Typography></FormLabel>
          <RadioGroup
            aria-label="quiz"
            name="quiz"
            //   value={value}
            //   onChange={handleRadioChange}
          >
            <FormControlLabel
              value="best"
              control={<Radio />}
              label="text Answer Here!"
            />
          </RadioGroup>
          <FormHelperText>helperText</FormHelperText>
          <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="contained">
            Check Answer
          </Button>
        </FormControl>
        {/* <FormControl>
                    <InputLabel>
                        <FormControlLabel value="best" control={<Radio />} label="The best!" onChange={() => {}} />
                    </InputLabel>
                    <FormHelperText>Error</FormHelperText>
                    <Button variant="contained" onClick={nextClickHandler}>Next</Button>
                </FormControl> */}
      </CardContent>
    </Card>
  );
}
