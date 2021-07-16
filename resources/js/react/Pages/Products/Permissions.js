import Card from "../../Components/Cards/Card";
import Heading3 from "../../Components/typography/Heading3";
import Description from "../../Components/typography/Description";
import FormElements from "../../Components/Forms";
import {useState} from "react";
import {FiPlus, FiCheck} from 'react-icons/fi'
import SecondaryButton from "../../Components/Buttons/SecondaryButton";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import _ from "lodash";
import TextInput from "../../Components/Forms/TextInput";

function Permissions(props)
{
    const {company} = props;

    const [currentRole, setCurrentRole] = useState(null);

    const [showNewPermission, setShowNewPermission] = useState(null);

    return(
        <div className="col-span-5">
            <Card>
                <div className="grid grid-cols-3 gap-6 py-4 px-5">

                    {/*Roles*/}
                    <div className="col-span-1">
                        <div className="flex items-center space-s-6">
                            <Heading3>Roles</Heading3>
                            <span className="group flex items-center justify-center relative">
                                <span className="text-gray-500 bg-gray-100 rounded-full p-1 flex items-center justify-center cursor-pointer" onClick={() => setCurrentRole('new')}>
                                   <FiPlus/>
                                </span>
                                <span className="ps-1 absolute end-0 transform translate-x-full whitespace-nowrap transition opacity-0 text-gray-400 text-sm group-hover:opacity-100">Add Role</span>
                            </span>
                        </div>
                        <Description>The roles of company</Description>
                        <div className="flex flex-col space-y-0 mt-4">
                            {company && company.roles &&
                                company.roles.map((role, index) => (
                                    <div
                                        className={`cursor-pointer ${currentRole && currentRole.id === role.id ? 'font-semibold text-primary-700' : 'text-gray-700 hover:text-gray-500'}`}
                                        onClick={() => setCurrentRole(role)}
                                        key={index}
                                    >
                                        {role.label}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {currentRole &&
                        <div className="col-span-2 flex flex-col space-y-6">
                        <div>
                            <FormElements.Text
                                label="Name"
                                placeholder="Name"
                                description="The name of company"
                                value={currentRole.label ?? ''}
                                // onChange={handleChange}
                                name="name"
                                // errors={errors.name}
                            />
                        </div>
                        <div>
                            <FormElements.Text
                                label="Slug"
                                placeholder="Slug"
                                description="use only english characters & "
                                value={currentRole.slug ?? ''}
                                // onChange={handleChange}
                                name="slug"
                                // errors={errors.domain}
                            />
                        </div>
                        <div>
                            <div className="font-medium text-gray-700 text-sm flex space-s-4">
                                <span>Permissions</span>
                                <span className="group flex items-center justify-center relative">
                                    <span className="text-gray-500 bg-gray-100 rounded-full p-1 flex items-center justify-center cursor-pointer" onClick={() => setShowNewPermission(true)}>
                                       <FiPlus/>
                                    </span>
                                    <span className="ps-1 absolute end-0 transform translate-x-full whitespace-nowrap transition opacity-0 text-gray-400 text-sm group-hover:opacity-100">Add Role</span>
                                </span>
                            </div>
                            <FormElements.Switcher
                                // checked={newCompany.active}
                                // onChange={handleChange}
                                enabledLabel="All"
                                disabledLabel="All"
                                label=""
                                name="all"
                                // errors={errors.active}
                            />
                            {company && company.permissions &&
                                company.permissions.map((permission, index) => (
                                    <FormElements.Switcher
                                        // checked={newCompany.active}
                                        // onChange={handleChange}
                                        enabledLabel={permission.label}
                                        disabledLabel={permission.label}
                                        label=""
                                        name="all"
                                        key={index}
                                        // errors={errors.active}
                                    />
                                ))
                            }
                            {showNewPermission &&
                                <div className="grid grid-cols-4 gap-4 mt-4">
                                    <div className="col-span-2 grid grid-cols-2 gap-4 gap-y-0">
                                        <div className="font-medium text-gray-700 text-sm col-span-2">
                                            Create new permission
                                        </div>
                                        <TextInput
                                            label=""
                                            name="label"
                                            placeholder="Create users"
                                        />
                                        <TextInput
                                            name="slug"
                                            placeholder="Ecreate_users"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-end">
                                        <span className="py-2.5 cursor-pointer px-2.5 bg-primary-600 text-white hover:bg-primary-500 w-max rounded-lg">
                                            <FiCheck size="1.1rem"/>
                                        </span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    }
                </div>
                {currentRole === 'new' &&
                <div className="px-5 py-3.5 bg-gray-100 flex justify-end space-s-4">
                    <SecondaryButton onClick={() => setCurrentRole(null)}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton disabled={false}>
                        {currentRole !== 'new' ? 'Update role' : 'Create role'}
                    </PrimaryButton>
                </div>
                }
            </Card>
        </div>
    )
}

export default Permissions;