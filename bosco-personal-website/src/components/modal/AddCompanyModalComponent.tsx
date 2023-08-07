import { TextInput, Button, Checkbox, FileInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';

export default function AddCompanyModalComponent() {
  return (
    <div className='flex flex-col font-light'>
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
          required
        />
      </div>
      <div>
        {/* check box field */}
        <Checkbox
          label="Present Work on This Job"
          size='md'
          className='w-full my-[0.8rem]'
        />
      </div>
      <div className='flex'>
        {/* company field */}
        <TextInput
          className='w-full my-[0.8rem] mr-3'
          size="md"
          label="Company Name"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
          required
        />
        {/* team field */}
        <TextInput
          className='w-full my-[0.8rem] ml-3'
          size="md"
          label="Team"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
          required
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
        />
        {/* job duties field */}
        <TextInput
          className='w-full my-[0.8rem] ml-3'
          size="md"
          label="Job Duties"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
          required
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
        />
        {/* skill sets field */}
        <TextInput
          className='w-full my-[0.8rem] ml-3'
          size="md"
          label="Skill Sets"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
          required
        />
      </div>
      <div className='flex'>
        {/* company logo */}
        <FileInput
          className='my-[0.8rem]'
          placeholder='Select Image'
          size="md"
          label="Compahny Logo"
          withAsterisk
          accept="image/*"
          required
        />
      </div>
      <div className='flex justify-center'>
        {/* submit button */}
        <Button size='md' className='bg-[#4094F4] w-[300px] my-[0.8rem]'>Add Work</Button>
      </div>
    </div>
  )
}
