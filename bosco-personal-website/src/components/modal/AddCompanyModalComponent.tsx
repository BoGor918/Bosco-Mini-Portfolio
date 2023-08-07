import { TextInput, Button } from '@mantine/core';
// import { DateInput } from '@mantine/dates';

export default function AddCompanyModalComponent() {
  return (
    <div className='flex flex-col font-light'>
      <div className='flex'>
        {/* company field */}
        <TextInput
          className='w-full my-[0.2rem] mr-3'
          size="md"
          label="Company Name"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
        />
        {/* team field */}
        <TextInput
          className='w-full my-[0.2rem] ml-3'
          size="md"
          label="Team"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
        />
      </div>
      <div className='flex'>
        {/* position field */}
        <TextInput
          className='w-full my-[0.2rem] mr-3'
          size="md"
          label="Position"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
        />
        {/* job duties field */}
        <TextInput
          className='w-full my-[0.2rem] ml-3'
          size="md"
          label="Job Duties"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
        />
      </div>
      <div className='flex'>
        {/* projects field */}
        <TextInput
          className='w-full my-[0.2rem] mr-3'
          size="md"
          label="Projects"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
        />
        {/* skill sets field */}
        <TextInput
          className='w-full my-[0.2rem] ml-3'
          size="md"
          label="Skill Sets"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
        />
      </div>
      <div className='flex'>
        {/* start date field */}
        <TextInput
          className='w-full my-[0.2rem] mr-3'
          size="md"
          label="Years"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
        />
        {/* <DateInput
          dateParser={(input: any) => {
            if (input === 'WW2') {
              return new Date(1939, 8, 1);
            }
            return new Date(input);
          }}
          valueFormat="DD/MM/YYYY"
          label="Type WW2"
          placeholder="Type WW2"
          maw={400}
          mx="auto"
        /> */}
        {/* end date field */}
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
