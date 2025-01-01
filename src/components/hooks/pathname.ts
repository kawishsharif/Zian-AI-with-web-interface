import React, { Dispatch, SetStateAction } from 'react';


export default function usePathname(): [string, Dispatch<SetStateAction<string>>] {
    const [pathname, setPathname] = React.useState("/");
    return [pathname, setPathname]
}


