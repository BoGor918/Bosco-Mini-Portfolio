/* eslint-disable react-hooks/exhaustive-deps */
// others
import { useState, useEffect, useContext } from "react";
import { MapperContext } from "../../../globalVariable/MapperContextProvider";
// firebase
import { firestore } from '../../../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage"
// Mantine
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { Button, LoadingOverlay, TextInput, Checkbox, FileInput, Select, NumberInput, Box } from "@mantine/core";
// icons
import { MdOutlineCancel } from "react-icons/md";
// react lazy load image
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function EducationModalComponent({
  docID,
  schoolName,
  type,
  title,
  gpa,
  startDate,
  endDate,
  present,
  logo,
  createDate }: {
    docID: string;
    schoolName: string;
    type: string;
    title: string;
    gpa: string;
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
  } = useContext(MapperContext);
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
      schoolName: schoolName,
      type: type,
      title: title,
      gpa: gpa,
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
      setToStartDate(new Date(startDate.seconds * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }))
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

  // update skill function
  const UpdateEdu = (edu: any) => {
    if (edu.logo === "") {
      // update school without logo
      toggle();

      updateDoc(doc(firestore, "School", docID), {
        SchoolName: edu.schoolName,
        Type: edu.type,
        Title: edu.title,
        GPA: edu.gpa,
        StartDate: edu.startDate,
        EndDate: edu.endDate,
        Present: edu.present,
        CreateDate: createDate,
      }).then(() => {
        setTimeout(() => {
          window.location.href = "/?w=2";
        }, 1000);
      })
    } else if (edu.logo !== "") {
      // update project with logo
      toggle()
      deleteDocAndStorage("SchoolLogo/", "School/", docID)

      const modifyDocID = docID.match(/\d[\d-]*/);
      const timeCode = edu.schoolName.replace(/\s+/g, '-') + "-" + modifyDocID

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
            CreateDate: createDate,
          }).then(() => {
            setTimeout(() => {
              window.location.href = "/?w=2";
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
    deleteDocAndStorage("SchoolLogo/", "School/", docID)

    setTimeout(() => {
      window.location.href = "/?w=2";
    }, 1000);
  }

  // style variable
  const textStyle = 'text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A] dark:text-[#94A3B8]'

  return (
    <Box pos="relative">
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
              {/* school logo */}
              <div className='flex justify-center items-center bg-[#9a9a9a17] p-[2rem] rounded-lg'>
                <LazyLoadImage src={logo} alt={schoolName} effect='blur' />
              </div>
              {/* school name */}
              <span className='text-black dark:text-white text-[20px] sm:text-[20px] md:text-[20px] lg:text-[25px] font-medium mt-5 mb-1'>{schoolName}</span>
              {/* type */}
              <span className={textStyle}><span className='font-medium'>Type: </span>{type}</span>
              {/* title */}
              <span className={textStyle}><span className='font-medium'>Title: </span>{title}</span>
              {/* gpa */}
              <span className={textStyle}><span className='font-medium'>CGPA / WGPA / Best Five: </span>{gpa}</span>
              {/* period */}
              <span className={textStyle}>
                <span className='font-medium'>Period: </span>
                <span>{resultDate}, </span>
                <span>{toStartDate} - {toEndDate}</span>
              </span>
              {/* delete button */}
              {
                authUser !== null ?
                  <button onClick={handleEditModal} className="ml-auto mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[0rem] text-[#9A9A9A] dark:text-[#94A3B8] hover:underline text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Edit Education</button> :
                  <></>
              }
            </> : <></>
        }
        {
          isEditModalOpen === true ?
            <div className='flex flex-col font-light'>
              <form onSubmit={form.onSubmit((values) => UpdateEdu(values))}>
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
                        maxDate={new Date()}
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
                        maxDate={new Date()}
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
                        checked={form.values.present}
                        {...form.getInputProps('present')}
                      />
                    </div> :
                    <div>
                      <Checkbox
                        label="Present Study on This School"
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
                    <div className='flex flex-col'>
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
                      {/* current logo */}
                      <LazyLoadImage src={logo} alt={schoolName} width={150} effect='blur' />
                    </div> :
                    <div className='flex flex-col'>
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
                      {/* current logo */}
                      <LazyLoadImage src={logo} alt={schoolName} width={150} effect='blur' />
                    </div>
                }
                {/* submit button */}
                <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center my-[1rem]">
                  <Button onClick={handleInfoModal} size='md' className='bg-[#9A9A9A] hover:bg-[#666666] w-[150px] my-[0.5rem] mx-5'>Back</Button>
                  <Button type="submit" size='md' className='bg-[#4094F4] hover:bg-[#0d6cd9] w-[150px] my-[0.5rem] mx-5'>Update</Button>
                </div>
              </form>
              {/* delete button */}
              <button onClick={handleDeleteModal} className="ml-auto text-[#FF0000] hover:underline text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Delete Education</button>
            </div> :
            <></>
        }
        {
          isDeleteModalOpen === true ?
            <div className="flex flex-col justify-center items-center">
              <MdOutlineCancel className="text-[#FF0000] text-[100px] mb-[0.5rem]" />
              <span className="mb-[1rem] text-justify text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A] dark:text-[#94A3B8]">Are you sure you want to delete {schoolName} education?</span>
              <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center">
                <Button onClick={handleEditModal} size='md' className='bg-[#9A9A9A] hover:bg-[#666666] w-[150px] my-[0.5rem] mx-5'>Back</Button>
                <Button onClick={handleNotification} size='md' className='bg-[#FF0000] hover:bg-[#cc0000] w-[150px] my-[0.5rem] mx-5'>Delete</Button>
              </div>
            </div> : <></>
        }
      </div>
    </Box>
  )
}
