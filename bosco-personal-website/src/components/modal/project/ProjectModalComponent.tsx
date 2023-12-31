/* eslint-disable react-hooks/exhaustive-deps */
// others
import { useState, useEffect, useContext } from "react";
import { MapperContext } from "../../../globalVariable/MapperContextProvider";
// firebase
import { firestore } from '../../../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage"
// Mantine
import { useForm } from '@mantine/form';
import { useDisclosure } from "@mantine/hooks";
import { Button, LoadingOverlay, TextInput, MultiSelect, FileInput, Textarea, Box } from "@mantine/core";
// icons
import { MdOutlineCancel } from "react-icons/md";
// react lazy load image
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function ProjectModalComponent({
  docID,
  projectName,
  description,
  techStack,
  link,
  logo,
  createDate }: {
    docID: string,
    projectName: string,
    description: string,
    techStack: [],
    link: [],
    logo: string,
    createDate: Date,
  }) {
  // global variable
  const {
    authUser,
    deleteDocAndStorage,
    techStackDataSet
  } = useContext(MapperContext);
  // tech stack list
  const [techStackList, setTechStackList] = useState('')
  // collect tech stack data variable
  const [data, setData] = useState<{ value: string; label: string }[]>(link);
  // confirm model
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(true)
  // edit model
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  // delete model
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  // loading overlay hook
  const [visible, { toggle }] = useDisclosure(false);
  // form hook
  const form = useForm({
    initialValues: {
      projectName: projectName,
      description: description,
      techStack: techStack,
      link: link,
      logo: '',
    },
  });
  // firebase storage
  const storage = getStorage()

  // tech stack function
  useEffect(() => {
    var tempTechStackList = ''

    for (let i = 0; i < techStack.length; i++) {
      if (i === techStack.length - 1) {
        tempTechStackList += techStack[i]
      } else {
        tempTechStackList += techStack[i] + ' / '
      }
    }

    setTechStackList(tempTechStackList)
  }, [])

  // update skill function
  const UpdateProject = (project: any) => {
    if (project.logo === "") {
      // update project without logo
      toggle();

      updateDoc(doc(firestore, "Project", docID), {
        ProjectName: project.projectName,
        TechStack: project.techStack,
        Description: project.description,
        Link: project.link,
      }).then(() => {
        setTimeout(() => {
          window.location.href = "/?w=3";
        }, 1000);
      })
    } else if (project.logo !== "") {
      // update project with logo
      toggle();
      deleteDocAndStorage("ProjectLogo/", "Project/", docID)

      const modifyDocID = docID.match(/\d[\d-]*/);
      const timeCode = project.projectName.replace(/\s+/g, '-') + "-" + modifyDocID

      const projectLogoRef = ref(storage, "ProjectLogo/" + timeCode);

      uploadBytes(projectLogoRef, project.logo).then(() => {
        getDownloadURL(projectLogoRef).then((url) => {
          setDoc(doc(firestore, "Project", timeCode), {
            ProjectName: project.projectName,
            TechStack: project.techStack,
            Description: project.description,
            Link: project.link,
            Logo: url,
            CreateDate: createDate,
          }).then(() => {
            setTimeout(() => {
              window.location.href = "/?w=3";
            }, 1000);
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
    deleteDocAndStorage("ProjectLogo/", "Project/", docID)

    setTimeout(() => {
      window.location.href = "/?w=3";
    }, 1000);
  }

  // style variable
  const textStyle = 'text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A] dark:text-[#94A3B8]'

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
              {/* project logo */}
              <div className='flex justify-center items-center bg-[#9a9a9a17] p-[2rem] rounded-lg'>
                <LazyLoadImage src={logo} alt={projectName} effect='blur' />
              </div>
              {/* project name */}
              <span className='text-black dark:text-white text-[20px] sm:text-[20px] md:text-[20px] lg:text-[25px] font-medium mt-5 mb-1'>{projectName}</span>
              {/* description */}
              <span className={textStyle}><span className='font-medium'>Description: </span>{description}</span>
              {/* tech stack */}
              <span className={textStyle}><span className='font-medium'>Tech Stack(s): </span>{techStackList}</span>
              {/* link */}
              <span className={textStyle}><span className='font-medium'>Link(s):<br /></span>
                <span>
                  {
                    link.map((link: any, i: number) => {
                      return (
                        <span key={i}>
                          <a href={link} target='_blank' rel='noreferrer' className='text-[#9A9A9A] dark:text-[#94A3B8] hover:underline'>{link}<br /></a>
                        </span>
                      )
                    })
                  }
                </span>
              </span>
              {/* delete button */}
              {
                authUser !== null ?
                  <button onClick={handleEditModal} className="ml-auto mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[0rem] text-[#9A9A9A] dark:text-[#94A3B8] hover:underline text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Edit Project</button> :
                  <></>
              }
            </> : <></>
        }
        {
          isEditModalOpen === true ?
            <div className='flex flex-col font-light'>
              <form onSubmit={form.onSubmit((values) => UpdateProject(values))}>
                {/* project name & tech stack */}
                {
                  localStorage.getItem("theme") === "light" ?
                    <div className='flex flex-col'>
                      <TextInput
                        className='w-full my-[0.8rem]'
                        size="md"
                        label="Project Name"
                        inputWrapperOrder={['label', 'error', 'input', 'description']}
                        required
                        {...form.getInputProps('projectName')}
                      />
                      <MultiSelect
                        data={techStackDataSet}
                        className='w-full my-[0.8rem]'
                        size="md"
                        label="Tech Stack(s)"
                        searchable
                        nothingFound="No Result"
                        required
                        {...form.getInputProps('techStack')}
                      />
                    </div> :
                    <div className='flex flex-col'>
                      <TextInput
                        className='w-full my-[0.8rem]'
                        size="md"
                        label="Project Name"
                        inputWrapperOrder={['label', 'error', 'input', 'description']}
                        styles={{
                          label: {
                            color: "white",
                          },
                        }}
                        required
                        {...form.getInputProps('projectName')}
                      />
                      <MultiSelect
                        data={techStackDataSet}
                        className='w-full my-[0.8rem]'
                        size="md"
                        label="Tech Stack(s)"
                        searchable
                        nothingFound="No Result"
                        styles={{
                          label: {
                            color: "white",
                          },
                        }}
                        required
                        {...form.getInputProps('techStack')}
                      />
                    </div>
                }
                {/* description & link */}
                {
                  localStorage.getItem("theme") === "light" ?
                    <div className='flex flex-col'>
                      <Textarea
                        className='w-full my-[0.8rem]'
                        size="md"
                        label="Description"
                        inputWrapperOrder={['label', 'error', 'input', 'description']}
                        autosize
                        minRows={1}
                        maxRows={4}
                        required
                        {...form.getInputProps('description')}
                      />
                      <MultiSelect
                        data={data}
                        label="Link(s)"
                        size='md'
                        className='w-full my-[0.8rem]'
                        searchable
                        creatable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        onCreate={(query) => {
                          const item = { value: query, label: query };
                          setData((current) => [...current, item]);
                          return item;
                        }}
                        {...form.getInputProps('link')}
                        required
                      />
                    </div> :
                    <div className='flex flex-col'>
                      <Textarea
                        className='w-full my-[0.8rem]'
                        size="md"
                        label="Description"
                        inputWrapperOrder={['label', 'error', 'input', 'description']}
                        autosize
                        minRows={1}
                        maxRows={4}
                        styles={{
                          label: {
                            color: "white",
                          },
                        }}
                        required
                        {...form.getInputProps('description')}
                      />
                      <MultiSelect
                        data={data}
                        label="Link(s)"
                        size='md'
                        className='w-full my-[0.8rem]'
                        searchable
                        creatable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        onCreate={(query) => {
                          const item = { value: query, label: query };
                          setData((current) => [...current, item]);
                          return item;
                        }}
                        styles={{
                          label: {
                            color: "white",
                          },
                        }}
                        {...form.getInputProps('link')}
                        required
                      />
                    </div>
                }
                {/* project logo */}
                {
                  localStorage.getItem("theme") === "light" ?
                    <div className='flex flex-col'>
                      <FileInput
                        className='w-[202.3px] my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
                        placeholder='Select Image'
                        size="md"
                        label="Project Logo"
                        withAsterisk
                        accept="image/*"
                        required
                        {...form.getInputProps('logo')}
                      />
                      {/* current logo */}
                      <LazyLoadImage src={logo} alt={projectName} width={150} effect='blur' />
                    </div> :
                    <div className='flex flex-col'>
                      <FileInput
                        className='w-[202.3px] my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
                        placeholder='Select Image'
                        size="md"
                        label="Project Logo"
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
                      <LazyLoadImage src={logo} alt={projectName} width={150} effect='blur' />
                    </div>
                }
                {/* submit button */}
                <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center my-[1rem]">
                  <Button onClick={handleInfoModal} size='md' className='bg-[#9A9A9A] hover:bg-[#666666] w-[150px] my-[0.5rem] mx-5'>Back</Button>
                  <Button type="submit" size='md' className='bg-[#4094F4] hover:bg-[#0d6cd9] w-[150px] my-[0.5rem] mx-5'>Update</Button>
                </div>
              </form>
              {/* delete button */}
              <button onClick={handleDeleteModal} className="ml-auto text-[#FF0000] hover:underline text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Delete Project</button>
            </div> :
            <></>
        }
        {
          isDeleteModalOpen === true ?
            <div className="flex flex-col justify-center items-center">
              <MdOutlineCancel className="text-[#FF0000] text-[100px] mb-[0.5rem]" />
              <span className="mb-[1rem] text-justify text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A] dark:text-[#94A3B8]">Are you sure you want to delete {projectName} project?</span>
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
