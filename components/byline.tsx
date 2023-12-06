import SignOut from '@/components/sign-out';
import { Logout } from 'heroicons-react';

export default function Byline({ className }: { className: string }) {
  return (
    <div
      className={`${className} bg-gray-300 bold bg-vc-border-gradient inset-x-0 bottom-3 mx-3 rounded-lg p-px shadow-lg shadow-black/20`}
    >
      <div className="flex justify-between rounded-lg bg-gray-100 p-3.5 lg:px-5 lg:py-3 w-full">
        <div className="text-sm text-black border-r w-full">
          <SignOut />
        </div>
        <div className="text-sm text-black pl-0">
          <Logout />
        </div>
      </div>
    </div>
  );
}
