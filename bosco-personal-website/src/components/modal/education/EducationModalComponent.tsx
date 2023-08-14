/* eslint-disable react-hooks/exhaustive-deps */
// others
import { useState, useEffect, useContext } from "react";
import { MapperContext } from "../../../globalVariable/MapperContextProvider";
// Mantine
import { Button, Notification } from "@mantine/core";
// icons
import { MdOutlineCancel } from "react-icons/md";


export default function EducationModalComponent({
  docID,
  schoolName,
  type,
  title,
  gpa,
  startDate,
  endDate,
  present,
  logo }: {
    docID: string;
    schoolName: string;
    type: string;
    title: string;
    gpa: string;
    startDate: any;
    endDate: any;
    present: boolean;
    logo: string;
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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  // notification hook
  const [showNotification, setShowNotification] = useState(false);

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

  // handel confirm modal
  const handleConfirmModal = () => {
    setIsConfirmModalOpen(!isConfirmModalOpen)
  }

  // notification
  const handleNotification = () => {
    setShowNotification(true);
    deleteDocAndStorage("SchoolLogo/", "School/", docID)

    setTimeout(() => {
      setShowNotification(false);
      window.location.reload();
    }, 1000);
  }

  // style variable
  const textStyle = 'text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A] dark:text-[#94A3B8]'

  return (
    <div className='flex flex-col font-light p-3'>
      {
        isConfirmModalOpen === false ?
          <>
            {/* school logo */}
            <div className='flex justify-center items-center bg-[#9a9a9a17] p-[2rem] rounded-lg'>
              <img src={logo} alt={schoolName} />
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
                <button onClick={handleConfirmModal} className="ml-auto mt-[1rem] sm:mt-[1rem] md:mt-[1rem] lg:mt-[0rem] text-[#FF0000] hover:underline text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px]">Delete Education</button> :
                <></>
            }
          </> :
          <div className="flex flex-col justify-center items-center">
            <MdOutlineCancel className="text-[#FF0000] text-[100px] mb-[0.5rem]" />
            <span className="mb-[1rem] text-justify text-[14px] sm:text-[14px] md:text-[14px] lg:text-[16px] text-[#9A9A9A] dark:text-[#94A3B8]">Are you sure you want to delete {schoolName} education?</span>
            <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center">
              <Button onClick={handleConfirmModal} size='md' className='bg-[#9A9A9A] hover:bg-[#666666] w-[150px] my-[0.5rem] mx-5'>Back</Button>
              <Button onClick={handleNotification} size='md' className='bg-[#FF0000] hover:bg-[#cc0000] w-[150px] my-[0.5rem] mx-5'>Delete</Button>
            </div>
            {/* notification */}
            {
              showNotification && (
                <Notification
                  loading
                  title={`Deleting ${schoolName} Education`}
                  withCloseButton={false}
                >
                  Please wait until data is deleted, you cannot close this modal
                </Notification>
              )
            }
          </div>
      }

    </div>
  )
}
