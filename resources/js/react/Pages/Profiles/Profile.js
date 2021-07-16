import {useParams} from 'react-router-dom'
import Heading1 from "../../Components/typography/Heading1";
import {FiEdit} from 'react-icons/fi'
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../Components/Loadings";
import EditProfile from "./components/EditProfile";

function Profile ()
{
    let { profileId } = useParams();


    const [profile, setProfile] = useState(null)
    const [showEdit, setShowEdit] = useState(false)

    useEffect(() => {
        axios.get(`${window.baseApiPath}/profiles/${profileId}`)
            .then(function (res){
                setProfile(res.data);
            });
        //todo: make catch()
    },[profileId]);

    if(!profile){
        return <Loading.Cards/>
    }

    return(
        <div>
            <div className="flex justify-between items-center">
                <Heading1>
                    {profile.full_name}
                </Heading1>
                <div className="mb-6 text-lg hover:opacity-80 cursor-pointer" onClick={() => setShowEdit(v => !v)}>
                    <FiEdit/>
                </div>
            </div>
            <div>
                {showEdit &&
                    <EditProfile profile={profile} hidden={() => setShowEdit(false)}/>
                }
            </div>
        </div>
    )
}

export default Profile;