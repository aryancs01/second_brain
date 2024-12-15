import { modal } from "./atoms/atom";
import { Button } from "./compnents/ui/Button";
import { Card } from "./compnents/ui/Card";
import { DisplayContentModal } from "./compnents/ui/DisplayContentModal";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { useRecoilValue,useSetRecoilState,useResetRecoilState } from "recoil";


export function Dashboard(){
    const setState = useSetRecoilState(modal);

    function displayContentModal(){
        setState(true)
    }

    return <div>

        <div>
           {useRecoilValue(modal) && <DisplayContentModal/>}
        </div>
        
       <div className="flex p-10 gap-6 justify-end">
        <Button variant="primary"
                    text="Share Brain"
                    size="md"
                    startIcon={<ShareIcon size="lg"/>}
            />
            <Button variant="secondary"
                    text="Add Content"
                    size="md"
                    startIcon={<PlusIcon size="lg"/>}
                    onclick={displayContentModal}
            />
       </div>

       <div className="flex flex-wrap gap-6 p-5">
            <Card startIcon={<ShareIcon size="md"/>}
                  title="Title 1"
                  shareIcon = {<ShareIcon size="md"/>}
                  deleteIcon = {<ShareIcon size="md"/>}
                  link="https://x.com/mrsiipa/status/1868222753914188037"
                  type="twitter"
                  date="15/12/2024"
                  time="9:49"
            />

                <Card startIcon={<ShareIcon size="md"/>}
                  title="Title 1"
                  shareIcon = {<ShareIcon size="md"/>}
                  deleteIcon = {<ShareIcon size="md"/>}
                  link="https://youtu.be/bKhg6d4OmdE?si=sRowbUFaERM4XFTY"
                  type="youtube"
                  date="15/12/2024"
                  time="9:49"
            />
       </div>
    </div>
}