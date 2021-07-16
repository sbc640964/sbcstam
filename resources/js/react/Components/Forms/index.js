import TextInput from "./TextInput";
import Switcher from "./Switcher";
import Textarea from "./Textarea";
import Error from "./Error";
import Select from "./Select";
import Number from "./NumberInput";
import SelectRemote from "./SekectRemote";
import SwitcherGroup from "./SwitcherGroup";
import DateInput from "./DateInput";

function FormElements (){
    return(
        'select component'
    )
}

FormElements.Text = TextInput
FormElements.Switcher = Switcher
FormElements.Textarea = Textarea
FormElements.Error = Error
FormElements.Select = Select
FormElements.Number = Number
FormElements.Select2 = SelectRemote
FormElements.SwitcherGroup = SwitcherGroup
FormElements.Data = DateInput

export default FormElements;

