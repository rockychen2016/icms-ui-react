import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import ICMSUser, { ICMSUserProps } from "./icms-user";
import ICMSCard from "./icms-card";

const starMap: Record<string, React.ReactNode> = {
    "0": <div className="flex items-center text-xl text-yellow-500">
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
    </div>,
    "1": <div className="flex items-center text-xl text-yellow-500">
        <AiFillStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
    </div>,
    "2": <div className="flex items-center text-xl text-yellow-500">
        <AiFillStar />
        <AiFillStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
    </div>,
    "3": <div className="flex items-center text-xl text-yellow-500">
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiOutlineStar />
        <AiOutlineStar />
    </div>,
    "4": <div className="flex items-center text-xl text-yellow-500">
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiOutlineStar />
    </div>,
    "5": <div className="flex items-center gap-2 text-yellow-500">
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
    </div>
}
export type ICMSCommentCardProps = {
    star: 0 | 1 | 2 | 3 | 4 | 5,
    content: string,
    user: ICMSUserProps,
    className?: string,
}
export default function ICMSCommentCard({
    star,
    content,
    user,
    className = ''
}: Readonly<ICMSCommentCardProps>) {
    return (
        <ICMSCard
            className={`${className}`}
            showDivider={false}
            header={
                starMap[star]
            }
            body={
                <p>{content}</p>
            }
            footer={
                <ICMSUser
                    {...user}
                />
            }
        />
    );
}