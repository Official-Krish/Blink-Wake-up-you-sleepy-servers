import { AnimateNoti } from "./AnimateNoti";
import RotatingIcons from "./ui/RotatingIcons";

export default function Notification() {
    return (
        <div className="grid grid-cols-2 gap-4 justify-center items-center py-6 mb-10">
            <RotatingIcons />
            <AnimateNoti/>
        </div>
    )
}