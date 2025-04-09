import { TEST } from "@/constants"
import SelectTypeForm from "../templates/SelectTypeForm"

const SelectPage = () => {

    return <div data-testid={TEST.page('select')}>
        <SelectTypeForm />
    </div>

}

export default SelectPage
