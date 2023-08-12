// others
import { useState } from 'react';
// mantine
import { useForm } from '@mantine/form';
import { TextInput, Button, FileInput, Notification } from '@mantine/core';
// firebase
import { firestore } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore'
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage"

export default function AddSkillModalComponent() {
  // notification variable
  const [showNotification, setShowNotification] = useState(false);
  // form hook
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
  // firebase storage
  const storage = getStorage()

  // add skill function
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
        {/* skill name & logo */}
        {
          localStorage.getItem("theme") === "light" ?
            <div className='flex flex-col'>
              <TextInput
                className='w-full my-[0.8rem]'
                size="md"
                label="Skill Name"
                inputWrapperOrder={['label', 'error', 'input', 'description']}
                required
                {...form.getInputProps('skillName')}
              />
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
            </div> :
            <div className='flex flex-col'>
              <TextInput
                className='w-full my-[0.8rem]'
                size="md"
                label="Skill Name"
                inputWrapperOrder={['label', 'error', 'input', 'description']}
                styles={{
                  label: {
                    color: "white",
                  }
                }}
                required
                {...form.getInputProps('skillName')}
              />
              <FileInput
                className='w-[202.3px] my-[0.8rem] mr-0 sm:mr-0 md:mr-0 lg:mr-3'
                placeholder='Select Image'
                size="md"
                label="Skill Logo"
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
          <Button type="submit" size='md' className='bg-[#4094F4] w-[300px] my-[0.8rem]'>Add Skill</Button>
        </div>
      </form>
      {/* notification */}
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
