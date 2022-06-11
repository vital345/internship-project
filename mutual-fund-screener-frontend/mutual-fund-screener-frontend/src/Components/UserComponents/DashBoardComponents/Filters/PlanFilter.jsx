import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
const PlanFilter = (props) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={props.plan}
        name="radio-buttons-group"
        onChange={(e) => {
          props.setPlan(e.target.value);
        }}
      >
        <FormControlLabel value="All" control={<Radio />} label="All" />
        <FormControlLabel value="Growth" control={<Radio />} label="Growth" />
        <FormControlLabel value="IDCW" control={<Radio />} label="IDCW" />
        <FormControlLabel value="Bonus" control={<Radio />} label="Bonus" />
      </RadioGroup>
    </FormControl>
  );
};

export default PlanFilter;
