/* eslint-disable react-hooks/exhaustive-deps */
// others
import { useState, useEffect, useContext } from "react";
// global variable
import { MapperContext } from "../../../globalVariable/MapperContextProvider";
// firebase
import { firestore } from '../../../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage"
// Mantine
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { Button, LoadingOverlay, TextInput, Checkbox, FileInput, MultiSelect } from "@mantine/core";
// icons
import { MdOutlineCancel } from "react-icons/md";

export default function CompanyModalComponent({
  docID,
  companyName,
  team,
  position,
  jobDuties,
  projects,
  skillSets,
  startDate,
  endDate,
  present,
  logo,
  createDate }: {
    docID: string;
    companyName: string;
    team: string;
    position: string;
    jobDuties: string;
    projects: string;
    skillSets: [];
    startDate: any;
    endDate: any;
    present: boolean;
    logo: string;
    createDate: Date;
  }) {
  // global variable
  const {
    authUser,
    deleteDocAndStorage,
    techStackDataSet
  } = useContext(MapperContext);
  // tech stack list
  const [techStackList, setTechStackList] = useState('')
  // date variable
  const [toStartDate, setToStartDate] = useState('')
  const [toEndDate, setToEndDate] = useState('')
  const [resultDate, setResultDate] = useState('')
  // confirm model
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(true)
  // edit model
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  // delete model
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  // loading overlay hook
  const [visible, { toggle }] = useDisclosure(false);
  // form hook
  const form = useForm({
    initialValues: {
      startDate: startDate.toDate(),
      endDate: endDate === '' ? '' : endDate.toDate(),
      companyName: companyName,
      team: team,
      position: position,
      jobDuties: jobDuties,
      projects: projects,
      skillSets: skillSets,
      logo: '',
      present: present,
    },
  });
  // firebase storage
  const storage = getStorage()

  // set end date to empty string if present is true
  if (form.values.present === true) {
    form.values.endDate = ""
  }

  // date function
  useEffect(() => {
    if (present === true) {
      setToStartDate(new Date(startDate.seconds * 1000).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }))
      setToEndDate("Present")
      // New date instances
      const dt_date1 = new Date(startDate.toDate());
      const dt_date2 = new Date();

      // Get the Timestamp
      const date1_time_stamp = dt_date1.getTime();
      const date2_time_stamp = dt_date2.getTime();

      let calc: Date;

      // Check which timestamp is greater
      if (date1_time_stamp > date2_time_stamp) {
        calc = new Date(date1_time_stamp - date2_time_stamp);
      } else {
        calc = new Date(date2_time_stamp - date1_time_stamp);
      }

      // Retrieve the date, month, and year
      const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
      // Convert to an array and store
      const calcFormat = calcFormatTmp.split("-");
      // Subtract each member of our array from the default date
      const days_passed = Math.abs(Number(calcFormat[0]) - 1);
      const months_passed = Math.abs(Number(calcFormat[1]) - 1);
      const years_passed = Math.abs(Number(calcFormat[2]) - 1970);

      // Set up custom text
      const yrsTxt = ["Year", "Years"];
      const mnthsTxt = ["Month", "Months"];
      const daysTxt = ["Day", "Days"];

      // Display the result with custom text
      const result = ((years_passed === 1) ? years_passed + ' ' + yrsTxt[0] + ' ' : (years_passed > 1) ?
        years_passed + ' ' + yrsTxt[1] + ' ' : '') +
        ((months_passed === 1) ? months_passed + ' ' + mnthsTxt[0] + ' ' : (months_passed > 1) ?
          months_passed + ' ' + mnthsTxt[1] + ' ' : '') +
        ((days_passed === 1) ? days_passed + ' ' + daysTxt[0] : (days_passed > 1) ?
          days_passed + ' ' + daysTxt[1] : '');

      setResultDate(result.trim())
    } else {
      setToStartDate(new Date(startDate.seconds * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }));
      setToEndDate(new Date(endDate.seconds * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }));

      // New date instances
      const dt_date1 = new Date(startDate.toDate());
      const dt_date2 = new Date(endDate.toDate());

      // Get the Timestamp
      const date1_time_stamp = dt_date1.getTime();
      const date2_time_stamp = dt_date2.getTime();

      let calc: Date;

      // Check which timestamp is greater
      if (date1_time_stamp > date2_time_stamp) {
        calc = new Date(date1_time_stamp - date2_time_stamp);
      } else {
        calc = new Date(date2_time_stamp - date1_time_stamp);
      }

      // Retrieve the date, month, and year
      const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
      // Convert to an array and store
      const calcFormat = calcFormatTmp.split("-");
      // Subtract each member of our array from the default date
      const days_passed = Math.abs(Number(calcFormat[0]) - 2);
      const months_passed = Math.abs(Number(calcFormat[1]) - 1);
      const years_passed = Math.abs(Number(calcFormat[2]) - 1970);

      // Set up custom text
      const yrsTxt = ["Year", "Years"];
      const mnthsTxt = ["Month", "Months"];
      const daysTxt = ["Day", "Days"];

      // Display the result with custom text
      const result = ((years_passed === 1) ? years_passed + ' ' + yrsTxt[0] + ' ' : (years_passed > 1) ?
        years_passed + ' ' + yrsTxt[1] + ' ' : '') +
        ((months_passed === 1) ? months_passed + ' ' + mnthsTxt[0] + ' ' : (months_passed > 1) ?
          months_passed + ' ' + mnthsTxt[1] + ' ' : '') +
        ((days_passed === 1) ? days_passed + ' ' + daysTxt[0] : (days_passed > 1) ?
          days_passed + ' ' + daysTxt[1] : '');

      setResultDate(result.trim())
    }
  }, [])

  // tech stack list function
  useEffect(() => {
    var tempTechStackList = ''

    for (let i = 0; i < skillSets.length; i++) {
      if (i === skillSets.length - 1) {
        tempTechStackList += skillSets[i]
      } else {
        tempTechStackList += skillSets[i] + ' / '
      }
    }

    setTechStackList(tempTechStackList)
  }, [])

  const UpdateWork = (work: any) => {
    if (work.logo === "") {
      // update school without logo
      toggle();

      updateDoc(doc(firestore, "Company", docID), {
        CompanyName: work.companyName,
        Team: work.team,
        Position: work.position,
        JobDuties: work.jobDuties,
        Projects: work.projects,
        SkillSets: work.skillSets,
        StartDate: work.startDate,
        EndDate: work.endDate,
        Present: work.present,
        CreateDate: createDate,
      }).then(() => {
        setTimeout(() => {
          window.location.href = "/?w=1";
        }, 1000);
      })
    } else if (work.logo !== "") {
      // update work with logo
      toggle();
      deleteDocAndStorage("CompanyLogo/", "Company/", docID)

      const originalDocID = docID.split('-');
      const modifyDocID = originalDocID.slice(2).join('-');
      const timeCode = work.companyName.replace(/\s+/g, '-') + "-" + modifyDocID

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
            CreateDate: createDate,
          }).then(() => {
            setTimeout(() => {
              window.location.href = "/?w=1";
            }, 1000);
          })
        })
      })
    }
  }

  // handel confirm modal
  const handleInfoModal = () => {
    setIsInfoModalOpen(true)
    setIsEditModalOpen(false)
    setIsDeleteModalOpen(false)
  }

  // handle edit modal
  const handleEditModal = () => {
    setIsInfoModalOpen(false)
    setIsEditModalOpen(true)
    setIsDeleteModalOpen(false)
  }

  // handle delete modal
  const handleDeleteModal = () => {
    setIsInfoModalOpen(false)
    setIsEditModalOpen(false)
    setIsDeleteModalOpen(true)
  }

  // notification
  const handleNotification = () => {
    toggle()
    deleteDocAndStorage("CompanyLogo/", "Company/", docID)

    setTimeout(() => {
      window.location.href = "/?w=1";
    }, 1000);
  }

  // text style
  const textStyle = 'text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A] dark:text-[#94A3B8]'

  return (
    <div className='flex flex-col font-light p-3'>
      {/* loading overlay */}
      {
        localStorage.getItem("theme") === "light" ?
          <LoadingOverlay visible={visible} overlayBlur={2} /> :
          <LoadingOverlay visible={visible} overlayBlur={2} overlayColor="#0B1A33" />
      }
      {
        isInfoModalOpen === true ?
          <>
            {/* company logo */}
            <div className='flex justify-center items-center bg-[#9a9a9a17] p-[2rem] rounded-lg'>
              <img src={logo} alt={companyName} />
            </div>
            {/* company name */}
            <span className='text-black dark:text-white text-[20px] sm:text-[20px] md:text-[20px] lg:text-[25px] font-medium mt-5 mb-1'>{companyName}</span>
            {/* team */}
            <span className={textStyle}><span className='font-medium'>Team: </span>{team}</span>
            {/* position */}
            <span className={textStyle}><span className='font-medium'>Position: </span>{position}</span>
            {/* job duties */}
            <span className={textStyle}><span className='font-medium'>Job Duties: </span>{jobDuties}</span>
            {/* projects */}
            <span className={textStyle}><span className='font-medium'>Projects: </span>{projects}</span>
            {/* skill sets */}
            <span className={textStyle}><span className='font-medium'>Tech Stacks: </span>{techStackList}</span>
            {/* period */}
            <span className={textStyle}>
              <span className='font-medium'>Period: </span>
              <span>{resultDate}, </span>
              <span>{toStartDate} - {toEndDate}</span>
            </span>
            {/* delete button */}
            {
              authUser !== null ?
                <button onClick={handleEditModal} className="ml-auto mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[0rem] text-[#9A9A9A] dark:text-[#94A3B8] hover:underline text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Edit Work</button> :
                <></>
            }
          </> : <></>
      }
      {
        isEditModalOpen === true ?
          <div className='flex flex-col font-light'>
            {/* loading overlay */}
            {
              localStorage.getItem("theme") === "light" ?
                <LoadingOverlay visible={visible} overlayBlur={2} /> :
                <LoadingOverlay visible={visible} overlayBlur={2} overlayColor="#0B1A33" />
            }
            <form onSubmit={form.onSubmit((values) => UpdateWork(values))}>
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
                      checked={form.values.present}
                      {...form.getInputProps('present')}
                    />
                  </div> :
                  <div>
                    <Checkbox
                      label="Present Work on This Job"
                      size='md'
                      className='w-full my-[0.8rem]'
                      checked={form.values.present}
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
                  <div className='flex flex-col'>
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
                    {/* current logo */}
                    <img src={logo} alt={companyName} width={150} />
                  </div> :
                  <div className='flex flex-col'>
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
                    {/* current logo */}
                    <img src={logo} alt={companyName} width={150} />
                  </div>
              }
              {/* submit button */}
              <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center my-[1rem]">
                <Button onClick={handleInfoModal} size='md' className='bg-[#9A9A9A] hover:bg-[#666666] w-[150px] my-[0.5rem] mx-5'>Back</Button>
                <Button type="submit" size='md' className='bg-[#4094F4] hover:bg-[#0d6cd9] w-[150px] my-[0.5rem] mx-5'>Update</Button>
              </div>
            </form>
            {/* delete button */}
            <button onClick={handleDeleteModal} className="ml-auto text-[#FF0000] hover:underline text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Delete Work</button>
          </div> : <></>
      }
      {
        isDeleteModalOpen === true ?
          <div className="flex flex-col justify-center items-center">
            <MdOutlineCancel className="text-[#FF0000] text-[100px] mb-[0.5rem]" />
            <span className="mb-[1rem] text-justify text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A] dark:text-[#94A3B8]">Are you sure you want to delete {companyName} work?</span>
            <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center">
              <Button onClick={handleEditModal} size='md' className='bg-[#9A9A9A] hover:bg-[#666666] w-[150px] my-[0.5rem] mx-5'>Back</Button>
              <Button onClick={handleNotification} size='md' className='bg-[#FF0000] hover:bg-[#cc0000] w-[150px] my-[0.5rem] mx-5'>Delete</Button>
            </div>
          </div> : <></>
      }
    </div>
  )
}
