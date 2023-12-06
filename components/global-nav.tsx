'use client';

import { demos, type Item } from '@/lib/demos';
import { NextLogo } from '@/components/next-logo';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { MenuAlt2 } from 'heroicons-react';
import clsx from 'clsx';
import { useState } from 'react';
import Byline from '@/components/byline';

export function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-gray-100 lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-gray-300">
      <div className="flex h-14 items-center px-4 py-4 lg:h-auto">
        <Link
          href="/"
          className="group flex w-full items-center gap-x-2.5"
          onClick={close}
        >
          <div className="h-7 w-7 rounded-full border border-white/30 group-hover:border-white/50">
            <NextLogo />
          </div>

          <h3 className="font-semibold tracking-wide text-gray-800 group-hover:text-gray-500">
            H8 Booking
          </h3>
        </Link>
      </div>
      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium text-gray-100 group-hover:text-gray-800">
          Menu
        </div>
        {isOpen ? (
          <div className="font-medium text-gray-100 group-hover:text-gray-800">
            X
          </div>
        ) : (
          <MenuAlt2 className="block w-6 text-gray-800" />
        )}
      </button>

      <div
        className={clsx('overflow-y-auto lg:static lg:block', {
          'fixed inset-x-0 bottom-0 top-14 mt-px bg-gray-200': isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className="space-y-6 px-2 pb-24 pt-5">
          {demos.map((section) => (
            <div key={section.name}>
              <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-800/80">
                <div>{section.name}</div>
              </div>

              <div className="space-y-1">
                {section.items.map((item) => (
                  <GlobalNavItem key={item.slug} item={item} close={close} />
                ))}
              </div>
            </div>
          )
          )}
        </nav>
        <Byline className="absolute hidden sm:block" />
      </div>
    </div>
  );
}

function GlobalNavItem({
  item,
  close,
}: {
  item: Item;
  close: () => false | void;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = item.slug === segment;

  return (
    <Link
      onClick={close}
      href={`/${item.slug}`}
      className={clsx(
        'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-800',
        {
          'text-gray-800 hover:bg-gray-200': !isActive,
          'text-black': isActive,
          'bg-gray-200': isActive,
        },
      )}
    >
      {item.name}
    </Link>
  );
}
