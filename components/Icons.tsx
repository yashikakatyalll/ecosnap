import React from 'react';

// A generic icon props type
type IconProps = React.SVGProps<SVGSVGElement>;
type EcoSnapFullLogoIconProps = IconProps & { textColor?: string };

export const EcoSnapFullLogoIcon: React.FC<EcoSnapFullLogoIconProps> = ({ textColor = '#212121', ...props }) => (
    <svg viewBox="0 0 190 190" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="grad-green-full" x1="89" y1="118.2" x2="89" y2="25.2" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#10b981"/>
                <stop offset="1" stop-color="#6ee7b7"/>
            </linearGradient>
            <style>
                {`.ecosnap-text { font-family: Poppins, sans-serif; font-weight: 700; font-size: 38px; fill: ${textColor}; }`}
            </style>
        </defs>
        <g transform="translate(6, 0)">
            {/* Camera Body */}
            <g>
                <path d="M172.5 25.2h-17.2V16c0-3.1-2.5-5.6-5.6-5.6H28.3c-3.1 0-5.6 2.5-5.6 5.6v9.2H5.5C2.5 25.2 0 27.7 0 30.8v56.6c0 3.1 2.5 5.6 5.5 5.6h167c3.1 0 5.5-2.5 5.5-5.6V30.8c0-3.1-2.5-5.6-5.5-5.6z" fill="#212121"/>
                <path d="M153.2 10.4H44.1c-1.1 0-2 1-2 2.2v3.4h113.1v-3.4c0-1.2-.9-2.2-2-2.2z" fill="#e0e0e0"/>
                <path d="M155.2 16H42.1c-1.2 0-2.2 1-2.2 2.2v7h117.4v-7c0-1.2-1-2.2-2.2-2.2z" fill="#424242"/>
                <path fill="url(#grad-green-full)" d="M5.5 25.2h167c3.1 0 5.5 2.5 5.5 5.6v56.6c0 3.1-2.5 5.6-5.5-5.6H5.5c-3.1 0-5.5-2.5-5.5-5.6V30.8c0-3.1 2.5-5.6 5.5-5.6z"/>
                <circle cx="163.5" cy="36.2" r="3.1" fill="#fff"/>
                <path d="M20.2 38.4c-.6 0-1-.4-1-1v-4.4c0-.6.4-1 1-1h1.8c.6 0 1 .4 1 1v4.4c0 .6-.4 1-1 1h-1.8z" fill="#212121"/>
                <g fill="#fff">
                    <circle cx="34.1" cy="33.4" r="1.8"/>
                    <circle cx="40.7" cy="33.4" r="1.8"/>
                </g>
            </g>
            {/* Lens and Recycle Symbol */}
            <g>
                <circle cx="89" cy="71.2" r="35" fill="#212121"/>
                <circle cx="89" cy="71.2" r="32" fill="#fff"/>
                <text x="89" y="71.2" fontSize="48" textAnchor="middle" dy=".35em" fill="#212121">♻️</text>
            </g>
        </g>
        {/* Text */}
        <g transform="translate(0, 125)">
            <text x="10" y="45" className="ecosnap-text">E<tspan fill="#34D399">co</tspan>Snap</text>
        </g>
    </svg>
);


export const CheckCircleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const RecycleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0zm-5.6-2.5a.75.75 0 0 0-1.06 1.06l.8.8H12.5a.75.75 0 0 0 0 1.5h2.64l-.8.8a.75.75 0 1 0 1.06 1.06l2.05-2.05a.75.75 0 0 0 0-1.06l-2.05-2.05zm-3.8 6a.75.75 0 0 0-1.06-1.06l-.8-.8V12.5a.75.75 0 0 0-1.5 0v2.64l-.8-.8a.75.75 0 0 0-1.06 1.06l2.05 2.05a.75.75 0 0 0 1.06 0l2.05-2.05zM9.6 8.5a.75.75 0 0 0 1.06-1.06l-2.05-2.05a.75.75 0 0 0-1.06 0L5.5 7.44a.75.75 0 1 0 1.06 1.06l.8-.8h2.64a.75.75 0 0 0 0-1.5H7.36l.8-.8z"/>
    </svg>
);


export const TrashIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.144-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.057-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

export const LeafIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8.16,20C12.39,20 15.85,16.12 16.5,11.58C17.42,11.18 18,10.23 18,9.21C18,8.55 17.59,8 17,8Z" />
    </svg>
);

export const BiohazardIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const GiftIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A3.375 3.375 0 006.375 8.25v2.25H17.625v-2.25A3.375 3.375 0 0012 4.875z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75v6.75" />
    </svg>
);

export const QuestionMarkCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.47-1.47L13 18.25l1.188-.648a2.25 2.25 0 011.47-1.47L16.25 15l.648 1.188a2.25 2.25 0 011.47 1.47L19.5 18.25l-1.188.648a2.25 2.25 0 01-1.47 1.47z" />
  </svg>
);

export const MapPinIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

export const SpinnerIcon: React.FC<IconProps> = (props) => (
    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

export const PencilSquareIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
);


export const UserCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const Squares2x2Icon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 8.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
);

export const ViewfinderIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V7.5a2.25 2.25 0 012.25-2.25h1.5M3 15.75V16.5a2.25 2.25 0 002.25 2.25h1.5M16.5 3.75h1.5a2.25 2.25 0 012.25 2.25V8.25M16.5 20.25h1.5a2.25 2.25 0 002.25-2.25V15.75M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
    </svg>
);

export const CameraIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
        <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.451.246 2.599 1.496 2.599 2.969V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.473 1.148-2.723 2.599-2.969.382-.064.766-.123 1.152-.177.465-.067.87-.327 1.11-.71l.822-1.317c.502-.805 1.365-1.338 2.332-1.39zM12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" clipRule="evenodd" />
    </svg>
);

export const ArrowRightOnRectangleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

export const BookOpenIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

export const PuzzlePieceIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        <path fillRule="evenodd" d="M6.75 3.75A3 3 0 003.75 6.75v10.5a3 3 0 003 3h10.5a3 3 0 003-3V6.75a3 3 0 00-3-3H6.75zM5.25 6.75c0-.828.672-1.5 1.5-1.5h10.5c.828 0 1.5.672 1.5 1.5v3a.75.75 0 01-1.5 0v-3H6.75a.75.75 0 01-.75-.75zM6.75 12a.75.75 0 00-.75.75v4.5c0 .828.672 1.5 1.5 1.5h10.5c.828 0 1.5-.672 1.5-1.5v-4.5a.75.75 0 00-1.5 0v4.5H6.75v-4.5A.75.75 0 006.75 12z" clipRule="evenodd" />
    </svg>
);

export const LightbulbIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 111.06-1.06l1.591 1.59a.75.75 0 11-1.06 1.06l-1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM17.834 17.834a.75.75 0 11-1.06-1.06l1.59-1.591a.75.75 0 111.06 1.06l-1.59 1.591zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 11-1.06 1.06l-1.59-1.591a.75.75 0 111.06-1.06l1.59 1.591zM6.106 5.046a.75.75 0 111.06 1.06L5.576 7.697a.75.75 0 11-1.06-1.06l1.59-1.591zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12z" />
    </svg>
);

export const GlobeAltIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.001 2.25A9.75 9.75 0 002.25 12c0 2.28.767 4.417 2.066 6.115a.75.75 0 001.06-1.06 8.25 8.25 0 119.389 0 .75.75 0 001.06 1.06A9.75 9.75 0 0012.001 2.25z" />
        <path fillRule="evenodd" d="M12 21.75a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0v4.5a.75.75 0 01-.75.75zM10.125 12a.75.75 0 00-1.5 0v.005c0 .414.336.75.75.75h.005a.75.75 0 00.75-.75V12zM12.75 12a.75.75 0 00-1.5 0v.005c0 .414.336.75.75.75h.005a.75.75 0 00.75-.75V12zM15.375 12a.75.75 0 00-1.5 0v.005c0 .414.336.75.75.75h.005a.75.75 0 00.75-.75V12zm-3.373 3.42a.75.75 0 00-1.299-.75l-1.503 2.6a.75.75 0 001.3.75l1.503-2.6zM13.623 15.42a.75.75 0 00-1.299.75l1.503 2.6a.75.75 0 001.3-.75l-1.503-2.6z" clipRule="evenodd" />
    </svg>
);

export const GameControllerIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21,9H15V4a2,2,0,0,0-2-2H11A2,2,0,0,0,9,4V9H3a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2H9v5a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V19h6a2,2,0,0,0,2-2V11A2,2,0,0,0,21,9ZM11,6h2V9H11ZM8,12v2H6V12ZM18,14H16V12h2Z"/>
    </svg>
);


export const SunIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 111.06-1.06l1.591 1.59a.75.75 0 11-1.06 1.06l-1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM17.834 17.834a.75.75 0 11-1.06-1.06l1.59-1.591a.75.75 0 111.06 1.06l-1.59 1.591zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 11-1.06 1.06l-1.59-1.591a.75.75 0 111.06-1.06l1.59 1.591zM6.106 5.046a.75.75 0 111.06 1.06L5.576 7.697a.75.75 0 11-1.06-1.06l1.59-1.591zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12z" />
    </svg>
);

export const FlowerIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 11.5A2.5 2.5 0 009.5 14a2.5 2.5 0 002.5 2.5 2.5 2.5 0 002.5-2.5A2.5 2.5 0 0012 11.5zM12.5 4.75a.75.75 0 00-1.5 0v2.4a4.49 4.49 0 00-3.37 3.37H5.25a.75.75 0 000 1.5h2.38a4.49 4.49 0 003.37 3.37v2.38a.75.75 0 001.5 0v-2.38a4.49 4.49 0 003.37-3.37h2.38a.75.75 0 000-1.5h-2.38a4.49 4.49 0 00-3.37-3.37V4.75z"/>
    </svg>
);

export const PottedPlantIcon: React.FC<IconProps> = (props) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 11.5A2.5 2.5 0 009.5 14a2.5 2.5 0 002.5 2.5 2.5 2.5 0 002.5-2.5A2.5 2.5 0 0012 11.5zM12.5 4.75a.75.75 0 00-1.5 0v2.4a4.49 4.49 0 00-3.37 3.37H5.25a.75.75 0 000 1.5h2.38a4.49 4.49 0 003.37 3.37v2.38a.75.75 0 001.5 0v-2.38a4.49 4.49 0 003.37-3.37h2.38a.75.75 0 000-1.5h-2.38a4.49 4.49 0 00-3.37-3.37V4.75z"/>
    </svg>
);


export const PlusIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const HeartIcon: React.FC<IconProps & { filled?: boolean }> = ({ filled = false, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

export const ChatBubbleOvalLeftEllipsisIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-2.53-.405l-4.09 2.135a.75.75 0 01-1.02-.87l1.13-3.957a9.968 9.968 0 01-2.28-5.182C3 7.444 7.03 3.75 12 3.75s9 3.694 9 8.25z" />
    </svg>
);

export const PaperAirplaneIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);

export const TrophyIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 011.316-5.324 9.75 9.75 0 01-1.316-5.324h9a9.75 9.75 0 01-1.316 5.324A9.75 9.75 0 0116.5 18.75zM12 12.75h.008v.008H12v-.008z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 7.5v1.5A7.5 7.5 0 0012 16.5h0a7.5 7.5 0 007.5-7.5V7.5m-15 0a7.5 7.5 0 017.5-7.5h0a7.5 7.5 0 017.5 7.5" />
  </svg>
);

export const CheckBadgeIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12c0 1.357-.6 2.573-1.549 3.397a4.49 4.49 0 01-1.307 3.498 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

export const EyeIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const EyeSlashIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);