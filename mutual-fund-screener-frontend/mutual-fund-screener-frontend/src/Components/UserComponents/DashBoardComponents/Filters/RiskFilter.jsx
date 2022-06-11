
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
const RiskFilter = (props) => {
    return ( <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={props.risk}
          name="radio-buttons-group"
          onChange={(e) => {
            props.setRisk(e.target.value);
          }}
        >
          <FormControlLabel
            value="All"
            control={<Radio />}
            label="All"
          />
          <FormControlLabel
            value="High"
            control={<Radio />}
            label="High"
          />
          <FormControlLabel
            value="Low"
            control={<Radio />}
            label="Low"
          />
          <FormControlLabel
            value="Moderate"
            control={<Radio />}
            label="Moderate"
          />
          <FormControlLabel
            value= "Moderately High"
            control={<Radio />}
            label= "Moderately High"
          />
          <FormControlLabel
            value="Moderately Low"
            control={<Radio />}
            label="Moderately Low"
          />
          <FormControlLabel
            value= "Very High"
            control={<Radio />}
            label= "Very High"
          />
        </RadioGroup>
      </FormControl> );


}
 
export default RiskFilter;