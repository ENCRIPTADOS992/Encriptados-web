// // src/components/ModalPayment/ModalPayment.tsx
// import { Fragment, ReactNode } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import styles from "./ModalPayment.module.css";

// type Props = {
//   onClose?: () => void;
//   visible?: boolean;
//   children?: ReactNode;
// };

// const ModalPayment = ({ onClose = () => {}, visible = false, children }: Props) => {
//   return (
//     <Transition.Root show={visible} as={Fragment}>
//       <Dialog as="div" className={styles.dialogWrapper} onClose={onClose}>
//         <div className={styles.backdrop} aria-hidden="true" />

//         <div className={styles.container}>
//           <Transition.Child
//             as={Fragment}
//             enter="transition ease-out duration-300 transform"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="transition ease-in duration-200 transform"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >
//             <Dialog.Panel className={styles.modalPanel}>
//               {children}
//             </Dialog.Panel>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// };

// export default ModalPayment;
