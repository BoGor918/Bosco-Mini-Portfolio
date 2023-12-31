// others
import { useState, useContext } from 'react';
// mantine
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { TextInput, Button, FileInput, Textarea, MultiSelect, LoadingOverlay, Box } from '@mantine/core';
// firebase
import { firestore } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore'
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage"
// global components
import { MapperContext } from '../../../globalVariable/MapperContextProvider';

export default function AddProjectModalComponent() {
  // global variable
  const {
    techStackDataSet,
  } = useContext(MapperContext);
  // collect tech stack data variable
  const [data, setData] = useState<{ value: string; label: string }[]>([]);
  // loading overlay hook
  const [visible, { toggle }] = useDisclosure(false);
  // form hook
  const form = useForm({
    initialValues: {
      projectName: '',
      description: '',
      techStack: '',
      link: '',
      logo: '',
    },
    validate: {
      logo: (value: any) => {
        if (!value) {
          return 'Please Upload a Project Logo';
        }
        return undefined;
      },
    },
  });
  // firebase storage
  const storage = getStorage()

  // add project function
  const AddProject = (project: any) => {
    toggle();

    const today = new Date()
    const timeCode = project.projectName.replace(/\s+/g, '-') + "-" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds()

    const projectLogoRef = ref(storage, "ProjectLogo/" + timeCode);

    uploadBytes(projectLogoRef, project.logo).then(() => {
      getDownloadURL(projectLogoRef).then((url) => {
        setDoc(doc(firestore, "Project", timeCode), {
          ProjectName: project.projectName,
          TechStack: project.techStack,
          Description: project.description,
          Link: project.link,
          Logo: url,
          CreateDate: new Date(),
        }).then(() => {
          setTimeout(() => {
            window.location.href = "/?w=3";
          }, 1000);
        })
      })
    })
  }

  return (
    <Box pos="relative">
      <div className='flex flex-col font-light'>
        {/* loading overlay */}
        {
          localStorage.getItem("theme") === "light" ?
            <LoadingOverlay visible={visible} overlayBlur={2} /> :
            <LoadingOverlay visible={visible} overlayBlur={2} overlayColor="#0B1A33" />
        }
        <form onSubmit={form.onSubmit((values) => AddProject(values))}>
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
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
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
              </div> :
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
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
              </div>
          }
          {/* submit button */}
          <div className='flex justify-center'>
            <Button type="submit" size='md' className='bg-[#4094F4] w-[300px] my-[0.8rem]'>Add Project</Button>
          </div>
        </form>
      </div>
    </Box>
  )
}
