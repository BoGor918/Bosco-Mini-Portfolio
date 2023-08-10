import { TextInput, Button, FileInput, Notification } from '@mantine/core';
import { useForm } from '@mantine/form';
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage"
import { firestore } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react';

export default function AddSkillModalComponent() {
  const [showNotification, setShowNotification] = useState(false);

  const form = useForm({
    initialValues: {
      skillName: '',
      logo: '',
    },
    validate: {
      logo: (value: any) => {
        if (!value) {
          return 'Please Upload a Skill Logo';
        }
        return undefined;
      },
    },
  });

  // Firebase storage
  const storage = getStorage()

  const AddSkill = (skill: any) => {
    setShowNotification(true);

    const today = new Date()
    const timeCode = skill.skillName.replace(/\s+/g, '-') + "-" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds()

    const skillLogoRef = ref(storage, "SkillLogo/" + timeCode);

    uploadBytes(skillLogoRef, skill.logo).then(() => {
      getDownloadURL(skillLogoRef).then((url) => {
        setDoc(doc(firestore, "Skill", timeCode), {
          SkillName: skill.skillName,
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
      <form onSubmit={form.onSubmit((values) => AddSkill(values))}>
        <div className='flex flex-col'>
          {/* skill name field */}
          <TextInput
            className='w-full my-[0.8rem]'
            size="md"
            label="Skill Name"
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            required
            {...form.getInputProps('skillName')}
          />
          {/* skill logo */}
          <FileInput
            className='w-[202.3px] my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
            placeholder='Select Image'
            size="md"
            label="Skill Logo"
            withAsterisk
            accept="image/*"
            required
            {...form.getInputProps('logo')}
          />
        </div>
        <div className='flex justify-center'>
          {/* submit button */}
          <Button type="submit" size='md' className='bg-[#4094F4] w-[300px] my-[0.8rem]'>Add Skill</Button>
        </div>
      </form>
      {
        showNotification && (
          <Notification
            loading
            title="Adding New Skill"
            withCloseButton={false}
          >
            Please wait until data is uploaded, you cannot close this modal
          </Notification>
        )
      }

    </div>
  )
}
