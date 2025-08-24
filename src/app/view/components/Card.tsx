import React from 'react';

interface CardProps {
    imageSrc: string;
    fileName: string;
    profileName: string;
    profileImageSrc: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, fileName, profileName, profileImageSrc }) => {
    return (
        <div className="w-[159px] border border-gray-300 rounded-lg shadow-sm">
            {/* Image */}
            <img src={imageSrc} alt={fileName} className="w-full h-[100px] object-cover rounded-t-lg" />
            
            {/* File name and profile info */}
            <div className="p-2">
                <p className="text-sm font-semibold">{fileName}</p>
                <div className="flex items-center mt-2">
                    <img src={profileImageSrc} alt={profileName} className="w-6 h-6 rounded-full mr-2" />
                    <p className="text-xs text-gray-600">{profileName}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
