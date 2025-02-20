import { useState } from "react";
import { useField } from "../hooks"

const TutorForm = () => {
    const { reset: educReset, ...educ} = useField('text');
    const { reset: priceReset, ...price} = useField('number');
    const { reset: areaExpReset, ...areaExp} = useField('text');
    const { reset: tutorExpReset, ...tutorExp} = useField('text');
    const { reset: availReset, ...avail} = useField('text');
    const { reset: portraitReset, ...portrait} = useField('text');
    const [mode, setMode] = useState("0")
    const [status, setStatus] = useState("0")

    const handleModeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMode(e.target.value)
    }

    const handleStatusRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(
            educ.value,
            mode,
            price.value,
            areaExp.value,
            tutorExp.value,
            avail.value,
            portrait.value,
            status
        )
        return
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <span>Educational Attainment</span>
            <input {...educ} data-testid="educ"/>
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
                        onChange={handleModeRadio}/>
                    <label htmlFor="online">Online</label>
                </div>

                <div>
                    <input 
                        type="radio" 
                        id="f2f" 
                        name="mode"
                        value="1" 
                        onChange={handleModeRadio}/>
                    <label htmlFor="f2f">F2F</label>
                </div>

                <div>
                    <input 
                        type="radio" 
                        id="both" 
                        name="mode" 
                        value="2" 
                        onChange={handleModeRadio}/>
                    <label htmlFor="both">Both</label>
                </div>
            </fieldset>
        </div>
        <div>
            <span>Price</span>
            <input {...price} data-testid="price" step=".01"/>
        </div>
        <div>
            <span>Area of expertise</span>
            <input {...areaExp} data-testid="areaExp"/>
        </div>
        <div>
            <span>Tutoring experience</span>
            <input {...tutorExp} data-testid="tutorExp"/>
        </div>
        <div>
            <span>Availability</span>
            <input {...avail} data-testid="avail"/>
        </div>
        <div>
            <span>Portrait URL</span>
            <input {...portrait} data-testid="portrait"/>
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
                        onChange={handleStatusRadio}/>
                    <label htmlFor="active">Active</label>
                </div>

                <div>
                    <input 
                        type="radio" 
                        id="inactive" 
                        name="status" 
                        value="1" 
                        onChange={handleStatusRadio}/>
                    <label htmlFor="inactive">Inactive</label>
                </div>
            </fieldset>
        </div>
        <button type="submit">Create tutor account</button>
    </form>
}

export default TutorForm