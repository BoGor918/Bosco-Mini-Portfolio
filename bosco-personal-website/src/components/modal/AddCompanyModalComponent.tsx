import { TextInput, Button } from '@mantine/core';
export default function AddCompanyModalComponent() {
  return (
    <div className='flex flex-col font-light p-5'>
      <div className='flex'>
        <TextInput
          className='w-full my-[0.2rem] mr-3'
          size="md"
          label="Company Name"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
        />
        <TextInput
          className='w-full my-[0.2rem] ml-3'
          size="md"
          label="Team"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
        />
      </div>
      <div className='flex'>
        <TextInput
          className='w-full my-[0.2rem] mr-3'
          size="md"
          label="Position"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
        />
        <TextInput
          className='w-full my-[0.2rem] ml-3'
          size="md"
          label="Job Duties"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
        />
      </div>
      <div className='flex'>
        <TextInput
          className='w-full my-[0.2rem] mr-3'
          size="md"
          label="Projects"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
        />
        <TextInput
          className='w-full my-[0.2rem] ml-3'
          size="md"
          label="Skill Sets"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
        />
      </div>
      <div className='flex'>
        <TextInput
          className='w-full my-[0.2rem] mr-3'
          size="md"
          label="Years"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
        />
        <TextInput
          className='w-full my-[0.2rem] ml-3'
          size="md"
          label="Logo"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
        />
      </div>
    </div>
  )
}
