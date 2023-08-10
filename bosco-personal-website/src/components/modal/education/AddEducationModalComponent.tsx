import { TextInput, Button, Checkbox, FileInput, Notification, Select, NumberInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage"
import { firestore } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react';

export default function AddEducationModalComponent() {
  const [showNotification, setShowNotification] = useState(false);

  const form = useForm({
    initialValues: {
      startDate: '',
      endDate: '',
      schoolName: '',
      type: '',
      title: '',
      gpa: '',
      logo: '',
      present: false,
    },
    validate: {
      logo: (value: any) => {
        if (!value) {
          return 'Please Upload a School Logo';
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

  const AddEdu = (edu: any) => {
    setShowNotification(true);

    const today = new Date()
    const timeCode = edu.schoolName.replace(/\s+/g, '-') + "-" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds()

    const schoolLogoRef = ref(storage, "SchoolLogo/" + timeCode);

    uploadBytes(schoolLogoRef, edu.logo).then(() => {
      getDownloadURL(schoolLogoRef).then((url) => {
        setDoc(doc(firestore, "School", timeCode), {
          SchoolName: edu.schoolName,
          Type: edu.type,
          Title: edu.title,
          GPA: edu.gpa,
          Logo: url,
          StartDate: edu.startDate,
          EndDate: edu.endDate,
          Present: edu.present,
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
      <form onSubmit={form.onSubmit((values) => AddEdu(values))}>
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
            label="Present Study on This School"
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
            label="School Name"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            required
            {...form.getInputProps('schoolName')}
          />
          {/* type field */}
          <Select
            className='w-full my-[0.8rem] ml-0 sm:ml-0 md:ml-0 lg:ml-3'
            size="md"
            label="Type"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            data={[
              { value: 'Doctor Degree', label: 'Doctor Degree' },
              { value: 'Master Degree', label: 'Master Degree' },
              { value: 'Bachelor Degree', label: 'Bachelor Degree' },
              { value: 'Associate Degree', label: 'Associate Degree' },
              { value: 'Secondary', label: 'Secondary' },
            ]}
            required
            {...form.getInputProps('type')}
          />
        </div>
        <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
          {/* position field */}
          <TextInput
            className='w-full my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
            size="md"
            label="Title"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            required
            {...form.getInputProps('title')}
          />
          {/* job duties field */}
          <NumberInput
            className='w-full my-[0.8rem] ml-0 sm:ml-0 md:ml-0 lg:ml-3'
            size="md"
            label="CGPA / WGPA"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            defaultValue={0.00}
            precision={2}
            min={0.00}
            step={0.01}
            max={30.00}
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            required
            {...form.getInputProps('gpa')}
          />
        </div>
        <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
          {/* company logo */}
          <FileInput
            className='my-[0.8rem] w-[202.3px]'
            placeholder='Select Image'
            size="md"
            label="School Logo"
            withAsterisk
            accept="image/*"
            required
            {...form.getInputProps('logo')}
          />
        </div>
        <div className='flex justify-center'>
          {/* submit button */}
          <Button type="submit" size='md' className='bg-[#4094F4] w-[300px] my-[0.8rem]'>Add Education</Button>
        </div>
      </form>
      {
        showNotification && (
          <Notification
            loading
            title="Adding New Education"
            withCloseButton={false}
          >
            Please wait until data is uploaded, you cannot close this modal
          </Notification>
        )
      }

    </div>
  )
}
