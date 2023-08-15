/* eslint-disable react-hooks/exhaustive-deps */
// others
import { useState, useContext } from "react";
import { MapperContext } from "../../../globalVariable/MapperContextProvider";
// Mantine
import { useDisclosure } from "@mantine/hooks";
import { Button, LoadingOverlay } from "@mantine/core";
// icons
import { MdOutlineCancel } from "react-icons/md";

export default function SkillModalComponent({
  docID,
  skillName,
  logo
}: {
  docID: string,
  skillName: string,
  logo: string
}) {
  // global variable
  const {
    authUser,
    deleteDocAndStorage,
  } = useContext(MapperContext);
  // confirm model
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  // loading overlay hook
  const [visible, { toggle }] = useDisclosure(false);

  // handel confirm modal
  const handleConfirmModal = () => {
    setIsConfirmModalOpen(!isConfirmModalOpen)
  }

  // notification
  const handleNotification = () => {
    toggle()
    deleteDocAndStorage("SkillLogo/", "Skill/", docID)

    setTimeout(() => {
      window.location.href = "/?w=4";
    }, 1000);
  }

  return (
    <div className='flex flex-col font-light p-3'>
      {/* loading overlay */}
            {
        localStorage.getItem("theme") === "light" ?
        <LoadingOverlay visible={visible} overlayBlur={2} /> :
        <LoadingOverlay visible={visible} overlayBlur={2} overlayColor="#0B1A33" />
      }
      {
        isConfirmModalOpen === false ?
          <>
            {/* skill logo */}
            <div className='flex justify-center items-center bg-[#9a9a9a17] p-[2rem] rounded-lg'>
              <img src={logo} alt={skillName} width={150} />
            </div>
            {/* skill name */}
            <span className='text-black dark:text-white text-[20px] sm:text-[20px] md:text-[20px] lg:text-[25px] font-medium mt-5 mb-1'>{skillName}</span>
            {/* delete button */}
            {
              authUser !== null ?
                <button onClick={handleConfirmModal} className="ml-auto mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[0rem] text-[#FF0000] hover:underline text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Delete Skill</button> :
                <></>
            }
          </> :
          <div className="flex flex-col justify-center items-center">
            <MdOutlineCancel className="text-[#FF0000] text-[100px] mb-[0.5rem]" />
            <span className="mb-[1rem] text-justify text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A] dark:text-[#94A3B8]">Are you sure you want to delete {skillName} skill?</span>
            <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center">
              <Button onClick={handleConfirmModal} size='md' className='bg-[#9A9A9A] hover:bg-[#666666] w-[150px] my-[0.5rem] mx-5'>Back</Button>
              <Button onClick={handleNotification} size='md' className='bg-[#FF0000] hover:bg-[#cc0000] w-[150px] my-[0.5rem] mx-5'>Delete</Button>
            </div>
          </div>
      }
    </div>
  )
}