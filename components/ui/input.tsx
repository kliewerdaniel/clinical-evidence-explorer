import * as React from 'react';
export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={'flex h-9 w-full rounded-md border bg-background px-3 py-1 text-sm shadow-sm ' + (className || '')} {...props} />;
}
