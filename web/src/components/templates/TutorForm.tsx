import { useState } from "react";
import { useField } from "../../hooks"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { signAsTutor, updateAsTutor } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { Status, TutorInfo, UserType } from "../../types";

const TutorForm = () => {
    const { reset: educReset, ...educ } = useField('text');
    const { reset: venueReset, ...venue } = useField('text');
    const { reset: priceReset, ...price } = useField('number');
    const { reset: areaExpReset, ...areaExp } = useField('text');
    const { reset: tutorExpReset, ...tutorExp } = useField('text');
    const { reset: availReset, ...avail } = useField('text');
    const { reset: portraitReset, ...portrait } = useField('text');
    const [mode, setMode] = useState("0")
    const [status, setStatus] = useState(Status.Active)
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleModeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMode(e.target.value)
    }

    const handleStatusRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "0") {
            setStatus(Status.Active)
        } else {
            setStatus(Status.Inactive)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (user)
                await dispatch(signAsTutor(
                    user.userName,
                    {
                        educAttainment: educ.value,
                        learningMode: parseInt(mode),
                        venue: venue.value,
                        price: parseInt(price.value),
                        areasOfExpertise: [areaExp.value],
                        tutoringExperiences: tutorExp.value,
                        availability: avail.value,
                        portraitUrl: portrait.value,
                        status: status
                    }))

            navigate("/");
        } catch {
            return;
        }
    }

    const handleUpdate = async () => {
        const info = user?.roleInfo as TutorInfo
        try {
            if (user)
                await dispatch(updateAsTutor(
                    user.userName,
                    {
                        educAttainment: educ.value || info.educAttainment,
                        learningMode: parseInt(mode) || info.learningMode,
                        venue: venue.value || info.venue,
                        price: parseInt(price.value) || info.price,
                        areasOfExpertise: areaExp.value ? [areaExp.value] : info.areasOfExpertise,
                        tutoringExperiences: tutorExp.value || info.tutoringExperiences,
                        availability: avail.value || info.availability,
                        portraitUrl: portrait.value || info.portraitUrl,
                        status: status === null ? info.status : status
                    }))

            navigate("/profile");
        } catch {
            return;
        }
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <span>Educational Attainment</span>
            <input {...educ} data-testid="educ"  pattern="[A-Za-z\s]+" title="Please enter only alphabetical characters."/>
        </div>
        <div>
            <fieldset>
                <legend>Select your offered learning mode: </legend>
                <div>
                    <input
                        type="radio"
                        id="online"
                        name="mode"
                        value="0"
                        defaultChecked
                        onChange={handleModeRadio} />
                    <label htmlFor="online">Online</label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="f2f"
                        name="mode"
                        value="1"
                        onChange={handleModeRadio} />
                    <label htmlFor="f2f">F2F</label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="both"
                        name="mode"
                        value="2"
                        onChange={handleModeRadio} />
                    <label htmlFor="both">Both</label>
                </div>
            </fieldset>
        </div>
        <div>
            <span>Venue</span>
            <input {...venue} data-testid="venue"  pattern="[A-Za-z\s]+" title="Please enter only alphabetical characters."/>
        </div>
        <div>
            <span>Price</span>
            <input {...price} data-testid="price" step=".01" />
        </div>
        <div>
            <span>Area of expertise [optional]:</span>
            <input {...areaExp} data-testid="areaExp" />
        </div>
        <div>
            <span>Tutoring experience [optional]:</span>
            <input {...tutorExp} data-testid="tutorExp" />
        </div>
        <div>
            <span>Availability [optional]:</span>
            <input {...avail} data-testid="avail" />
        </div>
        <div>
            <span>Portrait URL [optional]: </span>
            <input {...portrait} data-testid="portrait" />
        </div>
        <div>
            <fieldset>
                <legend>Select your status:</legend>
                <div>
                    <input
                        type="radio"
                        id="active"
                        name="status"
                        value="0"
                        defaultChecked
                        onChange={handleStatusRadio} />
                    <label htmlFor="active">Active</label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="inactive"
                        name="status"
                        value="1"
                        onChange={handleStatusRadio} />
                    <label htmlFor="inactive">Inactive</label>
                </div>
            </fieldset>
        </div>
        {user?.userType === UserType.TUTOR
            ? <button type="button" onClick={handleUpdate}>Update tutor information</button>
            : <button type="submit">Create tutor account</button>}

    </form>
}

export default TutorForm
