import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { cn } from '@/lib/utils'
import GrBorderBox from '../ui/gr-border-box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faXmark } from '@fortawesome/free-solid-svg-icons'




// type Props = {
//   className?: string;
// }


export default function NotificationsDropMenu() {
  return (
    <Menu as="div" className="relative block text-left z-10 h-auto">
      {({ open }) => (
        <>
          <Menu.Button className="">
            <GrBorderBox className="rounded-20 h-12">
              <button type="button" className='box-gr-border backdrop-blur-[10px] text-lg px-[10px] lg:px-3 h-full w-auto aspect-square text-white bg-gr-purple rounded-20'>
                <FontAwesomeIcon icon={faBell} />
              </button>
            </GrBorderBox>
          </Menu.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className={cn(
              "origin-top-right rounded-20 bg-gr-purple-dark lg:shadow-lg focus:outline-none",
              "fixed top-20 right-1/2 translate-x-1/2 md:translate-x-0 md:top-full md:absolute md:right-0 ",
              "mt-1 pb-5 w-[90%] md:w-[400px] overflow-hidden ",
            )}>
              <div className='p-5 pb-2 flex items-center justify-between'>
                <h4 className='font-nebula font-normal text-xl text-white'>
                  Notifications
                </h4>
                <Menu.Item>
                  {({ close }) => (
                    <button type="button" onClick={close}
                      className="text-white block md:hidden text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className='divide-y divide-white/10 max-h-[70vh] md:max-h-[400px] overflow-y-auto'>
                <Menu.Item>
                  {({ active }) => (
                    <div className={cn(
                      'w-full px-5 py-4 space-y-1',
                      active && 'bg-white/10'
                    )}>
                      <h5 className='font-jakarta font-bold text-sm text-white line-clamp-1'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum assumenda cupiditate impedit voluptates doloribus veniam nihil blanditiis nobis eius voluptas?
                      </h5>
                      <p className='font-jakarta font-normal text-xs text-white/60'>
                        09:15 AM  |  May 6, 2023
                      </p>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div className={cn(
                      'w-full px-5 py-4 space-y-1',
                      active && 'bg-white/10'
                    )}>
                      <h5 className='font-jakarta font-bold text-sm text-white line-clamp-1'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum assumenda cupiditate impedit voluptates doloribus veniam nihil blanditiis nobis eius voluptas?
                      </h5>
                      <p className='font-jakarta font-normal text-xs text-white/60'>
                        09:15 AM  |  May 6, 2023
                      </p>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div className={cn(
                      'w-full px-5 py-4 space-y-1',
                      active && 'bg-white/10'
                    )}>
                      <h5 className='font-jakarta font-bold text-sm text-white line-clamp-1'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum assumenda cupiditate impedit voluptates doloribus veniam nihil blanditiis nobis eius voluptas?
                      </h5>
                      <p className='font-jakarta font-normal text-xs text-white/60'>
                        09:15 AM  |  May 6, 2023
                      </p>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div className={cn(
                      'w-full px-5 py-4 space-y-1',
                      active && 'bg-white/10'
                    )}>
                      <h5 className='font-jakarta font-bold text-sm text-white line-clamp-1'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum assumenda cupiditate impedit voluptates doloribus veniam nihil blanditiis nobis eius voluptas?
                      </h5>
                      <p className='font-jakarta font-normal text-xs text-white/60'>
                        09:15 AM  |  May 6, 2023
                      </p>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div className={cn(
                      'w-full px-5 py-4 space-y-1',
                      active && 'bg-white/10'
                    )}>
                      <h5 className='font-jakarta font-bold text-sm text-white line-clamp-1'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum assumenda cupiditate impedit voluptates doloribus veniam nihil blanditiis nobis eius voluptas?
                      </h5>
                      <p className='font-jakarta font-normal text-xs text-white/60'>
                        09:15 AM  |  May 6, 2023
                      </p>
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu >
  )
}
