// others
import { useContext } from 'react';
// global components
import { MapperContext } from '../../../globalVariable/MapperContextProvider';
// mantine
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { TextInput, Button, Checkbox, FileInput, LoadingOverlay, MultiSelect, Box } from '@mantine/core';
// firebase
import { firestore } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore'
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage"

export default function AddCompanyModalComponent() {
  // global variable
  const {
    techStackDataSet,
  } = useContext(MapperContext);
  // firebase storage
  const storage = getStorage()
  // loading overlay hook
  const [visible, { toggle }] = useDisclosure(false);
  // form hook
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

  // set end date to empty string if present is true
  if (form.values.present === true) {
    form.values.endDate = ""
  }

  // add work function
  const AddWork = (work: any) => {
    toggle();

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
            window.location.href = "/?w=1";
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
        <form onSubmit={form.onSubmit((values) => AddWork(values))}>
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
                  label="Present Work on This Job"
                  size='md'
                  className='w-full my-[0.8rem]'
                  {...form.getInputProps('present')}
                />
              </div> :
              <div>
                <Checkbox
                  label="Present Work on This Job"
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
          {/* company & team field */}
          {
            localStorage.getItem('theme') === "light" ?
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
                <TextInput
                  className='w-full my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
                  size="md"
                  label="Company Name"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  required
                  {...form.getInputProps('companyName')}
                />
                <TextInput
                  className='w-full my-[0.8rem] ml-0 sm:ml-0 md:ml-0 lg:ml-3'
                  size="md"
                  label="Team"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  required
                  {...form.getInputProps('team')}
                />
              </div> :
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
                <TextInput
                  className='w-full my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
                  size="md"
                  label="Company Name"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  styles={{
                    label: {
                      color: "white",
                    },
                  }}
                  required
                  {...form.getInputProps('companyName')}
                />
                <TextInput
                  className='w-full my-[0.8rem] ml-0 sm:ml-0 md:ml-0 lg:ml-3'
                  size="md"
                  label="Team"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  styles={{
                    label: {
                      color: "white",
                    },
                  }}
                  required
                  {...form.getInputProps('team')}
                />
              </div>
          }
          {/* position & job duties field */}
          {
            localStorage.getItem('theme') === "light" ?
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
                <TextInput
                  className='w-full my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
                  size="md"
                  label="Position"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  required
                  {...form.getInputProps('position')}
                />
                <TextInput
                  className='w-full my-[0.8rem] ml-0 sm:ml-0 md:ml-0 lg:ml-3'
                  size="md"
                  label="Job Duties"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  required
                  {...form.getInputProps('jobDuties')}
                />
              </div> :
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
                <TextInput
                  className='w-full my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
                  size="md"
                  label="Position"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  styles={{
                    label: {
                      color: "white",
                    },
                  }}
                  required
                  {...form.getInputProps('position')}
                />
                <TextInput
                  className='w-full my-[0.8rem] ml-0 sm:ml-0 md:ml-0 lg:ml-3'
                  size="md"
                  label="Job Duties"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  styles={{
                    label: {
                      color: "white",
                    },
                  }}
                  required
                  {...form.getInputProps('jobDuties')}
                />
              </div>
          }
          {/* projects & skill sets field */}
          {
            localStorage.getItem('theme') === "light" ?
              <div className='flex flex-col'>
                <TextInput
                  className='w-full my-[0.8rem]'
                  size="md"
                  label="Projects"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  required
                  {...form.getInputProps('projects')}
                />
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
              </div> :
              <div className='flex flex-col'>
                <TextInput
                  className='w-full my-[0.8rem]'
                  size="md"
                  label="Projects"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  styles={{
                    label: {
                      color: "white",
                    },
                  }}
                  required
                  {...form.getInputProps('projects')}
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
                  {...form.getInputProps('skillSets')}
                />
              </div>
          }
          {/* company logo input */}
          {
            localStorage.getItem('theme') === "light" ?
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
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
              </div> :
              <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row'>
                <FileInput
                  className='my-[0.8rem] w-[202.3px]'
                  placeholder='Select Image'
                  size="md"
                  label="Company Logo"
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
            <Button type="submit" size='md' className='bg-[#4094F4] w-[300px] my-[0.8rem]'>Add Work</Button>
          </div>
        </form>
      </div>
    </Box>
  )
}
