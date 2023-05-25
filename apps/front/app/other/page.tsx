'use client';

import Link from 'next/link';

export default async function Other() {
  return (
    <div>
      Other page <Link href="/">back</Link>
    </div>
  );
}
