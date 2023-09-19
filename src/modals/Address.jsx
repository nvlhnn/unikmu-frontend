import { Dialog, Disclosure, RadioGroup, Transition } from "@headlessui/react";
import { styled } from "@material-ui/styles";
import { Fragment, useRef, useState } from "react";
import tw from "twin.macro";
import { CheckIcon } from "@heroicons/react/solid";

const Container = tw.div` 
    inline-block 
    w-full 
    max-w-md 
    p-6 
    my-8 
    overflow-hidden 
    text-left 
    align-middle 
    bg-white 
    shadow-xl 
    // shadow-inner
    // drop-shadow-2xl
    border-2
    border-gray-200
    rounded-2xl
`;

const Input = tw.textarea`
    outline-none
    w-full
    mt-5
    py-3
    px-4
    focus:border-blue-500
    // hover:border-green-500
    border-2
    shadow-sm 
    sm:text-sm 
    // border-red-500
    rounded-md
    // focus:outline-indigo-500
`;
const UserAddress = tw.div`
    w-full
    flex
    flex-row
    rounded
    bg-gray-200
    content-center
    justify-center
    p-3
`;

const Label = tw.label`
    w-[90%]
    p-3
    min-h-[60px]
`;

const Radio = tw.input` 
    w-[10%]
    h-20
`;

const Address = ({ isOpen, setIsOpen, address, setAddress }) => {
  let [plan, setPlan] = useState("");
  const ref = useRef();

  const handleSubmit = () => {
    if (ref.current.value) {
      setAddress(ref.current.value);
      setIsOpen(false);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Container className="transition-all transform ">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  Set Shipping Address
                </Dialog.Title>
                <div className="mt-4">
                  <Input rows={5} ref={ref} />
                  {/* <RadioGroup value={plan} onChange={setPlan}>
                                        <RadioGroup.Option value="address1 " className={({ active, checked }) =>
                                            `${active ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60' : ''}
                                            ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'}
                                            relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                                        }>
                                            <div className='flex flex-row items-center justify-between w-full'>
                                                <div>Lorem iporibus magni cum blanditiis ut non aliquam? ipsum dolor sit amet consectetur, adipisicing elit. Eum sint odit, dignissimos dolor nihil enim.</div>
                                                <div className="flex-shrink-0 text-white ml-2">
                                                    <CheckIcon className="w-6 h-6" />
                                                </div>
                                            </div>
                                        </RadioGroup.Option>
                                        <RadioGroup.Option value="address2 " className={({ active, checked }) =>
                                            `${active ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60' : ''}
                                            ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'}
                                            relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none mt-3`
                                        }>
                                            <div className='flex flex-row items-center justify-between w-full'>
                                                <div>Lorem iporibus magni cum blanditiis ut non aliquam? ipsum dolor sit amet consectetur, adipisicing elit. Eum sint odit, dignissimos dolor nihil enim.</div>
                                                <div className="flex-shrink-0 text-white ml-2">
                                                    <CheckIcon className="w-6 h-6" />
                                                </div>
                                            </div>
                                        </RadioGroup.Option>
                                    </RadioGroup> */}
                </div>
                {/* <div className="new-shipping text-center mt-3 text-blue-500">
                                    <a href="">add new shipping address</a>
                                </div> */}

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="w-[20%] inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    next
                  </button>
                </div>
              </Container>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Address;
