import { TEST } from "@/constants/constants"
import SelectTypeForm from "../containers/SelectTypeForm"

const SelectPage = () => {

    return <div data-testid={TEST.page('select')}>
        <SelectTypeForm />
    </div>

}

export default SelectPage
