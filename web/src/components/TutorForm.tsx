import { useField } from "../hooks"

const TutorForm = () => {
    const { reset: educReset, ...educ} = useField('text');
    
    const { reset: priceReset, ...price} = useField('number');
    const { reset: areaExpReset, ...areaExp} = useField('text');
    const { reset: tutorExpReset, ...tutorExp} = useField('text');
    const { reset: availReset, ...avail} = useField('text');
    const { reset: portraitReset, ...portrait} = useField('text');
    const { reset: statusReset, ...status} = useField('mode');



    return <>
        <div>
            <span>Educational Attainment</span>
            <input {...educ} data-testid="educ"/>
        </div>
        <div>
            <fieldset>
                <legend>Select your offered learning mode: </legend>
                <div>
                    <input type="radio" id="online" name="mode" value="0" checked />
                    <label htmlFor="online">Online</label>
                </div>

                <div>
                    <input type="radio" id="f2f" name="mode" value="1" />
                    <label htmlFor="f2f">F2F</label>
                </div>

                <div>
                    <input type="radio" id="both" name="mode" value="2" />
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
                    <input type="radio" id="active" name="status" value="0" checked />
                    <label htmlFor="active">Active</label>
                </div>

                <div>
                    <input type="radio" id="inactive" name="status" value="1" />
                    <label htmlFor="inactive">Inactive</label>
                </div>
            </fieldset>
        </div>
        <button type="submit" > Upload</button>
    </>
}

export default TutorForm