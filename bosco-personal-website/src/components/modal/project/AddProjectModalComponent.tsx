import { TextInput, Button, FileInput, Notification, Textarea, MultiSelect } from '@mantine/core';
import { useForm } from '@mantine/form';
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage"
import { firestore } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore'
import { useState, useContext } from 'react';
import { MapperContext } from '../../../globalVariable/MapperContextProvider';

export default function AddProjectModalComponent() {
  const {
    techStackDataSet,
  } = useContext(MapperContext);

  const [data, setData] = useState<{ value: string; label: string }[]>([]);
  const [showNotification, setShowNotification] = useState(false);

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

  // Firebase storage
  const storage = getStorage()

  const AddProject = (project: any) => {
    setShowNotification(true);

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
            setShowNotification(false)
            window.location.reload()
          }, 1000)
        })
      })
    })
  }

  return (
    <div className='flex flex-col font-light'>
      <form onSubmit={form.onSubmit((values) => AddProject(values))}>
        <div className='flex flex-col'>
          {/* company name field */}
          <TextInput
            className='w-full my-[0.8rem]'
            size="md"
            label="Project Name"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            required
            {...form.getInputProps('projectName')}
          />
          {/* type field */}
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
        </div>
        <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
          {/* position field */}
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
        </div>
        <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
          {/* link */}
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
        </div>
        <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
          {/* company logo */}
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
        </div>
        <div className='flex justify-center'>
          {/* submit button */}
          <Button type="submit" size='md' className='bg-[#4094F4] w-[300px] my-[0.8rem]'>Add Project</Button>
        </div>
      </form>
      {
        showNotification && (
          <Notification
            loading
            title="Adding New Project"
            withCloseButton={false}
          >
            Please wait until data is uploaded, you cannot close this modal
          </Notification>
        )
      }
    </div>
  )
}
