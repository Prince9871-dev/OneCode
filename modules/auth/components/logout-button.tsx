
import React from 'react'
import { LogoutButtonProps } from '../types'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react';

const LogoutButton = ({children}:LogoutButtonProps) => {
    const router = useRouter();

    const onLogout = async () => {
        await signOut({ redirectTo: "/auth/sign-in" });
        router.refresh();
    };

    // In your `user-button.tsx` the child is a `DropdownMenuItem`.
    // Attaching the handler directly avoids Radix menu event quirks.
    if (React.isValidElement(children)) {
        type DropdownLikeProps = {
            onClick?: (event: unknown) => void;
            onSelect?: (event: unknown) => void;
        };
        const child = children as React.ReactElement<DropdownLikeProps>;
        return React.cloneElement(child, {
            onClick: async (e: unknown) => {
                child.props?.onClick?.(e);
                await onLogout();
            },
            // Radix dropdown uses `onSelect` (not just `onClick`).
            onSelect: async (e: unknown) => {
                child.props?.onSelect?.(e);
                await onLogout();
            },
        });
    }

    return <span className='cursor-pointer' onClick={() => onLogout()}>{children}</span>;
}

export default LogoutButton
