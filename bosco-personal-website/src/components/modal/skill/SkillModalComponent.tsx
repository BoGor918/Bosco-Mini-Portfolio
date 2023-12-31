/* eslint-disable react-hooks/exhaustive-deps */
// others
import { useState, useContext } from "react";
import { MapperContext } from "../../../globalVariable/MapperContextProvider";
// firebase
import { firestore } from '../../../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage"
// Mantine
import { useForm } from '@mantine/form';
import { useDisclosure } from "@mantine/hooks";
import { Button, LoadingOverlay, TextInput, FileInput, Box } from "@mantine/core";
// icons
import { MdOutlineCancel } from "react-icons/md";
// react lazy load image
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function SkillModalComponent({
  docID,
  skillName,
  logo,
  createDate,
}: {
  docID: string,
  skillName: string,
  logo: string,
  createDate: Date,
}) {
  // global variable
  const {
    authUser,
    deleteDocAndStorage,
    companyData,
    projectData,
  } = useContext(MapperContext);
  // confirm model
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(true)
  // edit model
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  // delete model
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  // loading overlay hook
  const [visible, { toggle }] = useDisclosure(false);
  // firebase storage
  const storage = getStorage()
  // form hook
  const form = useForm({
    initialValues: {
      skillName: skillName,
      logo: '',
    },
  });

  // update skill function
  const UpdateSkill = (skill: any) => {
    if (skill.logo === "") {
      // update data without logo
      toggle()

      // update all company data that contain the skill set name
      companyData.forEach((company: any) => {
        const companyRef = doc(firestore, "Company", company.id);

        for (let i = 0; i < company.SkillSets.length; i++) {
          if (company.SkillSets[i] === skillName) {
            updateDoc(companyRef, {
              SkillSets: [...company.SkillSets.slice(0, i), skill.skillName, ...company.SkillSets.slice(i + 1)],
            })
          }
        }
      })

      // update all project data that contain the skill set name
      projectData.forEach((project: any) => {
        const projectRef = doc(firestore, "Project", project.id);

        for (let i = 0; i < project.TechStack.length; i++) {
          if (project.TechStack[i] === skillName) {
            updateDoc(projectRef, {
              TechStack: [...project.TechStack.slice(0, i), skill.skillName, ...project.TechStack.slice(i + 1)],
            })
          }
        }
      })

      // update doc
      updateDoc(doc(firestore, "Skill", docID), {
        SkillName: skill.skillName,
      }).then(() => {
        setTimeout(() => {
          window.location.href = "/?w=4";
        }, 1000)
      })
    } else if (skill.logo !== "") {
      // update data with logo
      toggle()
      deleteDocAndStorage("SkillLogo/", "Skill/", docID)

      const modifyDocID = docID.match(/\d[\d-]*/);
      const timeCode = skill.skillName.replace(/\s+/g, '-') + "-" + modifyDocID

      const skillLogoRef = ref(storage, "SkillLogo/" + timeCode);

      // update all company data that contain the skill set name
      companyData.forEach((company: any) => {
        const companyRef = doc(firestore, "Company", company.id);

        for (let i = 0; i < company.SkillSets.length; i++) {
          if (company.SkillSets[i] === skillName) {
            updateDoc(companyRef, {
              SkillSets: [...company.SkillSets.slice(0, i), skill.skillName, ...company.SkillSets.slice(i + 1)],
            })
          }
        }
      })

      // update all project data that contain the skill set name
      projectData.forEach((project: any) => {
        const projectRef = doc(firestore, "Project", project.id);

        for (let i = 0; i < project.TechStack.length; i++) {
          if (project.TechStack[i] === skillName) {
            updateDoc(projectRef, {
              TechStack: [...project.TechStack.slice(0, i), skill.skillName, ...project.TechStack.slice(i + 1)],
            })
          }
        }
      })

      // update doc
      uploadBytes(skillLogoRef, skill.logo).then(() => {
        getDownloadURL(skillLogoRef).then((url) => {
          setDoc(doc(firestore, "Skill", timeCode), {
            SkillName: skill.skillName,
            Logo: url,
            CreateDate: createDate,
          }).then(() => {
            setTimeout(() => {
              window.location.href = "/?w=4";
            }, 1000)
          })
        })
      })
    }
  }

  // handel confirm modal
  const handleInfoModal = () => {
    setIsInfoModalOpen(true)
    setIsEditModalOpen(false)
    setIsDeleteModalOpen(false)
  }

  // handle edit modal
  const handleEditModal = () => {
    setIsInfoModalOpen(false)
    setIsEditModalOpen(true)
    setIsDeleteModalOpen(false)
  }

  // handle delete modal
  const handleDeleteModal = () => {
    setIsInfoModalOpen(false)
    setIsEditModalOpen(false)
    setIsDeleteModalOpen(true)
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
    <Box pos="relative">
      <div className='flex flex-col font-light p-3'>
        {/* loading overlay */}
        {
          localStorage.getItem("theme") === "light" ?
            <LoadingOverlay visible={visible} overlayBlur={2} /> :
            <LoadingOverlay visible={visible} overlayBlur={2} overlayColor="#0B1A33" />
        }
        {
          isInfoModalOpen === true ?
            <>
              {/* skill logo */}
              <div className='flex justify-center items-center bg-[#9a9a9a17] p-[2rem] rounded-lg'>
                <LazyLoadImage src={logo} alt={skillName} width={150} effect='blur' />
              </div>
              {/* skill name */}
              <span className='text-black dark:text-white text-[20px] sm:text-[20px] md:text-[20px] lg:text-[25px] font-medium mt-5 mb-1'>{skillName}</span>
              {/* delete button */}
              {
                authUser !== null ?
                  <button onClick={handleEditModal} className="ml-auto mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[0rem] text-[#9A9A9A] dark:text-[#94A3B8] hover:underline text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Edit Skill</button> :
                  <></>
              }
            </> : <></>
        }
        {
          isEditModalOpen === true ?
            <div className='flex flex-col font-light'>
              <form onSubmit={form.onSubmit((values) => UpdateSkill(values))}>
                {/* skill name & logo */}
                {
                  localStorage.getItem("theme") === "light" ?
                    <div className='flex flex-col'>
                      <TextInput
                        className='w-full my-[0.8rem]'
                        size="md"
                        label="Skill Name"
                        inputWrapperOrder={['label', 'error', 'input', 'description']}
                        required
                        {...form.getInputProps('skillName')}
                      />
                      <FileInput
                        className='w-[202.3px] my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
                        placeholder='Select Image'
                        size="md"
                        label="Skill Logo"
                        withAsterisk
                        accept="image/*"
                        required
                        {...form.getInputProps('logo')}
                      />
                      {/* current logo */}
                      <LazyLoadImage src={logo} alt={skillName} width={80} effect='blur' />
                    </div> :
                    <div className='flex flex-col'>
                      <TextInput
                        className='w-full my-[0.8rem]'
                        size="md"
                        label="Skill Name"
                        inputWrapperOrder={['label', 'error', 'input', 'description']}
                        styles={{
                          label: {
                            color: "white",
                          }
                        }}
                        required
                        {...form.getInputProps('skillName')}
                      />
                      <FileInput
                        className='w-[202.3px] my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
                        placeholder='Select Image'
                        size="md"
                        label="Skill Logo"
                        withAsterisk
                        accept="image/*"
                        styles={{
                          label: {
                            color: "white",
                          },
                          input: {
                            color: "black",
                          },
                          wrapper: {
                            backgroundColor: "white",
                          },
                        }}
                        required
                        {...form.getInputProps('logo')}
                      />
                      {/* current logo */}
                      <LazyLoadImage src={logo} alt={skillName} width={80} effect='blur' />
                    </div>
                }
                {/* submit button */}
                <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center my-[1rem]">
                  <Button onClick={handleInfoModal} size='md' className='bg-[#9A9A9A] hover:bg-[#666666] w-[150px] my-[0.5rem] mx-5'>Back</Button>
                  <Button type="submit" size='md' className='bg-[#4094F4] hover:bg-[#0d6cd9] w-[150px] my-[0.5rem] mx-5'>Update</Button>
                </div>
              </form>
              {/* delete button */}
              <button onClick={handleDeleteModal} className="ml-auto text-[#FF0000] hover:underline text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Delete Skill</button>
            </div> : <></>
        }
        {
          isDeleteModalOpen === true ?
            <div className="flex flex-col justify-center items-center">
              <MdOutlineCancel className="text-[#FF0000] text-[100px] mb-[0.5rem]" />
              <span className="mb-[1rem] text-justify text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A] dark:text-[#94A3B8]">Are you sure you want to delete {skillName} skill?</span>
              <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center">
                <Button onClick={handleEditModal} size='md' className='bg-[#9A9A9A] hover:bg-[#666666] w-[150px] my-[0.5rem] mx-5'>Back</Button>
                <Button onClick={handleNotification} size='md' className='bg-[#FF0000] hover:bg-[#cc0000] w-[150px] my-[0.5rem] mx-5'>Delete</Button>
              </div>
            </div> : <></>
        }
      </div>
    </Box>
  )
}