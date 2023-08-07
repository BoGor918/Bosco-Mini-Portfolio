import { TextInput, Button, Checkbox, FileInput, Notification } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage"
import { firestore } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react';

export default function AddCompanyModalComponent() {
  const [showNotification, setShowNotification] = useState(false);

  const form = useForm({
    initialValues: {
      startDate: '',
      endDate: '',
      companyName: '',
      team: '',
      position: '',
      jobDuties: '',
      projects: '',
      skillSets: '',
      logo: '',
      present: false,
    },
    validate: {
      logo: (value: any) => {
        if (!value) {
          return 'Please Upload a Company Logo';
        }
        return undefined;
      },
    },
  });

  if (form.values.present === true) {
    form.values.endDate = ""
  }

  // Firebase storage
  const storage = getStorage()

  const AddWork = (work: any) => {
    setShowNotification(true);

    const companyLogoRef = ref(storage, "CompanyLogo/" + work.companyName);

    uploadBytes(companyLogoRef, work.logo).then(() => {
      getDownloadURL(companyLogoRef).then((url) => {
        setDoc(doc(firestore, "Company", work.companyName), {
          CompanyName: work.companyName,
          Team: work.team,
          Position: work.position,
          JobDuties: work.jobDuties,
          Projects: work.projects,
          SkillSets: work.skillSets,
          Logo: url,
          StartDate: work.startDate,
          EndDate: work.endDate,
          Present: work.present,
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
      <form onSubmit={form.onSubmit((values) => AddWork(values))}>
        <div className='flex'>
          {/* start date field */}
          <DateInput
            dateParser={(input: any) => {
              if (input === 'WW2') {
                return new Date(2001, 9, 18);
              }
              return new Date(input);
            }}
            valueFormat="DD/MM/YYYY"
            label="Start Date"
            size='md'
            className='w-full my-[0.8rem] mr-3'
            required
            {...form.getInputProps('startDate')}
          />
          {/* end date field */}
          <DateInput
            dateParser={(input: any) => {
              if (input === 'WW2') {
                return new Date(2001, 9, 18);
              }
              return new Date(input);
            }}
            valueFormat="DD/MM/YYYY"
            label="End Date"
            size='md'
            className='w-full my-[0.8rem] ml-3'
            disabled={form.values.present}
            required
            {...form.getInputProps('endDate')}
          />
        </div>
        <div>
          {/* check box field */}
          <Checkbox
            label="Present Work on This Job"
            size='md'
            className='w-full my-[0.8rem]'
            {...form.getInputProps('present')}
          />
        </div>
        <div className='flex'>
          {/* company name field */}
          <TextInput
            className='w-full my-[0.8rem] mr-3'
            size="md"
            label="Company Name"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            required
            {...form.getInputProps('companyName')}
          />
          {/* team field */}
          <TextInput
            className='w-full my-[0.8rem] ml-3'
            size="md"
            label="Team"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            required
            {...form.getInputProps('team')}
          />
        </div>
        <div className='flex'>
          {/* position field */}
          <TextInput
            className='w-full my-[0.8rem] mr-3'
            size="md"
            label="Position"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            required
            {...form.getInputProps('position')}
          />
          {/* job duties field */}
          <TextInput
            className='w-full my-[0.8rem] ml-3'
            size="md"
            label="Job Duties"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            required
            {...form.getInputProps('jobDuties')}
          />
        </div>
        <div className='flex'>
          {/* projects field */}
          <TextInput
            className='w-full my-[0.8rem] mr-3'
            size="md"
            label="Projects"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            required
            {...form.getInputProps('projects')}
          />
          {/* skill sets field */}
          <TextInput
            className='w-full my-[0.8rem] ml-3'
            size="md"
            label="Skill Sets"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            required
            {...form.getInputProps('skillSets')}
          />
        </div>
        <div className='flex'>
          {/* company logo */}
          <FileInput
            className='my-[0.8rem] w-[202.3px]'
            placeholder='Select Image'
            size="md"
            label="Company Logo"
            withAsterisk
            accept="image/*"
            required
            {...form.getInputProps('logo')}
          />
        </div>
        <div className='flex justify-center'>
          {/* submit button */}
          <Button type="submit" size='md' className='bg-[#4094F4] w-[300px] my-[0.8rem]'>Add Work</Button>
        </div>
      </form>
      {
        showNotification && (
          <Notification
            loading
            title="Adding New Work"
            withCloseButton={false}
          >
            Please wait until data is uploaded, you cannot close this modal
          </Notification>
        )
      }

    </div>
  )
}
