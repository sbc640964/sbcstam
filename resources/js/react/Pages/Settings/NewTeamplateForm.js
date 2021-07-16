import Form from "../../Components/Forms";
import FormElements from "../../Components/Forms";
import {useState} from "react";
import _ from "lodash";
import {FiPlusCircle, FiTrash2} from "react-icons/fi";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import axios from "axios";

function NewTemplateForm (props)
{

    const [newTemplate, setNewTemplate] = useState({
        children: {units: [{units_payments: null, qty: null}] },
        view_on_new_product_form: true,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e, type = null, name = null) =>
    {
        name = name ?? (e.target ? e.target.name : e.name);

        let value;

        if(type && type === 'select'){
            value = e;
        }else{
            value = (e.value ?? e.checked) ?? e.target.value;
        }

        _.set(newTemplate, name, value);
        setNewTemplate(_.cloneDeep(newTemplate));
        if(errors[name]){
            setErrors(_.pickBy(errors, (v, k) => {
                return k !== name
            }));
        }
    }

    const addChild = () => {
        newTemplate.children.units.push({units_payments: null, qty: null});
        setNewTemplate(_.cloneDeep(newTemplate));
    }

    const removeChild = index => {
        newTemplate.children.units = newTemplate.children.units.filter((v, k) => k !== index);
        setNewTemplate(_.cloneDeep(newTemplate));
    }

    const handleSubmit = e =>
    {
        axios.post(`${window.baseApiPath}/options?optionKey=TemplateProduct`, newTemplate);

        e.preventDefault()
    }

    return(
        <form
            className="grid grid-cols-4 gap-4"
            onSubmit={handleSubmit}
        >
            <div className="col-span-4">
                <Form.Text
                    label="שם"
                    placeholder="שם"
                    value={newTemplate.name ?? ''}
                    onChange={handleChange}
                    name="name"
                    errors={errors.name}
                    auto-complete="off"
                />
            </div>
            <div className="col-span-4">
                <Form.Text
                    label="שם מוצר - תצוגה"
                    placeholder="שם מוצר"
                    value={newTemplate.display_name ?? ''}
                    onChange={handleChange}
                    name="display_name"
                    errors={errors.display_name}
                />
            </div>
            <div className="col-span-2">
                <Form.Switcher
                    label="כולל ילדים אוטומטי"
                    checked={newTemplate.package ?? false}
                    onChange={handleChange}
                    name="package"
                    disabledLabel="מוצר בודד"
                    enabledLabel="יוצר אוטו' ילדים"
                    errors={errors.package}
                />
            </div>
            <div className="col-span-2">
                <Form.Switcher
                    label="נהל יחידות תשלום"
                    checked={newTemplate.payment_units ?? false}
                    onChange={handleChange}
                    name="payment_units"
                    disabledLabel="תשלום אחד למוצר"
                    enabledLabel="יחידות תשלום במוצר"
                    errors={errors.payment_units}
                />
            </div>
            {newTemplate.payment_units &&
                <div className="col-span-4 grid grid-cols-4 gap-4 border-t pt-2">
                    <div className="col-span-4 font-bold text-lg">
                        יחידות תשלום
                    </div>
                    <div className="col-span-2">
                        <Form.Text
                            label="שם יחידת תשלום"
                            placeholder="עמוד"
                            value={newTemplate.units_labels?.singular ?? ''}
                            onChange={handleChange}
                            name="units_labels.singular"
                            errors={errors.display_name}
                        />
                    </div>
                    <div className="col-span-2">
                        <Form.Text
                            label="שם יחידות - רבים"
                            placeholder="עמודים"
                            value={newTemplate.units_labels?.plural ?? ''}
                            onChange={handleChange}
                            name="units_labels.plural"
                            errors={errors.display_name}
                        />
                    </div>
                </div>
            }
            {newTemplate.package &&
            <div className="col-span-4 grid grid-cols-4 gap-4 border-t pt-2">
                <div className="col-span-4 font-bold text-lg">
                    ילדים
                </div>
                <div className="col-span-2">
                    <Form.Text
                        label="שם ילד יחיד"
                        placeholder="יריעה"
                        value={newTemplate.children?.labels?.singular ?? ''}
                        onChange={handleChange}
                        name="children.labels.singular"
                        errors={errors.display_name}
                    />
                </div>
                <div className="col-span-2">
                    <Form.Text
                        label="שם ילדים רבים"
                        placeholder="יריעות"
                        value={newTemplate.children?.labels?.plural ?? ''}
                        onChange={handleChange}
                        name="children.labels.plural"
                        errors={errors.display_name}
                    />
                </div>
                {/*ילדים כמות*/}
                {newTemplate.payment_units &&
                    <>
                        <div className="col-span-4 mt-4 flex space-s-1 items-center">
                            <span className="font-semibold text-gray-500">סדרת ילדים ותשלומים</span>
                            <span
                                className="hover:bg-gray-200 p-1.5 rounded-full text-gray-500 hover:text-gray-800 cursor-pointer"
                                onClick={addChild}
                            >
                               <FiPlusCircle/>
                            </span>
                        </div>
                        {newTemplate.children.units.map((u, index) => (
                            <>
                                <div className="col-span-2 -mt-2">
                                    <Form.Number
                                        label="כמות"
                                        placeholder="1"
                                        value={newTemplate.children.units[index].qty ?? ''}
                                        onChange={handleChange}
                                        name={`children.units[${index}].qty`}
                                        errors={errors.display_name}
                                    />
                                </div>
                                <div className="col-span-2 -mt-2 relative">
                                    <Form.Number
                                        label="יחידות תשלום לכל אחד"
                                        placeholder="2"
                                        value={newTemplate.children.units[index].units_payments ?? ''}
                                        onChange={handleChange}
                                        name={`children.units[${index}].units_payments`}
                                        errors={errors.display_name}
                                    />
                                    {newTemplate.children.units.length > 1 &&
                                        <div className="absolute top-1/2 end-0 transform translate-y-1/2 -translate-x-full ps-1">
                                        <span
                                            className="text-gray-400 hover:text-gray-800 cursor-pointer"
                                            onClick={() => removeChild(index)}
                                        >
                                            <FiTrash2/>
                                        </span>
                                        </div>
                                    }
                                </div>
                            </>
                        ))}
                    </>
                }
                <div className="col-span-4">
                    <Form.Switcher
                        label="תהליך שונה מההורה"
                        checked={newTemplate.different_precess ?? false}
                        onChange={handleChange}
                        name="different_precess"
                        disabledLabel="לילדים תהליך שווה להורה"
                        enabledLabel="תהליך  שונה לילדים"
                        errors={errors.different_precess}
                    />
                </div>
                {newTemplate.different_precess &&
                    <div className="col-span-4">
                        <FormElements.Select2
                        label="תהליך"
                        placeholder="בחר"
                        value={newTemplate.children?.process ?? false}
                        onChange={handleChange}
                        name="children.process"
                        selectorView={i => [i.first_name, i.last_name].join(' ')}
                        urlOptions={`${window.baseApiPath}/profiles?roles[]=rabbi`}
                        errors={errors.children?.process}
                        search={true}
                        />
                    </div>
                }
            </div>
            }
            <div className="col-span-4">
                <Form.Switcher
                    label="הצג בטופס מוצר חדש"
                    checked={newTemplate.view_on_new_product_form ?? false}
                    onChange={handleChange}
                    name="view_on_new_product_form"
                    disabledLabel="לא יוצג"
                    enabledLabel="יוצג"
                    errors={errors.view_on_new_product_form}
                />
            </div>

            <div className="col-span-4 flex justify-end">
                <PrimaryButton size="sm">
                    הוסף חדש
                </PrimaryButton>
            </div>
        </form>
    )
}

export default NewTemplateForm;