import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
const cn = (...inputs) => twMerge(clsx(inputs))

export default cn