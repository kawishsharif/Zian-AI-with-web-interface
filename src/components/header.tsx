import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { cn } from '../lib/utils';
import GrBorderBox from "./ui/gr-border-box";



type Props = {
    heading: string;
    description?: string;
    menuExpanded?: boolean;
    onToggleMenu: () => void;
}

export default function Header({ heading, description, menuExpanded, onToggleMenu }: Props) {
    return (
        <header className="mt-4 lg:mt-7 mb-9 flex items-start lg:items-center justify-between w-full">
            <div className="hidden xl:block">
                <h2 className="text-[32px] leading-9 text-white font-nebula font-normal">
                    {heading}
                </h2>
                {
                    description &&
                    <p className="text-base font-jakarta">{description}</p>
                }
            </div>
            <a href="/">
                <img src="/images/avatar.png" loading="lazy" width={60} height={60}
                    className={cn(
                        "w-[60px] h-auto aspect-square rounded-full overflow-hidden xl:hidden"
                    )}
                    alt="" />
            </a>
            <div className='flex items-center gap-2 h-[50px]'>
                {/* <SearchEl />
                <NotificationsDropMenu />
                <UserDropdownMenu className="h-12 hidden md:block" /> */}
                <GrBorderBox className={cn(
                    "rounded-20 block xl:hidden z-50",
                    menuExpanded ? "fixed lg:static top-4 right-4 h-12" : "h-full"
                )}>
                    <button onClick={onToggleMenu} type="button" className='box-gr-border backdrop-blur-[10px] text-lg px-[10px] lg:px-3 h-full w-auto aspect-square text-white bg-gr-purple rounded-20'>
                        <FontAwesomeIcon icon={menuExpanded ? faXmark : faBars} />
                    </button>
                </GrBorderBox>
            </div>
        </header>
    );
}



// type UserDropElProps = {
//     dropdownOpen?: boolean;
//     className?: string;
//     toggleClassName?: string;
// }

// export function UserHeaderComponent({ className, toggleClassName, dropdownOpen }: UserDropElProps) {
//     // const [active, setActive] = useState(dropdownOpen);

//     return (
//         <GrBorderBox className={cn(
//             "h-full",
//             dropdownOpen ? "rounded-t-20 lg:rounded-20" : "rounded-20",
//             className
//         )}>
//             <div className={cn(
//                 "box-gr-border bg-gr-purple backdrop-blur-[10px]",
//                 "h-full overflow-hidden text-white",
//                 dropdownOpen ? "rounded-t-20 lg:rounded-20" : "rounded-20",
//             )}>
//                 <div role="button"
//                     className={cn(
//                         'text-lg h-full',
//                         "inline-flex items-center w-full",
//                         "aspect-auto md:aspect-square lg:aspect-auto p-[10px] lg:p-3 lg:pr-10 gap-[10px]",
//                         toggleClassName
//                     )}>
//                     <img src="/images/mike.png" loading="lazy" width={32} height={32} className={cn(
//                         'h-full w-auto aspect-square rounded-full object-contain object-center'
//                     )} />
//                     <span className={cn(
//                         'font-jakarta inline md:hidden lg:inline',
//                         'text-base md:text-sm font-bold',
//                     )}>
//                         Mike Males
//                     </span>
//                     <span className={cn(
//                         "inline-block md:hidden text-sm ps-1 absolute top-1/2 -translate-y-1/2 right-5 transition-all",
//                         dropdownOpen && "-rotate-180"
//                     )}>
//                         <FontAwesomeIcon icon={faChevronDown} />
//                     </span>
//                 </div>
//             </div>
//         </GrBorderBox >
//     )
// }




// type UserDropElProps = {
//     expandable?: boolean;
//     className?: string;
//     toggleClassName?: string;
// }

// export function UserHeaderComponent({ expandable = false, className, toggleClassName }: UserDropElProps) {
//     const [active, setActive] = useState(false);

//     const clickHandler = () => {
//         if (expandable) setActive(!active)
//     }

//     return (
//         <GrBorderBox className={cn(
//             "rounded-t-20 lg:rounded-20 h-full",
//             className
//         )}>
//             <div className={cn(
//                 "box-gr-border bg-gr-purple backdrop-blur-[10px] rounded-t-20 lg:rounded-20",
//                 "h-full overflow-hidden text-white"
//             )}>
//                 <div role="button" onClick={clickHandler}
//                     className={cn(
//                         'text-lg h-full',
//                         "inline-flex items-center",
//                         expandable ? "w-full px-5 py-3 gap-3 relative"
//                             : "aspect-square lg:aspect-auto p-[10px] lg:p-3 lg:pr-10 gap-[10px]",
//                         toggleClassName
//                     )}>
//                     <img src="/images/mike.png" loading="lazy" width={32} height={32} className={cn(
//                         'h-full w-auto aspect-square rounded-full object-contain object-center'
//                     )} />
//                     <span className={cn(
//                         'font-jakarta',
//                         expandable ? 'text-base font-bold' : 'text-sm font-bold',
//                         !expandable && 'hidden lg:inline'
//                     )}>
//                         Mike Males
//                     </span>
//                     {
//                         expandable &&
//                         <span className={cn(
//                             "text-sm ps-1 absolute top-1/2 -translate-y-1/2 right-5 transition-all",
//                             active && "-rotate-180"
//                         )}>
//                             <FontAwesomeIcon icon={faChevronDown} />
//                         </span>
//                     }
//                 </div>
//                 {
//                     active &&
//                     <ul className="w-full h-auto border-t-2 border-white/5 divide-y-2 divide-white/5">
//                         <li className="py-4 px-5 hover:bg-white/10 font-normal text-sm font-jakarta">
//                             <a href="#">Edit Profile</a>
//                         </li>
//                         <li className="py-4 px-5 hover:bg-white/10 font-normal text-sm font-jakarta">
//                             <a href="#">Billing</a>
//                         </li>
//                         <li className="py-4 px-5 hover:bg-white/10 font-normal text-sm font-jakarta">
//                             <a href="#">Logout</a>
//                         </li>
//                     </ul>
//                 }
//             </div>
//         </GrBorderBox >
//     )
// }

// function SearchEl() {
//     return (
//         <GrBorderBox className="rounded-20 h-full">
//             <div className={cn(
//                 "box-gr-border aspect-square lg:aspect-auto",
//                 "h-full w-auto md:w-[300px] bg-gr-purple backdrop-blur-[10px] rounded-20",
//                 "flex items-center justify-center lg:justify-start gap-3 p-[10px] lg:p-3 text-white"
//             )}>
//                 <FontAwesomeIcon icon={faMagnifyingGlass} />
//                 <input type="text" className='hidden md:inline bg-transparent w-full text-sm font-normal h-full outline-none border-none text-white placeholder:text-th-gray' placeholder='Search' />
//             </div>
//         </GrBorderBox>
//     );
// }