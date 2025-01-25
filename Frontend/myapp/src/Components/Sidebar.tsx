import { SideBarItem } from "./SidebarItem.tsx";
import { XIcon, YIcon,BrainIcon} from '../Icons/icons.tsx';




export const SideBar = () => {
    return (
      <div className = "h-screen fixed w-72 bg-white-300 border-2 z-40">
        <div className="h-28  flex items-center px-6">
            <BrainIcon/>
            <span className="font-bold text-2xl px-3">Second Brain</span>
        </div>
        <SideBarItem icon = {<XIcon/>} title = "X"/>
        <SideBarItem icon = {<YIcon/>} title = "Youtube"/>
      </div>
    );
}