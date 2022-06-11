
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
const SubCategoryFilter = (props) => {
    return ( <FormControl>

        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={props.subCategory}
          name="radio-buttons-group"
          onChange={(e) => {
            props.setSubCategory(e.target.value);
          }}
        >
            
          <FormControlLabel
            value="All"
            control={<Radio />}
            label="All"
          />
          <FormControlLabel
            value="Arbitrage Fund"
            control={<Radio />}
            label="Arbitrage Fund"
          />
          <FormControlLabel
            value="Equity Linked Savings Scheme (ELSS)"
            control={<Radio />}
            label="Equity Linked Savings Scheme (ELSS)"
          />
          <FormControlLabel
            value="Large & Mid Cap Fund"
            control={<Radio />}
            label="Large & Mid Cap Fund"
          />
          <FormControlLabel
            value="Large Cap Fund"
            control={<Radio />}
            label="Large Cap Fund"
          />
          <FormControlLabel
            value="Liquid Fund"
            control={<Radio />}
            label="Liquid Fund"
          />
          <FormControlLabel
            value="Low Duration Fund"
            control={<Radio />}
            label="Low Duration Fund"
          />
          <FormControlLabel
            value="Medium Duration Fund"
            control={<Radio />}
            label="Medium Duration Fund"
          />
          <FormControlLabel
            value="Mid Cap Fund"
            control={<Radio />}
            label="Mid Cap Fund"
          />
          <FormControlLabel
            value="Small Cap Fund"
            control={<Radio />}
            label="Small Cap Fund"
          />
          <FormControlLabel
            value="Other Funds"
            control={<Radio />}
            label="Other Funds"
          />
        </RadioGroup>
      </FormControl> );
}
 
export default SubCategoryFilter;