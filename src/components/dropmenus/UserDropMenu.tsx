// import { Menu, Transition } from '@headlessui/react'
// import { Fragment } from 'react'
// import { UserHeaderComponent } from '../header'
// import { cn } from '@/lib/utils'




// type Props = {
//   className?: string;
// }



// export default function UserDropdownMenu({ className }: Props) {
//   return (
//     <Menu as="div" className="relative block text-left z-50 h-auto">
//       {({ open }) => (
//         <>
//           <div className='h-auto'>
//             <Menu.Button className="p-0 w-full block">
//               <UserHeaderComponent dropdownOpen={open} className={cn(
//                 "w-full",
//                 className
//               )} />
//             </Menu.Button>
//           </div>
//           <Transition
//             as={Fragment}
//             enter="transition ease-out duration-100"
//             enterFrom="transform opacity-0 scale-95"
//             enterTo="transform opacity-100 scale-100"
//             leave="transition ease-in duration-75"
//             leaveFrom="transform opacity-100 scale-100"
//             leaveTo="transform opacity-0 scale-95"
//           >
//             <Menu.Items className="md:absolute right-0 lg:mt-1 w-full overflow-hidden origin-top-right divide-y divide-white/10 rounded-b-20 lg:rounded-20 bg-gr-purple-dark lg:shadow-lg focus:outline-none">
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={cn(
//                       'group flex w-full items-center px-5 py-4 font-jakarta text-sm text-white transition-all',
//                       active && 'bg-white/5'
//                     )}
//                   >
//                     Edit Profile
//                   </button>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={cn(
//                       'group flex w-full items-center px-5 py-4 font-jakarta text-sm text-white transition-all',
//                       active && 'bg-white/5'
//                     )}
//                   >
//                     Billing
//                   </button>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={cn(
//                       'group flex w-full items-center px-5 py-4 font-jakarta text-sm text-white transition-all',
//                       active && 'bg-white/5'
//                     )}
//                   >
//                     Logout
//                   </button>
//                 )}
//               </Menu.Item>
//             </Menu.Items>
//           </Transition>
//         </>
//       )}
//     </Menu >
//   )
// }
