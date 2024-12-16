import { modal } from "../atoms/atom";
import { Button } from "../compnents/ui/Button";
import { Card } from "../compnents/ui/Card";
import { DisplayContentModal } from "../compnents/ui/DisplayContentModal";
import { Sidebar } from "../compnents/ui/Sidebar";
import { useContent } from "../hook/useContent";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useRecoilValue,useSetRecoilState } from "recoil";


export function Dashboard(){
    const setState = useSetRecoilState(modal);
    const content = useContent();

    function displayContentModal(){
        setState(true)
    }

    return <div>

        <div>
           {useRecoilValue(modal) && <DisplayContentModal/>}
        </div>

        <div>
            <Sidebar/>
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

       <div className="flex flex-wrap gap-6 p-5 ml-80">
        {content.map(({type,link,description,title,date,time})=>
            <Card 
                title={title}
                startIcon = {<ShareIcon size="md"/>}
                deleteIcon = {<ShareIcon size="md"/>}
                shareIcon = {<ShareIcon size="md"/>}
                link={link}  
                description={description}
                type={type}
                date={date}
                time={time}
            />
        )}
       </div>
    </div>
}