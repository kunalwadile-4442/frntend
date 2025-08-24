/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from "react";
import SmileImage from "../../asset/emoji/Smileys1.png";
import ActivitiesImage from "../../asset/emoji/Activities1.png";
import AnimalNatureImage from "../../asset/emoji/Animals1.png";
import FlagImage from "../../asset/emoji/flag1.png";
import FoodDriknsImage from "../../asset/emoji/food1.png";
import ObjectsImage from "../../asset/emoji/Objects1.png";
import TravelImage from "../../asset/emoji/Travel1.png";
import NoEmoji from "../../asset/emoji/NoEmojiFound.png";
import { usePosterReducers } from "../../redux/getdata/usePostReducer";
import Scrollbar from "../../view/components/Scrollbar";
import emoji from "./emoji.json";

interface Emoji {
    emoji: string;
    description?: string;
}

interface EmojiPickerProps {
    isMessageEmpty?: { emojiIstrue: boolean; messageIstrue: boolean };
    setIsMessageEmpty?: (value: { emojiIstrue: boolean; messageIstrue: boolean }) => void;
    setpicker?: (value: boolean) => void;
    id?: string;
    setIstextEmoji?: (value: boolean) => void;
    setLocalMessage?: any;
    onEmojiClick?: (emoji: Emoji) => void;
    className?:string;
    innerClassName?:string;
}

const EmojiPicker: React.FC<EmojiPickerProps> = (props) => {
    const [SelectEmojiTab, setSelectEmojiTab] = useState<string>("Smileys & Emotion");
    const [searchEmojiValue, setSearchEmojiValue] = useState<string>("");

    const selectEmoji = (emoji: Emoji) => {
        // props.setLocalMessage((prev) => prev + emoji.emoji)
        if (props.onEmojiClick) {
            props.onEmojiClick(emoji);
        }
    };

    const SearchEmojiArray = useMemo(()=>{
        return emoji?.filter((elm) => elm?.category === SelectEmojiTab)?.filter((elm: Emoji) => {
            if (searchEmojiValue === "") {
                return elm;
            } else if (elm?.description?.toLowerCase()?.includes(searchEmojiValue?.toLowerCase())) {
                return elm;
            }
        }) || [];
    }, [SelectEmojiTab, searchEmojiValue])

    return (
        <div className={`z-50 bg-white rounded-lg shadow-lg ${props?.className ? props?.className : "max-w-sm"} mx-auto`}>
            {/* Tab buttons */}
            <div className="  px-2 pt-2 btngrouptbsemoji mb-2">
                <button
                    className={`bg-no-repeat bg-center py-0 ${SelectEmojiTab === "Smileys & Emotion" ? "btn btn-primary" : "btn"}`}
                    onClick={() => setSelectEmojiTab("Smileys & Emotion")}
                    // style={{ backgroundImage: `url(${SmileImage})` }}
                >
                    <img src={SmileImage} alt="SmileImage" className="mb-[0px!important]"/>
                </button>
                <button
                    className={`bg-no-repeat bg-center py-0 ${SelectEmojiTab === "Activities" ? "btn btn-primary" : "btn"}`}
                    onClick={() => setSelectEmojiTab("Activities")}
                    // style={{ backgroundImage: `url(${ActivitiesImage})` }}
                >
                    <img src={ActivitiesImage} alt="ActivitiesImage" className="mb-[0px!important]"/>
                </button>
                <button
                    className={`bg-no-repeat bg-center py-0 ${SelectEmojiTab === "Animals & Nature" ? "btn btn-primary" : "btn"}`}
                    onClick={() => setSelectEmojiTab("Animals & Nature")}
                    // style={{ backgroundImage: `url(${AnimalNatureImage})` }}
                >
                    <img src={AnimalNatureImage} alt="AnimalNatureImage" className="mb-[0px!important]"/>
                </button>
                <button
                    className={`bg-no-repeat bg-center py-0 ${SelectEmojiTab === "Flags" ? "btn btn-primary" : "btn"}`}
                    onClick={() => setSelectEmojiTab("Flags")}
                    // style={{ backgroundImage: `url(${FlagImage})` }}
                >
                    <img src={FlagImage} alt="FlagImage" className="mb-[0px!important]"/>
                </button>
                <button
                    className={`bg-no-repeat bg-center py-0 ${SelectEmojiTab === "Food & Drink" ? "btn btn-primary" : "btn"}`}
                    onClick={() => setSelectEmojiTab("Food & Drink")}
                    // style={{ backgroundImage: `url(${FoodDriknsImage})` }}
                >
                    <img src={FoodDriknsImage} alt="FoodDriknsImage" className="mb-[0px!important]"/>
                </button>
                <button
                    className={`bg-no-repeat bg-center py-0 ${SelectEmojiTab === "Objects" ? "btn btn-primary" : "btn"}`}
                    onClick={() => setSelectEmojiTab("Objects")}
                    // style={{ backgroundImage: `url(${ObjectsImage})` }}
                >
                    <img src={ObjectsImage} alt="ObjectsImage" className="mb-[0px!important]"/>
                </button>
                <button
                    className={`bg-no-repeat bg-center py-0 ${SelectEmojiTab === "Travel & Places" ? "btn btn-primary" : "btn"}`}
                    onClick={() => setSelectEmojiTab("Travel & Places")}
                    // style={{ backgroundImage: `url(${TravelImage})` }}
                >
                    <img src={TravelImage} alt="TravelImage" className="mb-[0px!important]"/>
                </button>
            </div>
            <div className="pb-2 px-3">
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchEmojiValue}
                        onChange={(e) => setSearchEmojiValue(e.target.value)}
                        placeholder={"Search emoji in " + SelectEmojiTab.replace("_", " ").toLowerCase()}
                        className="w-full leading-none p-1 px-2 border rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <Scrollbar style={{ height: `${props?.innerClassName}` }}>
                    <ul className="grid grid-cols-7 gap-x-5 gap-y-2  px-2">
                        {SearchEmojiArray?.map((emoji, index) => (
                            <li
                                key={index}
                                className="flex justify-center items-center text-2xl cursor-pointer  bg-transparent rounded-3xl drop-shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-br from-yellow-200 to-yellow-400"
                                onClick={() => selectEmoji(emoji)}
                            >
                                {emoji?.emoji}
                            </li>
                        ))}
                        {SearchEmojiArray?.length === 0 && (
                            <div className="col-span-8 flex flex-col items-center">
                                <img src={NoEmoji} alt="No emoji found" className="w-16 h-16 mb-2" />
                                <h4 className="text-gray-500 text-sm">Emoji Not Found</h4>
                            </div>
                        )}
                    </ul>
                </Scrollbar>
            </div>
        </div>
    );
};

export default EmojiPicker;/*  */