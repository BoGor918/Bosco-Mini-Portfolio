import { TextInput, Button, Checkbox, FileInput, Notification, MultiSelect } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage"
import { firestore } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore'
import { useState, useContext } from 'react';
import { MapperContext } from '../../../globalVariable/MapperContextProvider';

export default function AddCompanyModalComponent() {
  const {
    techStackDataSet,
  } = useContext(MapperContext);

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

    const today = new Date()
    const timeCode = work.companyName.replace(/\s+/g, '-') + "-" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds()

    const companyLogoRef = ref(storage, "CompanyLogo/" + timeCode);

    uploadBytes(companyLogoRef, work.logo).then(() => {
      getDownloadURL(companyLogoRef).then((url) => {
        setDoc(doc(firestore, "Company", timeCode), {
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
        <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
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
            className='w-full my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
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
            className='w-full my-[0.8rem] ml-0 sm:ml-0 md:ml-0 lg:ml-3'
            disabled={form.values.present}
            minDate={new Date(form.values.startDate)}
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
        <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
          {/* company name field */}
          <TextInput
            className='w-full my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
            size="md"
            label="Company Name"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            required
            {...form.getInputProps('companyName')}
          />
          {/* team field */}
          <TextInput
            className='w-full my-[0.8rem] ml-0 sm:ml-0 md:ml-0 lg:ml-3'
            size="md"
            label="Team"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            required
            {...form.getInputProps('team')}
          />
        </div>
        <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
          {/* position field */}
          <TextInput
            className='w-full my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
            size="md"
            label="Position"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            required
            {...form.getInputProps('position')}
          />
          {/* job duties field */}
          <TextInput
            className='w-full my-[0.8rem] ml-0 sm:ml-0 md:ml-0 lg:ml-3'
            size="md"
            label="Job Duties"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            required
            {...form.getInputProps('jobDuties')}
          />
        </div>
        <div className='flex flex-col'>
          {/* projects field */}
          <TextInput
            className='w-full my-[0.8rem]'
            size="md"
            label="Projects"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            required
            {...form.getInputProps('projects')}
          />
          {/* skill sets field */}
          <MultiSelect
            data={techStackDataSet}
            className='w-full my-[0.8rem]'
            size="md"
            label="Tech Stack(s)"
            searchable
            nothingFound="No Result"
            required
            {...form.getInputProps('skillSets')}
          />
        </div>
        <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
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
