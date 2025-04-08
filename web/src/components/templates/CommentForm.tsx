import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const CommentForm = () => {
    return (
        <form className="items-end mb-10">
            <div className="flex mb-5 gap-2">

                <Label>Pedagogy</Label>
                <Input />
                <Label>Helpfulness</Label>
                <Input />
                <Label>Easiness</Label>
                <Input />
            </div>
            <Textarea placeholder="Type your comment here" className="mb-5" />
            <Button> Post Comment</Button>
        </form>
    )
}

export default CommentForm