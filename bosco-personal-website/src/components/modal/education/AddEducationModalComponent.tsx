// mantine
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { TextInput, Button, Checkbox, FileInput, LoadingOverlay, Select, NumberInput, Box } from '@mantine/core';
// firebase
import { firestore } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore'
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage"

export default function AddEducationModalComponent() {
  // loading overlay hook
  const [visible, { toggle }] = useDisclosure(false);
  // firebase storage
  const storage = getStorage()
  // form hook
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

  // set end date to empty string if present is true
  if (form.values.present === true) {
    form.values.endDate = ""
  }

  // add education function
  const AddEdu = (edu: any) => {
    toggle()

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
            window.location.href = "/?w=2";
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
        <form onSubmit={form.onSubmit((values) => AddEdu(values))}>
          {/* date field */}
          {
            localStorage.getItem('theme') === "light" ?
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
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
                  maxDate={new Date()}
                  clearable
                  required
                  {...form.getInputProps('startDate')}
                />
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
                  clearable
                  required
                  {...form.getInputProps('endDate')}
                />
              </div> :
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
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
                  styles={{
                    label: {
                      color: "white",
                    },
                  }}
                  maxDate={new Date()}
                  clearable
                  required
                  {...form.getInputProps('startDate')}
                />
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
                  clearable
                  styles={{
                    label: {
                      color: "white",
                    },
                  }}
                  required
                  {...form.getInputProps('endDate')}
                />
              </div>
          }
          {/* check box field */}
          {
            localStorage.getItem('theme') === "light" ?
              <div>
                <Checkbox
                  label="Present Study on This School"
                  size='md'
                  className='w-full my-[0.8rem]'
                  {...form.getInputProps('present')}
                />
              </div> :
              <div>
                <Checkbox
                  label="Present Study on This School"
                  size='md'
                  className='w-full my-[0.8rem]'
                  styles={{
                    label: {
                      color: "white",
                    },
                  }}
                  {...form.getInputProps('present')}
                />
              </div>
          }
          {/* school name & type field */}
          {
            localStorage.getItem('theme') === "light" ?
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
                <TextInput
                  className='w-full my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
                  size="md"
                  label="School Name"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  required
                  {...form.getInputProps('schoolName')}
                />
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
              </div> :
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
                <TextInput
                  className='w-full my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
                  size="md"
                  label="School Name"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  required
                  styles={{
                    label: {
                      color: "white",
                    },
                  }}
                  {...form.getInputProps('schoolName')}
                />
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
                  styles={{
                    label: {
                      color: "white",
                    },
                  }}
                  required
                  {...form.getInputProps('type')}
                />
              </div>
          }
          {/* title field */}
          {
            localStorage.getItem('theme') === "light" ?
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
                <TextInput
                  className='w-full my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
                  size="md"
                  label="Title"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  required
                  {...form.getInputProps('title')}
                />
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
              </div> :
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
                <TextInput
                  className='w-full my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
                  size="md"
                  label="Title"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  styles={{
                    label: {
                      color: "white",
                    },
                  }}
                  required
                  {...form.getInputProps('title')}
                />
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
                  styles={{
                    label: {
                      color: "white",
                    },
                  }}
                  required
                  {...form.getInputProps('gpa')}
                />
              </div>
          }
          {/* school logo input */}
          {
            localStorage.getItem('theme') === "light" ?
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
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
              </div> :
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
                <FileInput
                  className='my-[0.8rem] w-[202.3px]'
                  placeholder='Select Image'
                  size="md"
                  label="School Logo"
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
            <Button type="submit" size='md' className='bg-[#4094F4] w-[300px] my-[0.8rem]'>Add Education</Button>
          </div>
        </form>
      </div>
    </Box>
  )
}
